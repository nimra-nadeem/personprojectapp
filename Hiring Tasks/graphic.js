// References:
// https://www.youtube.com/watch?v=BDpBAFvdjYo
// https://www.youtube.com/watch?v=C4t6qfHZ6Tw&t=467s
// https://github.com/kriscfoster/d3-barchart


var data = [{"Klingons": 30}, 
			{"Vulcans": 22}, 
			{"Ferengi": 3}, 
			{"Humans": 13},
			{"Romulans": 2},
			{"ExBs": 17}];

// edit data for easier handling
var edited_data = [];
for (let i = 0; i < data.length; i++) {
	var name = Object.keys(data[i])[0];
	var count = data[i][name];
	edited_data.push({"name": name, "count": count});	
}

// create html element for svg
var root = document.getElementById("root");

// set title
d3.select('#root').style('color', 'maroon')
.attr('class', 'heading')
.style("font-size", '40px')
.text("Counts of Aliens docked at outpost Deep Space 12")


// create container div
var d3_div = document.createElement('div');
d3_div.id = "d3_div";
root.appendChild(d3_div);


// set pixel sizes
const margin = { top: 50, bottom: 100, left: 50, right: 50 };

var svgWidth = 800;
var svgHeight = 700;
var barPadding = 5;
var barWidth = ((svgWidth-margin.left)/ edited_data.length);



// set the ranges
var x = d3.scaleBand()
          .range([margin.left, svgWidth - margin.right])
          .padding(0.1);
var y = d3.scaleLinear()
		  .range([svgHeight - margin.bottom, margin.top])
		  .domain([0,35]);




// append svg object to the body of the page
var svg = d3.select('#d3_div')
	.append("svg").attr("width", svgWidth).attr("height", svgHeight);

// append bar chart one rect at a time
var barChart = svg.selectAll("rect")
	.data(edited_data)
	.enter()
  .append('rect')
  .attr("fill", 'maroon')
	.attr("x", (d, i) => x(i))
	.attr('y', function(d) {
		return y(d.count);
	})
	.attr('height', function(d) {
		return y(0) - y(d.count);
	})
	.attr("width", barWidth - barPadding)
	.attr('title', (d) => d.count)
	.attr("transform", function (d, i) {
		var translate = [(barWidth * i)+margin.left, 0];
		return "translate(" + translate + ")";
	});


function yAxis(g) {
  g.attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).ticks(null, data.format))
    .attr("font-size", '20px')
}

function xAxis(g) {
  g.attr("transform", `translate(0,${svgHeight + 5})`)
    .call(d3.axisBottom(x).tickFormat(i => data[i].name))
    .attr("font-size", '20px')
}

svg.append("g").call(xAxis);
svg.append("g").call(yAxis);

// set x axis labels
svg.append("text")
.attr("class", "x label")
.attr("text-anchor", "end")
.attr("x", svgWidth-40)
.attr("y", svgHeight-70)
.attr("font-size", '20px')
.text("ExBs");

svg.append("text")
.attr("class", "x label")
.attr("text-anchor", "end")
.attr("x", svgWidth-150)
.attr("y", svgHeight-70)
.attr("font-size", '20px')
.text("Romulans");

svg.append("text")
.attr("class", "x label")
.attr("text-anchor", "end")
.attr("x", svgWidth-285)
.attr("y", svgHeight-70)
.attr("font-size", '20px')
.text("Humans");

svg.append("text")
.attr("class", "x label")
.attr("text-anchor", "end")
.attr("x", svgWidth-415)
.attr("y", svgHeight-70)
.attr("font-size", '20px')
.text("Ferengi");


svg.append("text")
.attr("class", "x label")
.attr("text-anchor", "end")
.attr("x", svgWidth-535)
.attr("y", svgHeight-70)
.attr("font-size", '20px')
.text("Vulcans");


svg.append("text")
.attr("class", "x label")
.attr("text-anchor", "end")
.attr("x", svgWidth-650)
.attr("y", svgHeight-70)
.attr("font-size", '20px')
.text("Klingons");
