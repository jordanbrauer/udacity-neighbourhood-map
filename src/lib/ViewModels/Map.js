'use strict';

const Map = function(locations, options) {
  const self = this;

  this.options = options || {
    center: new google.maps.LatLng(56.1304, -106.3468),
    scrollwheel: false,
    zoom: 4,
  };

  this.locations = locations || [];

  this.markers = [];

  // Create a map object and specify the DOM element for display
  // in addition to specifying a center location
  // and any other options we may want. See Google Maps API docs for
  // more values
  this.map = new google.maps.Map(document.getElementById('map'), self.options);

  // Create new markers and push them into our markers array attribute.
  this.locations.forEach(function(location) {
    self.markers.push(new LocationMarker(self.map, location));
  });
};
