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
  const init = function () {
    const request = $.get(`${self.api.base_uri}/${self.api.end_point}`);

    request.done(function (res) {
      self.api.status = res.meta.code;

      const venue = res.response.venues[0];

      self.details.url = venue.url;
      self.details.street = venue.location.formattedAddress[0];
      self.details.city = venue.location.formattedAddress[1];
      self.details.phoneNumber = venue.contact.formattedPhone;

      self.content =`
      <h4><a href="${self.details.url}" target="_blank">${self.details.name}</a></h4>
      <p>${self.details.street}, ${self.details.city}</p>
      <p>${self.details.lat}, ${self.details.lng}</p>
      <p>${self.details.phoneNumber}</p>
      `;
    });

    request.fail(function (err) {
      self.api.status = err.status;

      console.error(`ERROR ${err.status} (${err.statusText}): ${err.responseJSON.meta.errorDetail}`);

      self.content = '<span style="color: red;">Oops, it appears something has gone wrong!</span>';
    });

    self.marker.addListener('click', function (){
      if (!self.infoWindow.content) {
        self.infoWindow.setContent(self.content);
      }

      self.animate('bounce', 2150);

      self.infoWindow.open(this.map, this);
    });

    console.log(self);
  };

  /** @private */
  const CLIENT_ID = 'E45RTSS15B1T3HKN1R1Y03TLIV3CHBPFCAY52CC1CFAWT3H5';

  /** @private */
  const CLIENT_SECRET = 'BKMWVMAPHQ5LLDGWDVWKEAJ35USFQPFLI0NKBJ4BBPECHOHZ';

  /**
   * @memberof LocationMarker
   * @property {object} map - The Map object that this LocationMarker belongs to.
   */
  this.map = map;

  /**
   * @memberof LocationMarker
   * @property {string} content - Content to be placed in the `infoWindow`s.
   */
  this.content;

  /**
   * @memberof LocationMarker
   * @property {object} details - Set of details that describe the venue.
   * @property {string} details.name - Name of the location that is being plotted on the map.
   * @property {integer} details.lat - The latitude of the location to be plotted.
   * @property {integer} details.lng - The longitude of the location to be plotted.
   * @property {string} details.street - Street of the venue.
   * @property {string} details.city - City that the venue lives in.
   * @property {string} details.url - URL to the venues' website.
   * @property {string} details.phone - Phone # to call the venue.
   * @property {string} details.facebook - Facebook link to venue.
   * @property {string} details.twitter - Twitter link to venue.
   * @property {string} details.instagram - Instagram link to venue.
   */
  this.details = {
    name: data.name,
    lat: data.lat,
    lng: data.lng,
    street: null,
    city: null,
    url: null,
    phone: null,
    facebook: null,
    twitter: null,
    instagram: null,
  };

  /**
   * @memberof LocationMarker
   * @property {object} api - Set of details related to the GET request and response to the 3rd part API.
   * @property {string} api.base_uri - base URL to make request(s) off of.
   * @property {string} api.end_point - destination to retrieve data from based off of parameters provided.
   * @property {integer} api.status - Status code of GET request.
   */
  this.api = {
    base_uri: 'https://api.foursquare.com/v2',
    end_point: `venues/search?ll=${self.details.lat},${self.details.lng}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20170329`,
    status: null,
    // request: null,
  };

  /**
  * @memberof LocationMarker
  * @property {object} infoWindow - The info window UI element that pops up when a marker or list item is clicked.
  */
  this.infoWindow = new google.maps.InfoWindow();

  /**
   * @memberof LocationMarker
   * @property {object} marker - The actual marker that is placed on the map.
   */
  this.marker = new google.maps.Marker({
    map: self.map,
    position: new google.maps.LatLng(self.details.lat, self.details.lng),
    title: self.details.name,
  });

  // Call object constructor
  init();
};

/**
 * @memberof LocationMarker
 * @method animate
 * @description A small and simple wrapper for the `google.maps.Animation` API that allows the user to specify an animation and duration.
 * @param {string} animation - The type of animation to be executed on the marker - see a list Google Maps marker animations for more options.
 * @param {integer} duration - (optional) Duration of the animation in miliseconds.
 * @example
 * myMarker.animate('drop');
 * myMarker.animate('bounce', 3000);
 */
LocationMarker.prototype.animate = function (animation, duration = null) {
  const self = this;
  let ANIMATION;

  switch (animation.toUpperCase()) {
    case 'BOUNCE':
      ANIMATION = google.maps.Animation.BOUNCE;
      break;
    case 'DROP':
      ANIMATION = google.maps.Animation.DROP;
      break;
    default:
      ANIMATION = null;
  }

  self.marker.setAnimation(ANIMATION);

  if (duration != null) {
    setTimeout(function () { self.marker.setAnimation(null); }, duration);
  }
};
