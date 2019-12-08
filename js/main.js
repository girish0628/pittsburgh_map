// $('.close').on('click', function(){
//   $('#details').removeClass("show");
 
//   $('#close').toggleClass('active');
// });
var blkgrp_lowmod2015_muncipal;
var blkgrp_lowmod2015_muncipal_data;

//var csv is the CSV file with headers
function csv_to_JSON(csv){
  var lines=csv.split("\n");
  var result = [];
  var headers=lines[0].split(",");
  for(var i=1;i<lines.length;i++){

      var obj = {};
      var currentline=lines[i].split(",");

      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }

      result.push(obj);

  }
  // console.log(result);
  return result; //JavaScript object
  // return JSON.stringify(result); //JSON
}

function csv_on_map(upload_json){  
    var json_obj = csv_to_JSON(upload_json);
    var indicator = Object.keys(json_obj[0])[1]
    var data_muncipality = blkgrp_lowmod2015_muncipal.toGeoJSON();

    domain_arr = [
      d3.min(json_obj, function(d) { return parseFloat(d[indicator]); }),
      d3.max(json_obj, function(d) { return parseFloat(d[indicator]); })
    ];
    var index = 0;
    blkgrp_lowmod2015_muncipal.eachLayer(function (layer) {  
    
      // var feature = layer.feature;
      // if(layer.feature.properties.NAME == 'feature 1') {    
        layer.setStyle(style_indicator(json_obj[index++], indicator)) 
      // }
    });
    function style_indicator(feature, indicator){
    return {
      fillColor: d3.scaleQuantize()
                .domain(domain_arr)
                .range(color_array)(feature[indicator]),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }
  
}

function handleFileSelect(evt) {
  // var files = evt.target.files; // FileList object

  // files is a FileList of File objects. List some properties.
  var file = evt.target.files[0];
  if (file) {
      // create reader
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function(e) {
          // browser completed reading file - display it
          csv_on_map(e.target.result);
      };
  }

}

document.getElementById('files').addEventListener('change', handleFileSelect, false);

function dataUploadPanel(){
  $('#data-upload-panel').toggleClass('d-none'); 
  $('#data-repo').toggleClass('d-none');
}


function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }


function indicator_compare(muncipality_name, indicator_attrib){

  // var muncipality_name = ["Ross township", "West Deer township", "Wilkinsburg borough"];
  var arr_obj = [], final_arr = [];
  
     for(var i=0; i < muncipality_name.length; i++){      
      
      var indicator_data = muncipality.filter(({Muncipality}) => Muncipality === muncipality_name[i])
                            // .filter(obj =>obj[indicator_attrib] !== null)
                            .sort((a, b) => (a[indicator_attrib] > b[indicator_attrib]) ? 1 : -1)
                            .slice(0,3);
     
      arr_obj.push(indicator_data);	 
     }
   
    for(var i=0; i < arr_obj.length; i++){
      //debugger;
      var obj = {};
      for(var j=0; j < arr_obj[i].length; j++){
        
        obj[muncipality_name[j]] = arr_obj[i][j][indicator_attrib];
      }
          final_arr.push(obj)
      
    }
    return [...final_arr];
}

var indicator_arr;
$.getJSON("data/indicators_qa.json",indicators_qa=>{
  indicator_arr = indicators_qa;
});

let mountains = [
  { name: "Monte Falco", height: 1658, place: "Parco Foreste Casentinesi" },
  { name: "Monte Falterona", height: 1654, place: "Parco Foreste Casentinesi" },
  { name: "Poggio Scali", height: 1520, place: "Parco Foreste Casentinesi" },
  { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
  { name: "Monte Amiata", height: 1738, place: "Siena" }
];
function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}
function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();

      var btn = document.createElement('input');
          btn.type = "button";
          btn.className = "btn btn-indicator";
          btn.value = element[key] ? element[key]: 'No Data';

      // let text = document.createTextNode(element[key]);
      // cell.appendChild(text);
      cell.appendChild(btn);
    }
  

  }
}
function indicators_cards(){
  $.getJSON("data/indicators_qa.json",indicators_qa=>{
    // muncipality = [...new Set(blkgrp_data.features.map(x => x.properties))]
});



}
function indicator_back(){
  $('#indicator-demographic').toggleClass('d-none'); 
  $('.demo-content').toggleClass('d-none');
}
function indicator_content(indicator_label, indicator_name){ 

  // // $.getJSON("data/indicators_qa.json",indicators_qa=>{
    // indicator_arr = indicators_qa[indicator_name]
    $('#indicator-demographic').toggleClass('d-none'); 
    $('.demo-content').toggleClass('d-none');
    $('#indicator-definition').html('');
    $('#indicator-conection').html('')
    $('#indicator-definition').html(indicator_arr[indicator_name].find((m)=>m["v_label"] === indicator_label).definition);
    // $('#indicator-conection').html(indicator_arr[indicator_name].find((m)=>m["v_label"] === indicator_label).connection);

  // });

}
function rank_content(obj){
  $('#indicators-content').toggleClass('d-none');
  $('#indicator-res').toggleClass('d-none');
  
//  obj.innerHTML === 'Submit'? obj.innerHTML = '<i class="fa fa-angle-left"> Back</i>': obj.innerHTML = 'Submit'

  // let table = document.querySelector("table");


  // let data = Object.keys(mountains[0]);
  //   generateTableHead( $('#table')[0], data);
  //   generateTable($('#table')[0], mountains);

  var boroughs_arr = $('#input-tags').get(0).selectize.getValue();
  var indicators_arr = $('#variables').get(0).selectize.getValue().split(',');

  for(var i=0; i < indicators_arr.length; i++){
    var data_obj = indicator_compare(boroughs_arr.split(','), indicators_arr[i]);

    var data = Object.keys(data_obj[0]);
    generateTableHead( $('#table')[0], boroughs_arr.replace(/ borough/g, '').split(','));
    generateTable($('#table')[0], data_obj);
  }

}

