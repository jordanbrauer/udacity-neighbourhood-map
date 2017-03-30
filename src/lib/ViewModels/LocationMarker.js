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

      self.url = venue.url;
      self.street = venue.location.formattedAddress[0];
      self.city = venue.location.formattedAddress[1];
      self.phoneNumber = venue.contact.formattedPhone;

      self.content =`
      <h4><a href="${self.url}" target="_blank">${self.name}</a></h4>
      <p>${self.street}, ${self.city}</p>
      <p>${self.lat}, ${self.lng}</p>
      <p>${self.phoneNumber}</p>
      `;
    });

    request.fail(function (err) {
      self.api.status = err.status;

      console.error(`ERROR ${err.status} (${err.statusText}): ${err.responseJSON.meta.errorDetail}`);

      self.content = '<span style="color: red;">Oops, it appears something has gone wrong!</span>';
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

  this.api = {
    base_uri: 'https://api.foursquare.com/v2',
    end_point: `venues/search?ll=${self.lat},${self.lng}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20170329`,
    status: null,
    // request: null,
  };

  this.url;
  this.street;
  this.city;
  this.phoneNumber;

  /**
   * @memberof LocationMarker
   * @property {string} content - Content to be placed in the `infoWindow`s.
   */
  this.content;

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
    position: new google.maps.LatLng(self.lat, self.lng),
    title: self.name,
  });

  // Click event listener
  this.marker.addListener('click', function (){
    if (!self.infoWindow.content) {
      self.infoWindow.setContent(self.content);
    }

    self.animate('bounce', 2150);

    self.infoWindow.open(this.map, this);
  });

  // Call object constructor
  init();
};

/**
 * @memberof LocationMarker
 * @method animate
 * @param {string} animation - The type of animation to be executed on the marker - see a list Google Maps marker animations for more options.
 * @param {integer} duration - (optional) Duration of the animation in miliseconds.
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
