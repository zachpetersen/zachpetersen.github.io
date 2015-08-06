/* global vesselclasses */

/// <reference path="./typings/mustache/mustache.d.ts"/>
/// <reference path="./typings/jquery/jquery.d.ts"/>

/// Call WSF API
function wsfApiGet(key, vid) {
  var url;
  var base = "http://www.wsdot.wa.gov/ferries/api/vessels/rest";
  var apikey = "?apiaccesscode={d4e4ed11-84c0-42b4-a775-b46d1b23cb82}";
  if(key==="vlocid"){
      url = base + "/vessellocations/" + vid + apikey;
  } else if (key==="vlocall") {
      url = base + "/vessellocations" + apikey;
  } else if (key==="vverbose") {
      url = base + "/vesselverbose" + apikey;
  }
  return $.ajax({
    url: url,
    jsonp: "callback",
    dataType: 'jsonp'
  });
}

/// Function to render Mustache Template
function LoadVessels(v) {
    var template = $('#vessellist').html();  
        Mustache.parse(template);
    var rendered = Mustache.render(template, v);
        $('#content').append(rendered);
}

/// Function to get Vessel Classes
function getVesselClasses() {
    var vc = [];
    $("section.vessel").each(function(vessel){
        vc.push($(this).data("vessel-class"));
    });
    return vc;
}

// Function to dedupe array of strings
function dedupe(a) {
    return a.sort().filter(function(item, position, array) {
        return !position || item != array[position - 1];
    })
}

/// Call API for vesselverbose and send data to mustache
wsfApiGet("vverbose").done(function(data) {
  for (var i = 0; i < data.length; i++) {
      LoadVessels(data[i]);
  }
});

// docready
$(document).ready(function(){

    /// Stretchy static header
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1){  
            $('header').addClass("scroll");
        }
        else{
            $('header').removeClass("scroll");
        }
    });

    /// Menu Expansion - removed
   /* $('.hamburger, .fa-ship').on('click', function(){
        $('.dropmenu').toggleClass('hidden');
        if( $(this).hasClass("hamburger") ){
            
        }
    });*/
    
    $('.fa-map-marker').on('click', function(){
        $('.fa-ship').toggleClass('hidden');
        $('.fa-map-marker').toggleClass('hidden');
        $('#content').empty();
        $('#content').append('<div id="fullmap"></div>');
        /// get all vessel location info
        wsfApiGet("vlocall").done(function(data) {
            console.log(data);
            bigftmap(data, "fullmap");
            });
        });
        
     $('.fa-ship').on('click', function(){
        $('.fa-ship').toggleClass('hidden');
        $('.fa-map-marker').toggleClass('hidden');
        $('#content').empty();
        wsfApiGet("vverbose").done(function(data) {
          for (var i = 0; i < data.length; i++) {
              LoadVessels(data[i]);
          }
        });
        });
        
        $( window ).resize(function() {
            google.maps.event.trigger(bigmap, 'resize');
            bigmap.setCenter(currCenter);
        });
        

    /// Subsection Expansion
    $(document).on('click', '.vessel h3', function(){
       if ($(this).hasClass('vloc')) {
            
        var vid = $(this).data("vessel-id");
        var mc = $(this).next('div').attr('id');
    
        wsfApiGet("vlocid", vid).done(function(data) {
            ftmaps(data, mc);
            });
        };
        
        $(this).next('.subsection').toggleClass('hidden');
        $(this).children('i').toggleClass('fa-plus-square-o').toggleClass('fa-minus-square-o');
    });
});

/// act on mustache rendered html
$(window).load(function(){
    vesselclasses = dedupe(getVesselClasses()); 
});