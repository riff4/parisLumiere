
var format = d3.timeParse("%Y-%m-%d");
// Create the Google Map…
var map = new google.maps.Map(d3.select("#map").node(), {
    draggableCursor: 'crosshair',
    zoom: 12,
    center: new google.maps.LatLng(48.866667, 2.333333),
    mapTypeId: google.maps.MapTypeId.TERRAIN
});
// Load the station data. When the data comes back, create an overlay.
var startDate = new Date("2016-01-01"),
    endDate = new Date("2017-01-01");

var dateArray = d3.timeMonth(startDate, endDate);
var colours = d3.scaleOrdinal()
    .domain(dateArray)
    .range(["#6f63bb","#8a60b0","#ba43b4","#c7519c","#d63a3a","#ff7f0e","#ffaa0e","#bcbd22","#78a641","#2ca030","#12a2a8","#1f83b4"]);


d3.json("data/dataComplete.json", function(error, data) {
    if (error) throw error;
    plotCirclesMap([])
    // plotCirclesMap(data)
})


var overlay = new google.maps.OverlayView();



function plotCirclesMap(data){

    overlay.setMap(null);
    // Add the container when the overlay is added to the map.
    overlay.onAdd = function() {
        var tooltip = d3.select(this.getPanes().overlayLayer).append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
        var layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
            .attr("class", "stations")

        overlay.onRemove=function(){
            layer.remove();
        }


        // Draw each marker as a separate SVG element.
        // We could use a single SVG, but what size would it have?
        overlay.draw = function() {

            var projection = this.getProjection(),
                padding = 10;
            data=data.filter(function(el){
                return el.fields.type_de_tournage=='LONG METRAGE'
            });
            var marker = layer.selectAll("svg")
                .data(data,function(d){return d.recordid})
                .each(transform) // update existing markers
                .enter().append("svg")
                .each(transform)
                .attr("class", "marker");
            var tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);
            // Add a circle.
            marker.append("circle")
                .attr("r", 8)
                .attr("cx", padding)
                .attr("cy", padding)
                .attr("class","circle_map")
                .style("fill", function(d){return colours(format(d.fields.date_debut))})
                .on("mouseover", function(d) {
                    dataNo=filter_function();
                    if(dataNo.includes(this.__data__.fields.titre)==false){
                        tooltip.transition()
                            .duration(200)
                            .style("opacity", .9);
                        tooltip.html('Titre : ' + d.fields.titre + '<br>' + 'Réalisateur : ' + d.fields.realisateur + '<br>' + "Date de début : " + d.fields.date_debut + '<br>' + "Date de fin : " + d.fields.date_fin + '<br>' + "Note : " + d.fields.note + '<br>' + "Genre : " + d.fields.genre)
                            .style("left", (d3.event.pageX + 5) + "px")
                            .style("top", (d3.event.pageY - 28) + "px");
                        var titreChoisi = this.__data__.fields.titre;
                        d3.selectAll(".circle_map")
                            .filter(function (el) {
                                return titreChoisi != el    .fields.titre;
                            })
                            .transition()
                            .duration(400)
                            .style("opacity", 0);
                    }
                })
                .on("mouseout", function(d) {
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                    dataNo=filter_function();


                });

            function transform(d) {
                if(!(typeof d.fields.xy === "undefined")){
                    d = new google.maps.LatLng(d.fields.xy[0],d.fields.xy[1]);
                    d = projection.fromLatLngToDivPixel(d);
                    return d3.select(this)
                        .style("left", d.x - padding + "px")
                        .style("top", d.y  - padding + "px");
                }
            }
        };
    }
    // Bind our overlay to the map…
    overlay.setMap(map);

};
 