function rank_back(){
  $('#indicators-content').toggleClass('d-none');
  $('#indicator-res').toggleClass('d-none');
  $('#table').empty();
}


$('.dropdown-menu').click(function(e) {
  e.stopPropagation();
});

let domain_arr = [];
const color_array = ['#fcf18f', '#ade1ad', '#8dc4c2', '#9ca7c3', '#a17ea8'];
function uniqueId(){
  return Math.floor(Math.random() * 26) + Date.now()
}

function close_panel(obj){
  obj.parentElement.classList.remove("show");
  
}
function collapseCard(obj){
  let id = $(obj).attr("datatarget");
  $(id).toggleClass("show")
}
function createContainer(...args){
  var id = uniqueId();
  var main_container = {
    id: `${id}`,
    class: `class-${id}`,
    css: {
      "height": `${args[0]}px`,
      "width": `${args[1]}px`,
      "display": "flex",      
      "background-color": "blue",
    }
  };
  var $main_container = $("<div>", main_container);
  // $div.html("New Division");
  $(args[2]).append($main_container);

  color_array.map((color, index)=>{
  
    var box = {
      id: `${index}${uniqueId()}`,
      class: `class-${index}${uniqueId()}`,
      css: {
        "height": `${args[0]}px`,
        "width": `${args[1]/color_array.length}px`,         
        "background-color": color,
      }
    };

    var $box = $("<div>", box);
        $(`#${id}`).append($box);
  });  
}
createContainer(40, 200, "#container");
createContainer(20, 100, "#poverty");
createContainer(20, 100, "#poverty-new");
createContainer(20, 100, "#white");
createContainer(20, 100, "#white-new");


function style(feature, indicator="LowModPercentage") {
	return {
		fillColor: d3.scaleQuantize()
              .domain(domain_arr)
              .range(color_array)(feature.properties[indicator]),
		weight: 2,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7
	};
}

function reSetStyle(indicator){
  var data_muncipality = blkgrp_lowmod2015_muncipal.toGeoJSON();
  domain_arr = [
    d3.min(data_muncipality.features, function(d) { return parseFloat(d.properties[indicator]); }),
    d3.max(data_muncipality.features, function(d) { return parseFloat(d.properties[indicator]); })
  ];

  blkgrp_lowmod2015_muncipal.eachLayer(function (layer) {  
    debugger;
    var feature = layer.feature;
    // if(layer.feature.properties.NAME == 'feature 1') {    
      layer.setStyle(style(feature, indicator)) 
    // }
  });
}

 // load GeoJSON from an external file
 $.getJSON("data/blkgrp_lowmod2015_muncipal.geojson",blkgrp_data=>{
  domain_arr = [
                d3.min(blkgrp_data.features, function(d) { return d.properties.LowModPercentage; }), 
                d3.max(blkgrp_data.features, function(d) { return d.properties.LowModPercentage; })
              ];



    blkgrp_lowmod2015_muncipal = L.geoJson(blkgrp_data, {style: style,
    onEachFeature: function (feature, layer) {
		
			layer.on('click', function () {
        // this.setStyle({'fillColor': 'green'});
			  $('#details').addClass("show");
        $('#details > .details-header')[0].innerHTML = `Municipality: ${feature.properties.Muncipality}`;
        $('#geo-location').html(`${feature.properties.Muncipality}`);
        $('#low-mod-percent').text(`${(feature.properties.LowModPercentage * 100).toFixed(2)}%`);
        
       var t = d3.scaleLinear()
              .domain(domain_arr)
              .range([0, 200])(feature.properties.LowModPercentage);
              // console.log(Math.round(t));

              $("#line-bar").css("margin-left", `${Math.round(t)}px`);
              // $("#line-bar").css("display", `inline`);   

       var t = d3.scaleLinear()
              .domain([
                d3.min(blkgrp_data.features, function(d) { return d.properties.LowMod; }), 
                d3.max(blkgrp_data.features, function(d) { return d.properties.LowMod; })
              ])
              .range([0, 100])(feature.properties.LowMod);
              // console.log(Math.round(t));

              $("#poverty-bar").css("margin-left", `${Math.round(t)}px`);
              // $("#line-bar").css("display", `inline`);   
     
			});
		}
    
  });

var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
    streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr}),
    osm_lyr = L.tileLayer( osm_url, {attribution: '&copy; ' + mapLink + ' Contributors', maxZoom: maxZoom,});


var map = L.map('map', {
		center: center,
    zoom: zoom,
    attributionControl: false,
		layers: [streets, blkgrp_lowmod2015_muncipal]
  });
  
  map.zoomControl.setPosition('bottomright');
var baseLayers = {
	"Grayscale": grayscale,
  "Streets": streets,
  "OSM": osm_lyr
	};

var overlays = {
      "Block Group Low Mod 2015 Muncipal": blkgrp_lowmod2015_muncipal
	};

  L.control.layers(baseLayers, overlays).addTo(map);
 
});