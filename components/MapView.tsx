
import React, { useEffect, useRef, useState, useMemo } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [geoData, setGeoData] = useState<any>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredPark, setHoveredPark] = useState<string | null>(null);
  
  // Calculate which states have all their parks visited
  const completedStates = useMemo(() => {
    const parksByState: Record<string, string[]> = {};
    parks.forEach(p => {
        if (!parksByState[p.state]) parksByState[p.state] = [];
        parksByState[p.state].push(p.id);
    });

    const completed = new Set<string>();
    const visitedIds = new Set(visits.flatMap(v => v.visits.length > 0 ? [v.parkId] : []));

    Object.entries(parksByState).forEach(([state, parkIds]) => {
        if (parkIds.length > 0 && parkIds.every(id => visitedIds.has(id))) {
            completed.add(state);
        }
    });
    return completed;
  }, [parks, visits]);

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json')
      .then(response => response.json())
      .then(data => {
        setGeoData(data);
      });

    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
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
        const k = event.transform.k;
        g.attr("transform", event.transform);
        
        // Scale markers
        g.selectAll(".marker-group")
          .attr("transform", function() {
            // Check if this element is currently being hovered (scaled up)
            const isHovered = d3.select(this).classed("is-hovered");
            const scale = isHovered ? (1.5 / k) : (1 / k);
            return `scale(${scale})`;
          });
        
        // Scale and toggle Park Labels (Show > 2.5x zoom)
        const showLabels = k > 2.5;
        g.selectAll(".park-label")
            .style("opacity", showLabels ? 1 : 0)
            .attr("transform", `scale(${1/k})`);
        
        // Scale State Labels
        g.selectAll(".state-label")
            .attr("transform", function() {
                const sel = d3.select(this);
                const x = parseFloat(sel.attr("data-x"));
                const y = parseFloat(sel.attr("data-y"));
                return `translate(${x}, ${y}) scale(${1 / k})`;
            });
      });

    svg.call(zoom as any);

    const projection = d3.geoAlbersUsa()
      .translate([width / 2, height / 2])
      .scale(Math.min(width, height) * 1.6); // Increased scale from 1.3 to 1.6

    const pathGenerator = d3.geoPath().projection(projection);
    const states = topojson.feature(geoData, geoData.objects.states);

    g.selectAll("*").remove();

    // 1. Water Outline
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

    // 2. Land Layer
    const landGroup = g.append("g");
    const labelGroup = g.append("g").style("pointer-events", "none");

    landGroup.selectAll("path")
      .data((states as any).features)
      .enter()
      .append("path")
      .attr("d", pathGenerator as any)
      .attr("fill", (d: any) => {
          const fips = typeof d.id === 'number' ? d.id.toString().padStart(2, '0') : d.id;
          const abbr = FIPS_TO_ABBR[fips];
          if (completedStates.has(abbr)) return "#c5dbac"; // Slightly darker and warmer than #cbe3bb
          return "#e3eec3"; // Unvisited warm light green
      }) 
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.6)
      .attr("class", (d: any) => {
          const fips = typeof d.id === 'number' ? d.id.toString().padStart(2, '0') : d.id;
          const abbr = FIPS_TO_ABBR[fips];
          const isCompleted = completedStates.has(abbr);
          return isCompleted 
            ? "transition-colors duration-200 hover:fill-[#c5dbac]" 
            : "transition-colors duration-200 hover:fill-[#e3eec3]";
      })
      .on("mouseenter", (event, d: any) => {
          const centroid = pathGenerator.centroid(d);
          const fips = typeof d.id === 'number' ? d.id.toString().padStart(2, '0') : d.id;
          const abbr = FIPS_TO_ABBR[fips];
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
      });

    parkGroups.each(function(d) {
      const group = d3.select(this);
      const parkHistory = visits.find(v => v.parkId === d.id);
      const isVisited = parkHistory && parkHistory.visits.length > 0;
      
      const marker = group.append("g")
        .attr("class", "marker-group transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"); // CSS transition for smooth scaling via D3
      
      // Floating animation container
      const animatedContent = marker.append("g")
        .attr("class", "animate-float")
        .style("animation-delay", () => `${Math.random() * 2}s`);

      // Hit area (invisible)
      animatedContent.append("circle")
        .attr("r", 20)
        .attr("fill", "transparent");

      if (isVisited) {
        // Shadow
        animatedContent.append("circle")
            .attr("r", 14)
            .attr("fill", "rgba(124, 101, 83, 0.1)")
            .attr("cy", 2);

        // Tree
        animatedContent.append("path")
          .attr("d", "M12 3 L5 17 h5 v5 h4 v-5 h5 L12 3 z")
          .attr("fill", "#668f63")
          .attr("stroke", "#fff")
          .attr("stroke-width", 2)
          .attr("transform", "translate(-12, -14) scale(0.9)"); 
      } else {
        // Dot
        animatedContent.append("circle")
          .attr("r", 6)
          .attr("fill", "#f28f3b")
          .attr("stroke", "#fff") 
          .attr("stroke-width", 2);
      }

      // Park Name Label (Hidden by default)
      const textLabel = group.append("text")
        .attr("class", "park-label")
        .attr("text-anchor", "middle")
        .attr("y", 28) // Position below marker
        .attr("fill", "#7c6553")
        .attr("stroke", "white")
        .attr("stroke-width", 3)
        .attr("stroke-linejoin", "round")
        .attr("paint-order", "stroke")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .style("opacity", 0) // Start hidden
        .style("transition", "opacity 0.2s ease");

      // Handle multi-line for long names
      if (d.name.length > 16 && d.name.includes(' ')) {
          const words = d.name.split(' ');
          const mid = Math.ceil(words.length / 2);
          const line1 = words.slice(0, mid).join(' ');
          const line2 = words.slice(mid).join(' ');

          textLabel.append("tspan")
            .attr("x", 0)
            .attr("dy", 0)
            .text(line1);

          textLabel.append("tspan")
            .attr("x", 0)
            .attr("dy", "1.1em")
            .text(line2);
      } else {
          textLabel.text(d.name);
      }
    });

    // Handle Hover "Bounce" Effect via D3
    parkGroups
      .on("mouseenter", function(event, d) {
          setHoveredPark(d.id);
          const currentK = d3.zoomTransform(svgRef.current!).k;
          
          // Select the specific marker group inside this park group
          d3.select(this).select(".marker-group")
            .classed("is-hovered", true)
            .transition()
            .duration(300)
            .ease(d3.easeElasticOut)
            .attr("transform", `scale(${1.5 / currentK})`); // Scale up 1.5x relative to zoom
      })
      .on("mouseleave", function() {
          setHoveredPark(null);
          const currentK = d3.zoomTransform(svgRef.current!).k;

          d3.select(this).select(".marker-group")
            .classed("is-hovered", false)
            .transition()
            .duration(200)
            .ease(d3.easeQuadOut)
            .attr("transform", `scale(${1 / currentK})`); // Return to normal scale
      });

  }, [geoData, dimensions, parks, visits, onParkSelect, completedStates]);

  return (
    <div 
        ref={containerRef}
        className="w-full h-full relative pattern-map-dots overflow-hidden"
    >
      {!geoData && (
         <div className="absolute inset-0 flex items-center justify-center text-brand-tealDark bg-white/50 z-10 rounded-3xl m-12 backdrop-blur-sm">
            <span className="font-bold text-xl tracking-widest text-brand-brown/60">Loading Map...</span>
         </div>
      )}

      {/* Floating Clouds Layer */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-40">
        {[...Array(5)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ x: -200, y: Math.random() * 400 }}
                animate={{ x: ['110vw'], y: [Math.random() * 400, Math.random() * 400 + 50] }}
                transition={{ 
                    duration: 40 + Math.random() * 40, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: i * 10
                }}
                className="absolute text-white"
            >
                <Icon name="cloud" className={`w-${32 + i * 8} h-${32 + i * 8}`} />
            </motion.div>
        ))}
      </div>

      <svg ref={svgRef} width="100%" height="100%" className="block relative z-0">
        <g ref={gRef} />
      </svg>
      
      {/* Tooltip */}
      <div className="absolute bottom-8 left-8 pointer-events-none z-30">
        <AnimatePresence>
          {hoveredPark && (
             <motion.div 
                initial={{ scale: 0, rotate: -5, y: 20 }}
                animate={{ scale: 1, rotate: 0, y: 0 }}
                exit={{ scale: 0, rotate: 5, y: 10, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="bg-white px-5 py-3 rounded-[1.5rem] shadow-soft border-4 border-white ring-4 ring-brand-teal/20 max-w-sm"
             >
               <div className="flex items-center gap-3">
                   <div className="bg-brand-yellow w-10 h-10 rounded-xl flex items-center justify-center border-2 border-white shadow-sm shrink-0">
                      <span className="font-bold text-brand-brown">
                         {parks.find(p => p.id === hoveredPark)?.state}
                      </span>
                   </div>
                   
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
