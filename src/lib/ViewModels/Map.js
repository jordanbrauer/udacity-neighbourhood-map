'use strict';

/**
 * @file Map.js
 * @author Jordan Brauer <jbrauer.inc@gmail.com>
 */

/**
 * Creates a new Map.
 * @constructor Map
 * @author Jordan Brauer <jbrauer.inc@gmail.com>
 * @param {array} locations - The dataset that is being used to plot markers on the map.
 * @param {object} options - A list of key value pairs defining initial settings for map.
 * @param {object} options.center - A pair of latitude and longitude coordinates.
 * @param {integer} options.zoom - The initial starting zoom level of the map.
 */
const Map = function(locations, options) {
  /** @private */
  const self = this;
  const init = function() {
    self.setLocationMarkers(self.locations);
  };

  /**
   * @memberof Map
   * @property {array} locations - Store our location data in a new array property.
   */
  this.locations = locations || [];

  /**
   * @memberof Map
   * @property {object} options - Get/set our initial map options.
   */
  this.options = options || {
    center: new google.maps.LatLng(56.1304, -106.3468),
    zoom: 4,
    scrollwheel: false,
  };

  /**
   * @memberof Map
   * @property {object} map - Create a new google.maps.Map object passing in the DOM element for use and the map options.
   */
  this.map = new google.maps.Map(document.getElementById('map'), self.options);

  /**
   * @memberof Map
   * @property {array} markers - Store our markers in an array property.
   */
  this.markers = [];

  // Call the object constructor
  init();
};

/**
 * @memberof Map
 * @method setLocationMarkers
 * @description Push new LocationsMarker objects into the markers property of Map for displaying in the DOM.
 */
Map.prototype.setLocationMarkers = function (locations) {
  const self = this;

  locations.forEach(function(location) {
    self.markers.push(new LocationMarker(self.map, location));
  });
};
