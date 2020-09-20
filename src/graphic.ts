
import { select, scaleLinear, axisBottom, axisTop }  from 'd3'; 
import { westernFreqs } from './audio' 

const margin = { top: 20, right: 10, bottom: 20, left: 10 };
const width  = 500 -margin.left - margin.right; 
const height = 300 - margin.top - margin.bottom;
const g = select("body")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("stroke", "white")
            .style("stroke-width", 1)
            .append("g")
            .style("stroke", "white")
            .style("stroke-width", 1)
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            ; 

const vals = Object.values(westernFreqs);
const keys = Object.keys(westernFreqs);
console.log(vals);
const min = vals[0];
const max = vals[vals.length-1];  
const scale = scaleLinear().domain([min,max]).range([0,300]);
let axisGenerator = axisTop(scale)
                    .tickFormat((d:number) => { const i = vals.indexOf(d); debugger; return keys[i];})
                    ;  
let xAxis = g.append("g")
             .style("stroke", "white")
             .style("stroke-width", 1)
             .call(axisGenerator);  

const y = 100;   

// const svg = select('svg#graphic')
// .append('line')
// .style('stroke', 'white')
// .style('stroke-width', 1)
// .attr('x1', 0)
// .attr('y1', y)
// .attr('x2', 300)
// .attr('y2', y)
// ;     
