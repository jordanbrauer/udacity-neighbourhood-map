'use strict';

const Map = function() {
  const self = this;

  this.markers = [];

  // Create a map object and specify the DOM element for display
  // in addition to specifying a center location
  // and any other options we may want. See Google Maps API docs for
  // more values
  const map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(49.895136, -97.1383743999999),
    scrollwheel: false,
    zoom: 11
  });

  // Create new markers and push them into our markers array attribute.
  Locations.forEach(function(location){
    self.markers.push(new LocationMarker(map, location));
  });
};
