var svg = d3.select("svg"),
width = svg.attr("width"),
height = svg.attr("height"),
radius = Math.min(width, height) / 2;

var g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
var color = d3.scaleOrdinal(['#FF908F','#75DFFF','#FFEC70','#69FF95','#9282FF','#7A7869']);
var pie = d3.pie().value(function(d) { 
    return d.percent; 
});

var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var label = d3.arc()
    .outerRadius(radius)
    .innerRadius(radius - 80);

d3.csv("Job-type/Job-percent.csv", function(error, data) {
if (error) {
    throw error;
}

var arc = g.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc");

arc.append("path")
    .attr("d", path)
    .attr("fill", function(d) { return color(d.data.job); });
        
console.log(arc)
        
arc.append("text")
    .attr("transform", function(d) { 
            return "translate(" + label.centroid(d) + ")"; 
    })
    .text(function(d) { return d.data.job; });
});

svg.append("g")
    .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
    .append("text")
    .attr("class", "title")