// $('.close').on('click', function(){
//   $('#details').removeClass("show");
 
//   $('#close').toggleClass('active');
// });


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


function style(feature) {
	return {
		fillColor: d3.scaleQuantize()
              .domain(domain_arr)
              .range(color_array)(feature.properties.LowModPercentage),
		weight: 2,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7
	};
}


 // load GeoJSON from an external file
 $.getJSON("data/blkgrp_lowmod2015_muncipal.geojson",blkgrp_data=>{
  domain_arr = [
                d3.min(blkgrp_data.features, function(d) { return d.properties.LowModPercentage; }), 
                d3.max(blkgrp_data.features, function(d) { return d.properties.LowModPercentage; })
              ];



  var blkgrp_lowmod2015_muncipal = L.geoJson(blkgrp_data, {style: style,
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