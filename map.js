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
    .range(['#ffc388','#ffb269','#ffa15e','#fd8f5b','#f97d5a','#f26c58','#e95b56','#e04b51','#d53a4b','#c92c42','#bb1d36','#ac0f29','#9c0418','#8b0000']);


d3.json("data/dataComplete.json", function(error, data) {
  if (error) throw error;
  var overlay = new google.maps.OverlayView();
    
  // Add the container when the overlay is added to the map.
  overlay.onAdd = function() {
    var tooltip = d3.select(this.getPanes().overlayLayer).append("div")
        .attr("class", "tooltip")
				.style("opacity", 0);
    var layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
        .attr("class", "stations")
         
    // Draw each marker as a separate SVG element.
    // We could use a single SVG, but what size would it have?
    overlay.draw = function() {
            
      var projection = this.getProjection(),
          padding = 10;
      var marker = layer.selectAll("svg")
          .data(d3.entries(data))
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
          .style("fill", function(d){return colours(format(d.value.fields.date_debut))})
      		.on("mouseover", function(d) {
              tooltip.transition()
                .duration(200)
                .style("opacity", .9);
              tooltip.html('Titre : '+d.value.fields.titre+'<br>'+'Réalisateur : '+d.value.fields.realisateur+'<br>'+"Date de début : "+d.value.fields.date_debut+'<br>'+"Date de fin : "+d.value.fields.date_fin+'<br>'+"Note : "+d.value.fields.note+'<br>'+"Genre : "+d.value.fields.genre)
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
      	})
     	.on("mouseout", function(d) {
          tooltip.transition()
          .duration(200)
          .style("opacity", 0);
      });
      
      function transform(d) {
        if(!(typeof d.value.fields.xy === "undefined")){
        d = new google.maps.LatLng(d.value.fields.xy[0],d.value.fields.xy[1]);
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
});
 
