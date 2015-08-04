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

var bigmap, bigmarkers;

function bigftmap(vloc, canvas){
	map = new google.maps.Map(document.getElementById(canvas), {
		zoom: 12,
		center: new google.maps.LatLng(vloc.Latitude, vloc.Longitude),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	
}