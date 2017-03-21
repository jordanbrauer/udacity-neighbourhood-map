'use strict';

/**
 * @file LocationMarker.js
 * @author Jordan Brauer <jbrauer.inc@gmail.com>
 */

/**
 * Create a new LocationMarker to place on the Map
 * @constructor LocationMarker
 * @version 1.0.0
 * @author Jordan Brauer <jbrauer.inc@gmail.com>
 * @param {object} map - The Map object in the DOM that the marker will be rendered to.
 * @param {object} data - The intital (required) map data needed to place the marker (latitude and longitude) on the designated map.
 */
const LocationMarker = function (map, data) {
  /** @private */
  const self = this;

  /** @private */
  const init = function () {};

  /**
   * @memberof LocationMarker
   * @property {object} map - The Map object that this LocationMarker belongs to.
   */
  this.map = map;

  /**
   * @memberof LocationMarker
   * @property {string} name - Name of the location that is being plotted on the map.
   */
  this.name = data.name;

  /**
   * @memberof LocationMarker
   * @property {integer} lat - The latitude of the location to be plotted.
   */
  this.lat = data.lat;

  /**
   * @memberof LocationMarker
   * @see lat
   */
  this.latitude = this.lat;

  /**
   * @memberof LocationMarker
   * @property {integer} lng - The longitude of the location to be plotted.
   */
  this.lng = data.lng;

   /**
   * @memberof LocationMarker
   * @see lng
   */
  this.longitude = this.lng;

  /**
   * @memberof LocationMarker
   * @property {object} marker - The actual marker that is placed on the map.
   */
  this.marker = new google.maps.Marker({
    map: self.map,
    position: new google.maps.LatLng(self.lat, self.lng),
    title: self.name
  });

  /**
   * @memberof LocationMarker
   * @property {string} content - Content to be placed in the `infoWindow`s.
   */
  this.content =`
  <h3>${this.name}</h3>
  <p>${this.lat}, ${this.lng}</p>
  `;

  /**
   * @memberof LocationMarker
   * @property {object} infoWindow - The info window UI element that pops up when a marker or list item is clicked.
   */
  this.infoWindow = new google.maps.InfoWindow({
    content: self.content
  });

  // Add an event listener to our marker, listening for a 'click',
  // open the markers' infoWindow when heard.
  this.marker.addListener('click', function (){
    self.infoWindow.open(this.map, this);
  });
};
