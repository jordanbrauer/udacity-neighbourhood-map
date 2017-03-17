'use strict';

const LocationMarker = function(map, data) {
  const self = this;
  this.map = map;
  this.name = data.name;
  this.lat = data.lat;
  this.lng = data.lng;

  // Content to be placed in the InfoWindows. We are using template literal
  // strings to construct the content here. This allows us to use expression
  // interpolation within a string without the need to concatenate multiple
  // strings and variables.
  this.contentString =`
  <h3>${this.name}</h3>
  <p>${this.lat}, ${this.lng}</p>
  `;

  // Create new marker for our map,
  // place it at the coordinates and give it a title from our LocationsModel model
  this.marker = new google.maps.Marker({
    map: self.map,
    position: new google.maps.LatLng(self.lat, self.lng),
    title: self.name
  });

  // Instantiate a new InfowWindow with our content assigned to the content
  // attibute of Googles' InfoWindow class.
  this.infoWindow = new google.maps.InfoWindow({
    content: self.contentString
  });

  // Add an event listener to our marker, listening for a 'click',
  // open the markers' infoWindow when heard.
  this.marker.addListener('click', function(){
    self.infoWindow.open(this.map, this);
  });
};
