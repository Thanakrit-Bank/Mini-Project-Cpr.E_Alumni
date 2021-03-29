var svg2 = d3.select("#box2"),
width = svg2.attr("width"),
height = svg2.attr("height"),
radius = Math.min(width, height) / 2;

var g2 = svg2.append("g")
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
    .innerRadius(radius - 150);

d3.csv("JobChart/jobpercent.csv", function(error, data) {
if (error) {
    throw error;
}

var arc = g2.selectAll(".arc")
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

svg2.append("g")
    .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
    .append("text")
    .attr("class", "title")