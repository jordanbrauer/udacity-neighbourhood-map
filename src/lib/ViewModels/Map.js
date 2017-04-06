'use strict';

/**
 * @file Map.js
 * @author Jordan Brauer <jbrauer.inc@gmail.com>
 */

/**
 * Creates a new Map to display to the user.
 * @constructor Map
 * @version 1.0.0
 * @author Jordan Brauer <jbrauer.inc@gmail.com>
 * @param {array} locations - The dataset that is being used to plot markers on the map.
 * @param {object} options - A list of key value pairs defining initial settings for map.
 * @param {object} options.center - A pair of latitude and longitude coordinates.
 * @param {integer} options.zoom - The initial starting zoom level of the map.
 */
const Map = function (locations, options) {
  /** @private */
  const self = this;

  /** @private */
  const __construct = function () {
    self.setLocationMarkers(self.locations);
  };

  /**
   * @memberof Map
   * @property {array} locations - Store our location data in a new array property.
   */
  this.locations = ko.observableArray(locations) || ko.observableArray([]);

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
  this.markers = ko.observableArray([]);

  /**
   * @memberof Map
   * @property {string} filter - User defined filter for list of locations.
   */
  this.filter = ko.observable('');

  /**
   * @memberof Map
   * @property {object} enabledMarkers - A Knockout computed variable containing an array of filtered markers
   * based upon the filter string specified by the user. This array is the one used to display results to the user.
   */
  this.enabledMarkers = ko.computed(function () {
    let filter = self.filter().toLowerCase();

    switch (filter) {
      case undefined:
        return self.markers().forEach(function (marker) {
          marker.enabled(true);
        });
        break;
      default:
        return ko.utils.arrayFilter(self.markers(), function (marker) {
          const subject = marker.details.name.toLowerCase();
          const result = subject.search(filter) >= 0;

          marker.enabled(result);
          return result;
        });
    }
  });

  // Call the object constructor
  __construct();
};

/**
 * @memberof Map
 * @method setLocationMarkers
 * @description Push new LocationsMarker objects into the markers property of Map for displaying in the DOM.
 */
Map.prototype.setLocationMarkers = function (locations) {
  const self = this;

  locations().forEach(function (location) {
    self.markers.push(new LocationMarker(self.map, location));
  });
};
