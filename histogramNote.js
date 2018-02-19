 var margin = {top:20, right:50, bottom:0, left:20},
        width = 600 - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;

    var histHeight1 = height;

    var format = d3.timeParse("%Y-%m-%d");

    var formatDateIntoYear = d3.timeFormat("%Y");

    var minNote = 1,
        maxNote = 10;


    // x scale for time
    var x1 = d3.scaleLinear()
        .domain([1,10])
        .range([0, width]);

    // y scale for histogram
    var y1 = d3.scaleLinear()
        .range([histHeight1, 0]);


    ////////// histogram set up //////////

    // set parameters for histogram
    var histo1 = d3.histogram()
        .value(function(d) { return d.fields.note; })
        .domain(x1.domain())
        .thresholds(x1.ticks(10));;

    var svg1 = d3.select("#vis_note")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    var hist1 = svg1.append("g")
        .attr("class", "histogram1")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var arc1 = d3.arc()
        .outerRadius(height / 2)
        .innerRadius(0)
        .startAngle(0)
        .endAngle(function(d) { return d.type=="w" ? -Math.PI : Math.PI; });
    
    var brush1 = d3.brushX()
        .extent([[margin.left, margin.top],[width+margin.left, margin.top+histHeight1]])
        .on("start", brushstart1)
        .on("brush", brushmove1)
        .on("end", brushend1);
    
    var gBrush1 = svg1.append("h")
        .attr("class", "brush1")
        .call(brush1);
    

    ////////// plot set up //////////

    var dataset1;
1
    var plot1 = svg1.append("g")
        .attr("class", "plot1")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    ////////// load data //////////

    d3.json("data/dataComplete.json",function(error,data){
        
        if (error) throw error;
        
        
        var data_triee1 = data.filter(function(d) {
            console.log();
            return (d.fields.note > 0);
        });
        
        console.log("oki");
        console.log(data_triee1);
        var bins1 = histo1(data_triee1);

        y1.domain([0, d3.max(bins1, function(d) { return d.length; })]);

        var bar1 = hist1.selectAll(".bar1")
            .data(bins1)
            .enter()
            .append("g")
            .attr("class", "bar1")
            .attr("transform", function(d) {
                return "translate(" + x1(d.x0) + "," + y1(d.length) + ")";
            });

        bar1.append("rect")
            .attr("class", "bar1")
            .attr("x", 1)
            .attr("width", function(d) { return x1(d.x1) - x1(d.x0) - 1; })
            .attr("height", function(d) { return histHeight1 - y1(d.length); })
            .attr("fill", "red");

        bar1.append("text")
            .attr("dy", ".75em")
            .attr("y", "6")
            .attr("x", function(d) { return (x1(d.x1) - x1(d.x0))/2; })
            .attr("text-anchor", "middle")
            .text(function(d) { if (d.length>15) { return d.length; } })
            .style("fill", "black");
        
        dataset1=data;
       // drawPlot(data);

    });

        
    
    
    var brushg1 = svg1.append("g")
        .attr("class", "brush1")
        .call(brush1);

    brushg1.call(brush1.move, [x1(minNote)+margin.left, x1(maxNote)+margin.left]);

    brushstart1();
    brushmove1();
    
    var min1=margin.left;
    var max1=width+margin.left;

    function brushstart1() {

    }

    function brushmove1() {  
        var p1 = d3.brushSelection(brushg1.node()),
        s1 = p1.map(x1.invert);
        update1(x1.invert(p1[0]-margin.left),x1.invert(p1[1]-margin.left)); 
    }

    function brushend1() {

    }

11
/*
    function drawPlot(data) {
        var locations = plot.selectAll(".location")
            .data(data, function(d) { return d.recordid; });

        // if filtered dataset has more circles than already existing, transition new ones in
        locations.enter()
            .append("circle")
            .attr("class", "location")
            .attr("cx", function(d) { return format(d.fields.date_debut).getMonth()*71+35+(-15)+format(d.fields.date_debut).getDate(); })
            .style("fill", function(d) { return "red"; })
            //.style("stroke", function(d) { return colours(d3.timeYear(d.date)); })
            .style("opacity", 0.3)
            .attr("r", 4)
            .attr("cy", function(d) { return Math.random()*400+(height/2-90); })
            .transition()
            .duration(400)
            .attr("cy", function(d) { return (d.fields.ardt-75000)/30*400+(height/2-90); })
;
        // if filtered dataset has less circles than already existing, remove excess
        locations.exit()
            .remove();
    }*/


    
    function update1(hmin,hmax) {
        hminN=hmin;
        hmaxN=hmax;
        // filter data set and redraw plot
     /*   var newData = dataset.filter(function(d) {
            return (d.fields.note < hmax) && (d.fields.note > hmin);
        });*/
       // drawPlot(newData);
        // histogram bar colours
        d3.selectAll(".bar1")
            .attr("fill", function(d) {
                if ((d.x0 < hmax) && (d.x0 >= hmin)) {
                    return "red";
                } else {
                    return "#eaeaea";
                }
            });
        filter_function();
    }

