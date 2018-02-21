var margin = {top:20, right:50, bottom:0, left:20},
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var histHeight = height/4;

    var format = d3.timeParse("%Y-%m-%d");

    var formatDateIntoYear = d3.timeFormat("%Y");

    var startDate = new Date("2016-01-01"),
        endDate = new Date("2017-01-01");

    var dateArray = d3.timeMonth(startDate, endDate);

    var colours = d3.scaleOrdinal()
        .domain(dateArray)
        .range(["#6f63bb","#8a60b0","#ba43b4","#c7519c","#d63a3a","#ff7f0e","#ffaa0e","#bcbd22","#78a641","#2ca030","#12a2a8","#1f83b4"]);

    // x scale for time
    var x = d3.scaleTime()
        .domain([startDate, endDate])
        .range([0, width])
        .clamp(true);

    // y scale for histogram
    var y = d3.scaleLinear()
        .range([histHeight, 0]);


    ////////// histogram set up //////////

    // set parameters for histogram
    var histogram = d3.histogram()
        .value(function(d) { return d.date; })
        .domain(x.domain())
        .thresholds(x.ticks(d3.timeMonth));

    var histo = d3.histogram()
        .value(function(d) { return format(d.fields.date_debut); })
        .domain(x.domain())
        .thresholds(x.ticks(d3.timeMonth));

    var svg = d3.select("#vis")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    var hist = svg.append("g")
        .attr("class", "histogram")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var arc = d3.arc()
        .outerRadius(height / 2)
        .innerRadius(0)
        .startAngle(0)
        .endAngle(function(d) { return d.type=="w" ? -Math.PI : Math.PI; });
    
    var brush = d3.brushX()
        .extent([[margin.left, margin.top],[width+margin.left, margin.top+histHeight]])
        .on("start", brushstart)
        .on("brush", brushmove)
        .on("end", brushend);
    
    var gBrush = svg.append("h")
        .attr("class", "brush")
        .call(brush);
    
    var handle = gBrush.selectAll(".handle--custom")
          .data([{type: "w"}, {type: "e"}])
          .enter().append("path")
            .attr("class", "handle--custom")
            .attr("fill", "#666")
            .attr("fill-opacity", 0.8)
            .attr("stroke", "#000")
            .attr("stroke-width", 1.5)
            .attr("cursor", "ew-resize")
            .attr("d", d3.arc()
                .innerRadius(0)
                .outerRadius(height / 2)
                .startAngle(0)
                .endAngle(function(d, i) { return i ? Math.PI : -Math.PI; }));

    ////////// plot set up //////////

    var dataset;

    var plot = svg.append("g")
        .attr("class", "plot")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    ////////// load data //////////

    d3.json("data/dataComplete.json",function(error,data){
        if (error) throw error;
        // Checking
        console.log(data[1500].recordid)
        console.log(format(data[1500].fields.date_debut))
        var m=format(data[1500].fields.date_debut).getDate();
        console.log(m)
        var bins = histo(data);

        y.domain([0, d3.max(bins, function(d) { return d.length; })]);

        var bar = hist.selectAll(".bar")
            .data(bins)
            .enter()
            .append("g")
            .attr("class", "bar")
            .attr("transform", function(d) {
                return "translate(" + x(d.x0) + "," + y(d.length) + ")";
            });

        bar.append("rect")
            .attr("class", "bar")
            .attr("x", 1)
            .attr("width", function(d) { return x(d.x1) - x(d.x0) - 1; })
            .attr("height", function(d) { return histHeight - y(d.length); })
            .attr("fill", function(d) { return colours(d.x0); });

        bar.append("text")
            .attr("dy", ".75em")
            .attr("y", "6")
            .attr("x", function(d) { return (x(d.x1) - x(d.x0))/2; })
            .attr("text-anchor", "middle")
            .text(function(d) { if (d.length>15) { return d.length; } })
            .style("fill", "white");
        dataset=data
        drawPlot(data);

    });

        

    var lMonths=['Jan','Fev','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
    
    
    var brushg = svg.append("g")
        .attr("class", "brush")
        .call(brush);

    brushg.call(brush.move, [x(startDate)+margin.left, x(endDate)+margin.left]);

    brushstart();
    brushmove();
    
    var min=margin.left;
    var max=width+margin.left;

    function brushstart() {

    }

    function brushmove() {  
        var p = d3.brushSelection(brushg.node()),
        s = p.map(x.invert);
        update(x.invert(p[0]-margin.left),x.invert(p[1]-margin.left));
        console.log(p);
    }

    function brushend() {

    }



    function drawPlot(data) {
        var locations = plot.selectAll(".location")
            .data(data, function(d) { return d.recordid; });

        // if filtered dataset has more circles than already existing, transition new ones in
        locations.enter()
            .append("circle")
            .attr("class", "location")
            .attr("cx", function(d) { return format(d.fields.date_debut).getMonth()*45+(-0)+format(d.fields.date_debut).getDate(); })
            .style("fill", function(d) { return colours(d3.timeMonth(format(d.fields.date_debut))); })
            //.style("stroke", function(d) { return colours(d3.timeYear(d.date)); })
            .style("opacity", 0.3)
            .attr("r", 4)
            .attr("cy", function(d) { return Math.random()*((height/2+150)-(height/2-150))+(height/2-90); })
            .transition()
            .duration(400)
            .attr("cy", function(d) { return (d.fields.ardt-75000)/22*((height/2+150)-(height/2-150))+(height/2-90); })
;
        // if filtered dataset has less circles than already existing, remove excess
        locations.exit()
            .remove();
    }


    
    function update(hmin,hmax) {
        // filter data set and redraw plot
        var newData = dataset.filter(function(d) {
            return (format(d.fields.date_debut) < hmax) && (format(d.fields.date_debut) > hmin);
        });
        drawPlot(newData);
        // histogram bar colours
        d3.selectAll(".bar")
            .attr("fill", function(d) {
                if ((d.x0 < hmax) && (d.x0 >= hmin)) {
                    return colours(d.x0);
                } else {
                    return "#eaeaea";
                }
            })
    }

