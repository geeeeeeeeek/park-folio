
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { AnimatePresence } from 'framer-motion';
import { NationalPark, UserParkHistory } from '../types';

interface MapViewProps {
  parks: NationalPark[];
  visits: UserParkHistory[];
  onParkSelect: (id: string) => void;
}

const MapView: React.FC<MapViewProps> = ({ parks, visits, onParkSelect }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  const [geoData, setGeoData] = useState<any>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredPark, setHoveredPark] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json')
      .then(response => response.json())
      .then(data => {
        setGeoData(data);
      });

    const handleResize = () => {
      if (svgRef.current) {
        const { clientWidth, clientHeight } = svgRef.current.parentElement!;
        setDimensions({ width: clientWidth, height: clientHeight });
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!geoData || !svgRef.current || !gRef.current) return;

    const svg = d3.select(svgRef.current);
    const g = d3.select(gRef.current);
    const { width, height } = dimensions;

    // Zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .translateExtent([[0, 0], [width, height]])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
        // Counter-scale markers to keep them constant visual size
        // We divide 1 by the transform k (scale)
        g.selectAll(".marker-group")
          .attr("transform", `scale(${1 / event.transform.k})`);
      });

    svg.call(zoom as any);

    const projection = d3.geoAlbersUsa()
      .translate([width / 2, height / 2])
      .scale(Math.min(width, height) * 1.3);

    const pathGenerator = d3.geoPath().projection(projection);
    const states = topojson.feature(geoData, geoData.objects.states);

    g.selectAll("*").remove();

    // 1. Shadow Layer (Hard Black Shadow)
    g.append("g")
      .selectAll("path")
      .data((states as any).features)
      .enter()
      .append("path")
      .attr("d", pathGenerator as any)
      .attr("fill", "#000000") 
      .attr("transform", "translate(4, 4)");

    // 2. Land Layer (White with Bold Black Stroke)
    g.append("g")
      .selectAll("path")
      .data((states as any).features)
      .enter()
      .append("path")
      .attr("d", pathGenerator as any)
      .attr("fill", "#ffffff") 
      .attr("stroke", "#121212")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round") 
      .attr("class", "transition-colors duration-200 hover:fill-brand-yellow");

    // 3. Parks
    const projectableParks = parks.filter(p => projection([p.coordinates.lng, p.coordinates.lat]) !== null);

    const parkGroups = g.append("g")
      .selectAll("g")
      .data(projectableParks)
      .enter()
      .append("g")
      .attr("class", "cursor-pointer")
      // We translate the parent group to the map location.
      // This part SCALES with the map zoom.
      .attr("transform", (d) => {
        const coords = projection([d.coordinates.lng, d.coordinates.lat]);
        return `translate(${coords![0]}, ${coords![1]})`;
      })
      .on("click", (event, d) => {
        event.stopPropagation();
        onParkSelect(d.id);
      })
      .on("mouseenter", (event, d) => setHoveredPark(d.id))
      .on("mouseleave", () => setHoveredPark(null));

    parkGroups.each(function(d) {
      const group = d3.select(this);
      
      // Determine if visited by checking if logs array is not empty
      const parkHistory = visits.find(v => v.parkId === d.id);
      const isVisited = parkHistory && parkHistory.visits.length > 0;
      
      // The marker group is what we counter-scale. 
      // It sits at (0,0) of the parent group (which is at the map lat/lng).
      const marker = group.append("g")
        .attr("class", "marker-group");
      
      // Invisible hit area - inside marker group so it stays constant size relative to icon
      marker.append("circle")
        .attr("r", 20)
        .attr("fill", "transparent");

      if (isVisited) {
        // Visited: Simple Pine Tree
        marker.append("path")
          .attr("d", "M12 3 L5 17 h5 v5 h4 v-5 h5 L12 3 z") // Geometric tree
          .attr("fill", "#1a4731") // Brand Green
          .attr("stroke", "#121212")
          .attr("stroke-width", 1.5)
          .attr("transform", "translate(-12, -14) scale(0.9)"); // Center the 24x24 icon
      } else {
        // Not Visited: Brand Yellow Circle
        marker.append("circle")
          .attr("r", 5)
          .attr("fill", "#ffb700") // Brand Yellow
          .attr("stroke", "#121212")
          .attr("stroke-width", 2);
      }
    });

  }, [geoData, dimensions, parks, visits, onParkSelect]);

  return (
    <div className="w-full h-full relative bg-brand-beige overflow-hidden">
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(#1a4731 2px, transparent 2px)', 
             backgroundSize: '20px 20px' 
           }}>
      </div>

      {!geoData && (
         <div className="absolute inset-0 flex items-center justify-center text-brand-black bg-brand-white/80 z-10 border-2 border-brand-black m-12 shadow-hard rounded-2xl">
            <span className="font-bold text-xl tracking-widest uppercase">Loading Atlas...</span>
         </div>
      )}

      <svg ref={svgRef} width="100%" height="100%" className="block relative z-10">
        <g ref={gRef} />
      </svg>

      {/* Brutalist Pop Hover Card */}
      <div className="absolute bottom-8 left-8 pointer-events-none z-20">
        <AnimatePresence>
          {hoveredPark && (
             <div className="bg-brand-white p-6 border-3 border-brand-black shadow-hard rounded-2xl max-w-sm">
               <div className="bg-brand-yellow inline-block px-3 py-1 border-2 border-brand-black mb-3 rounded-full">
                  <span className="block text-xs font-bold text-brand-black uppercase tracking-widest">
                  {parks.find(p => p.id === hoveredPark)?.state}
                  </span>
               </div>
               <h3 className="font-serif text-4xl text-brand-black leading-none mb-2 font-bold">
                 {parks.find(p => p.id === hoveredPark)?.name}
               </h3>
             </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MapView;
