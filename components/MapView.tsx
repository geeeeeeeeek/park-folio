
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { AnimatePresence, motion } from 'framer-motion';
import { NationalPark, UserParkHistory } from '../types';
import { Icon } from '../icons';

interface MapViewProps {
  parks: NationalPark[];
  visits: UserParkHistory[];
  onParkSelect: (id: string) => void;
}

const FIPS_TO_ABBR: Record<string, string> = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA", "08": "CO", "09": "CT", "10": "DE",
  "11": "DC", "12": "FL", "13": "GA", "15": "HI", "16": "ID", "17": "IL", "18": "IN", "19": "IA",
  "20": "KS", "21": "KY", "22": "LA", "23": "ME", "24": "MD", "25": "MA", "26": "MI", "27": "MN",
  "28": "MS", "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH", "34": "NJ", "35": "NM",
  "36": "NY", "37": "NC", "38": "ND", "39": "OH", "40": "OK", "41": "OR", "42": "PA", "44": "RI",
  "45": "SC", "46": "SD", "47": "TN", "48": "TX", "49": "UT", "50": "VT", "51": "VA", "53": "WA",
  "54": "WV", "55": "WI", "56": "WY"
};

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
        g.selectAll(".marker-group")
          .attr("transform", `scale(${1 / event.transform.k})`);
        
        // Counter-scale state labels
        g.selectAll(".state-label")
            .attr("transform", function() {
                const sel = d3.select(this);
                const x = parseFloat(sel.attr("data-x"));
                const y = parseFloat(sel.attr("data-y"));
                return `translate(${x}, ${y}) scale(${1 / event.transform.k})`;
            });
      });

    svg.call(zoom as any);

    const projection = d3.geoAlbersUsa()
      .translate([width / 2, height / 2])
      .scale(Math.min(width, height) * 1.3);

    const pathGenerator = d3.geoPath().projection(projection);
    const states = topojson.feature(geoData, geoData.objects.states);

    g.selectAll("*").remove();

    // 1. Water Outline (Soft Muted Blue-Grey)
    g.append("g")
      .selectAll("path")
      .data((states as any).features)
      .enter()
      .append("path")
      .attr("d", pathGenerator as any)
      .attr("fill", "none")
      .attr("stroke", "#cad4cf") 
      .attr("stroke-width", 10)
      .attr("stroke-linejoin", "round")
      .attr("stroke-opacity", 0.5);

    // 2. Land Layer (Soft Sage Green)
    const landGroup = g.append("g");
    
    // 3. Label Layer
    const labelGroup = g.append("g").style("pointer-events", "none");

    landGroup.selectAll("path")
      .data((states as any).features)
      .enter()
      .append("path")
      .attr("d", pathGenerator as any)
      .attr("fill", "#c5dca0") // Softer, more cohesive sage green
      .attr("stroke", "#ffffff") // White border
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.6) // Semi-transparent
      .attr("class", "transition-colors duration-200 hover:fill-[#d2e6b2]")
      .on("mouseenter", (event, d: any) => {
          const centroid = pathGenerator.centroid(d);
          const fips = typeof d.id === 'number' ? d.id.toString().padStart(2, '0') : d.id;
          const abbr = FIPS_TO_ABBR[fips];

          // Clear previous
          labelGroup.selectAll("*").remove();

          if (abbr && centroid) {
              const currentK = d3.zoomTransform(svgRef.current!).k;
              labelGroup.append("text")
                .attr("class", "state-label")
                .attr("data-x", centroid[0])
                .attr("data-y", centroid[1])
                .text(abbr)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")
                .attr("fill", "#7c6553")
                .attr("font-weight", "bold")
                .attr("opacity", 0.6)
                .style("font-size", "0.875rem")
                .attr("transform", `translate(${centroid[0]}, ${centroid[1]}) scale(${1 / currentK})`);
          }
      })
      .on("mouseleave", () => {
          labelGroup.selectAll("*").remove();
      });

    // 4. Parks
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
      const parkHistory = visits.find(v => v.parkId === d.id);
      const isVisited = parkHistory && parkHistory.visits.length > 0;
      
      const marker = group.append("g")
        .attr("class", "marker-group transition-transform");
      
      marker.append("circle")
        .attr("r", 20)
        .attr("fill", "transparent");

      if (isVisited) {
        // Visited: Tree Icon with drop shadow
        marker.append("circle")
            .attr("r", 14)
            .attr("fill", "rgba(124, 101, 83, 0.1)") // Soft brown shadow
            .attr("cy", 2);

        marker.append("path")
          .attr("d", "M12 3 L5 17 h5 v5 h4 v-5 h5 L12 3 z")
          .attr("fill", "#668f63") // Muted Forest Green
          .attr("stroke", "#fff")
          .attr("stroke-width", 2)
          .attr("transform", "translate(-12, -14) scale(0.9)"); 
      } else {
        // Not Visited: Little Dig Spot "X" or Dot
        marker.append("circle")
          .attr("r", 5)
          .attr("fill", "#e6dfc2") // Matches new map background
          .attr("stroke", "#e09f3e") // Softer Orange ring
          .attr("stroke-width", 2);
      }
    });

  }, [geoData, dimensions, parks, visits, onParkSelect]);

  return (
    <div className="w-full h-full relative pattern-map-dots overflow-hidden">
      {!geoData && (
         <div className="absolute inset-0 flex items-center justify-center text-brand-tealDark bg-white/50 z-10 rounded-3xl m-12 backdrop-blur-sm">
            <span className="font-bold text-xl tracking-widest text-brand-brown/60">Loading Map...</span>
         </div>
      )}

      <svg ref={svgRef} width="100%" height="100%" className="block relative z-10">
        <g ref={gRef} />
      </svg>

      {/* Tooltip */}
      <div className="absolute bottom-8 left-8 pointer-events-none z-20">
        <AnimatePresence>
          {hoveredPark && (
             <motion.div 
                initial={{ scale: 0, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 5 }}
                className="bg-white px-5 py-3 rounded-[1.5rem] shadow-soft border-4 border-white ring-4 ring-brand-teal/20 max-w-sm"
             >
               <div className="flex items-center gap-3">
                   {/* State Abbr in Rounded Square */}
                   <div className="bg-brand-yellow w-10 h-10 rounded-xl flex items-center justify-center border-2 border-white shadow-sm shrink-0">
                      <span className="font-bold text-brand-brown">
                         {parks.find(p => p.id === hoveredPark)?.state}
                      </span>
                   </div>
                   
                   {/* Park Name Only */}
                   <div>
                       <h3 className="font-bold text-xl text-brand-brown leading-none">
                         {parks.find(p => p.id === hoveredPark)?.name}
                       </h3>
                   </div>
               </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MapView;
