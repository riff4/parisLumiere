//Variables globales
var comedie="Comedie";
var drame="Drame";
var action="Action";
var thriller="Thriller";
var romance="Romance";
var hminN=1;
var hmaxN=10;


d3.select("#cb_comedie").on("click", function() {
    if (document.getElementById("cb_comedie").checked){
                            comedie="Comedie";
                            filter_function()}
    else{comedie="zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz";
                            filter_function()}});

d3.select("#cb_drame").on("click", function() {
        if (document.getElementById("cb_drame").checked){
                            drame="Drame";
                            filter_function()}
    else{drame="zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz";
                            filter_function()}});

d3.select("#cb_action").on("click", function() {
        if (document.getElementById("cb_action").checked){
                            action="Action";
                            filter_function()}
    else{action="zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz";
                            filter_function()}});

d3.select("#cb_romance").on("click", function() {
        if (document.getElementById("cb_romance").checked){
                            romance="Romance";
                            filter_function()}
    else{romance="zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz";
                            filter_function()}});

d3.select("#cb_thriller").on("click", function() {
        if (document.getElementById("cb_thriller").checked){
                            thriller="Thriller";
                            filter_function()}
    else{thriller="zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz";
                            filter_function()}});

//|| e.value.fields.note < hmaxN || e.value.fields.note > hminN

function filter_function() {

    dataFull=d3.selectAll(".circle_map")
        .filter(function(e){
            return (
                (!e.fields.genre.includes(comedie) && !e.fields.genre.includes(drame) && !e.fields.genre.includes(action) && !e.fields.genre.includes(romance) && !e.fields.genre.includes(thriller) )
            )

        });
    dataNo=[]

    d3.selectAll(".circle_map")
       .filter(function(e){
            return ( 
                (!e.fields.genre.includes(comedie) && !e.fields.genre.includes(drame) && !e.fields.genre.includes(action) && !e.fields.genre.includes(romance) && !e.fields.genre.includes(thriller) )
       /*          &&
             (e.value.fields.note >= hmaxN || e.value.fields.note <= hminN)*/
                    )
        })
       .transition().duration(400).style("opacity", "0");
    
        d3.selectAll(".circle_map")
       .filter(function(e){
            return ((e.fields.genre.includes(comedie) || e.fields.genre.includes(drame) || e.fields.genre.includes(action) || e.fields.genre.includes(romance) || e.fields.genre.includes(thriller))
            /*    ||
              (e.value.fields.note < hmaxN && e.value.fields.note > hminN)   */
                   )
        })
       .transition().duration(400).style("opacity", "1");

        dataFull['_groups']['0'].forEach(function(d){
            dataNo.push(d.__data__.fields.titre)
        });
        return dataNo;
    
}
    
