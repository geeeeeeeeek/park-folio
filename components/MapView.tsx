
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { NationalPark, UserVisit } from '../types';

interface MapViewProps {
  parks: NationalPark[];
  visits: UserVisit[];
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

    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .translateExtent([[0, 0], [width, height]])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom as any);

    const projection = d3.geoAlbersUsa()
      .translate([width / 2, height / 2])
      .scale(Math.min(width, height) * 1.3);

    const pathGenerator = d3.geoPath().projection(projection);
    const states = topojson.feature(geoData, geoData.objects.states);

    g.selectAll("*").remove();

    // 1. Shadow Layer (Soft)
    g.append("g")
      .selectAll("path")
      .data((states as any).features)
      .enter()
      .append("path")
      .attr("d", pathGenerator as any)
      .attr("fill", "#d6d3c4") // Earth 200/300 mix
      .attr("transform", "translate(2, 2)");

    // 2. Land Layer (Vintage Paper)
    g.append("g")
      .selectAll("path")
      .data((states as any).features)
      .enter()
      .append("path")
      .attr("d", pathGenerator as any)
      .attr("fill", "#f4f1ea") // Earth 100
      .attr("stroke", "#d1cdc3") // Earth 300
      .attr("stroke-width", 0.5)
      .attr("class", "transition-colors duration-300 hover:fill-earth-50");

    // 3. Parks
    const projectableParks = parks.filter(p => projection([p.coordinates.lng, p.coordinates.lat]) !== null);

    const parkGroups = g.append("g")
      .selectAll("g")
      .data(projectableParks)
      .enter()
      .append("g")
      .attr("class", "cursor-pointer")
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
      const isVisited = visits.some(v => v.parkId === d.id && v.visited);
      
      group.append("circle")
        .attr("r", 20)
        .attr("fill", "transparent");

      const marker = group.append("g")
        .attr("class", "marker-group transition-all duration-300");

      if (isVisited) {
        // Visited: Deep Forest Green Dot
        marker.append("circle")
          .attr("r", 4)
          .attr("fill", "#2c4a3b") // Forest 700
          .attr("stroke", "#f4f1ea")
          .attr("stroke-width", 1.5);
      } else {
        // Not Visited: Hollow Rust Ring
        marker.append("circle")
          .attr("r", 3)
          .attr("fill", "#f4f1ea")
          .attr("stroke", "#a39f96") // Earth 400
          .attr("stroke-width", 1.5);
      }
    });

  }, [geoData, dimensions, parks, visits, onParkSelect]);

  useEffect(() => {
    if (!gRef.current) return;
    const g = d3.select(gRef.current);
    g.selectAll(".marker-group")
      .transition()
      .duration(200)
      .attr("transform", (d: any) => d.id === hoveredPark ? "scale(1.8)" : "scale(1)");
  }, [hoveredPark]);

  return (
    <div className="w-full h-full relative bg-earth-200 overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" 
           style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/cardboard-flat.png')` }}>
      </div>

      {!geoData && (
         <div className="absolute inset-0 flex items-center justify-center text-stone-500 bg-earth-100/50 backdrop-blur-sm z-10">
            <span className="font-sans text-sm tracking-widest uppercase">Loading Cartography...</span>
         </div>
      )}

      <svg ref={svgRef} width="100%" height="100%" className="block relative z-10">
        <g ref={gRef} />
      </svg>

      {/* Minimal Hover Card */}
      <div className="absolute bottom-8 left-8 pointer-events-none">
        {hoveredPark ? (
           <div className="bg-earth-100 p-6 shadow-xl shadow-stone-900/5 border border-earth-300 max-w-sm">
             <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">
               {parks.find(p => p.id === hoveredPark)?.state}
             </span>
             <h3 className="font-serif text-3xl text-stone-900 leading-none mb-2">
               {parks.find(p => p.id === hoveredPark)?.name}
             </h3>
             <p className="text-sm text-stone-600 font-medium leading-relaxed line-clamp-2">
               {parks.find(p => p.id === hoveredPark)?.description}
             </p>
           </div>
        ) : (
          <div className="text-stone-400 font-serif text-2xl italic opacity-50">
            Explore the wild.
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;
