var map, markers;

function ftmaps(vloc, canvas){
	map = new google.maps.Map(document.getElementById(canvas), {
		zoom: 12,
		center: new google.maps.LatLng(vloc.Latitude, vloc.Longitude),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	
	markers = new google.maps.Marker({
      position: {lat:vloc.Latitude, lng:vloc.Longitude},
      map: map,
      html: vloc.VesselName,
      id: vloc.VesselID
    });
}

var bigmap;
var bigmarkers = [];
var currCenter;
function bigftmap(vloc, canvas){{
  bigmap = new google.maps.Map(document.getElementById(canvas), {
    zoom: 8,
   center: new google.maps.LatLng(48.13348131688809, -122.62908236875),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  for (var i = 0; i < vloc.length; i++) {  
    bigmarkers[i] = new google.maps.Marker({
      position: {lat:vloc[i].Latitude, lng:vloc[i].Longitude},
      map: bigmap,
      html: vloc[i].VesselName,
      id: vloc[i].VesselID,
    });

   /// https://developers.google.com/maps/documentation/javascript/events
    google.maps.event.addListener(bigmarkers[i], 'click', function(){
      var infowindow = new google.maps.InfoWindow({
        id: this.id,
        content:this.html,
        position:this.getPosition()
      });
      google.maps.event.addListenerOnce(infowindow, 'closeclick', function(){
        markers[this.id].setVisible(true);
      });
      this.setVisible(true);
      infowindow.open(bigmap);
    });
  }
  currCenter = bigmap.getCenter();
}}


