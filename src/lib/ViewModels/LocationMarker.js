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
    const request = $.get(`${self.api.base_uri}/${self.api.end_point}`).done(function (res) {
      console.log(res.response);

      self.api.status = res.meta.code;

      const venue = res.response.venues[0];
      const info = self.details;

      info.id = venue.id || null;
      info.name = venue.name || info.name;
      info.street = venue.location.formattedAddress[0] || 'Street N/A';
      info.city = venue.location.formattedAddress[1] || 'City N/A';
      info.country = venue.location.formattedAddress[2] || 'Country N/A';
      info.phone = venue.contact.formattedPhone || '#';
      info.url = venue.url || '#';
      info.facebook = venue.contact.facebook || '#';
      info.instagram = venue.contact.instagram || '#';
      info.twitter = venue.contact.twitter || '#';

      self.content =`
      <div class="row column">
        <h4><a id="${info.id}-url" href="${info.url}" target="_blank">${info.name}</a> <small><sup><i class="fa fa-md fa-external-link"></i></sup></small></h4>
      </div>
      <hr>
      <div class="row column">
        <h6>Details</h6>
      </div>
      <div class="row">
        <div class="columns small-12 medium-12">
          <p>${info.street},<br>${info.city}, ${info.country}<br><span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="${info.lat}, ${info.lng}">Where is this?</span></p>
          <p></p>
        </div>
        <div class="columns small-12 medium-6">
        </div>
      </div>
      <div class="row text-center">
        <div class="column small-4">
          <p>Checkins</p>
          <div class="stat">${venue.stats.checkinsCount}</div>
        </div>
        <div class="column small-4">
          <p>Tips</p>
          <div class="stat">${venue.stats.tipCount}</div>
          </div>
        <div class="column small-4">
          <p>Users</p>
          <div class="stat">${venue.stats.usersCount}</div>
        </div>
      </div>
      <br>
      <div class="row column">
        <h6>Contact</h6>
      </div>
      <div class="row column">
        <ul class="horizontal menu">
          <li><a id="${info.id}-facebook" href="${info.facebook}" target="_blank"><i class="fa fa-lg fa-facebook"></i></a></li>
          <li><a id="${info.id}-instagram" href="${info.instagram}" target="_blank"><i class="fa fa-lg fa-instagram"></i></a></li>
          <li><a id="${info.id}-twitter" href="${info.twitter}" target="_blank"><i class="fa fa-lg fa-twitter"></i></a></li>
          <li><a id="${info.id}-phone" href="tel:${info.phone}" target="_blank"><i class="fa fa-lg fa-phone"></i> &ndash; ${info.phone}</a></li>
        </ul>
      </div>
      `;
    }).fail(function (err) {
      try {
        self.api.status = err.status;
        console.error(`ERROR ${err.status} (${err.statusText}): ${err.responseJSON.meta.errorDetail}`);
      } catch (err) {
        console.error('There has been an error in requesting the API. Please review this log for more details.');
      } finally {
        self.content = '<span style="color: red;">Oops, it appears something has gone wrong!</span>';
      }
    });

    self.marker.addListener('click', function () {
      // XXX:HACK:FIXME: Aplogies to me, myself, and anyone who reads this lol,
      // Really gross chain of ifs inside this promise. Not sure how else to solve
      // this right now.. and I would rather move on with the rest of the project for now.
      if (!self.infoWindow.content) {
        let setInfoWindowContent = new Promise(function (resolve, reject) {
          self.infoWindow.setContent(self.content);
          resolve();
        }).then(function () {
          if (!self.checkDetail(self.details.phone))
            self.disableDetail(`#${self.details.id}-phone`);

          if (!self.checkDetail(self.details.url))
            self.disableDetail(`#${self.details.id}-url`);

          if (!self.checkDetail(self.details.facebook))
            self.disableDetail(`#${self.details.id}-facebook`);

          if (!self.checkDetail(self.details.instagram))
            self.disableDetail(`#${self.details.id}-instagram`);

          if (!self.checkDetail(self.details.twitter))
            self.disableDetail(`#${self.details.id}-twitter`);

        });
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
    id: null,
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
    end_point: `venues/search?ll=${self.details.lat},${self.details.lng}&query=${self.details.name}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20170329`,
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
  console.log(self);
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

/**
 * @memberof LocationMarker
 * @method checkDetail
 * @description Return true or false if a detail exists or not in the APIs data e.g., website, social media, address, etc.
 * @param {string} detail - Value to be checked
 * @returns boolean
 */
LocationMarker.prototype.checkDetail = function (detail) {
  return detail === '#' ? false : true;
};

/**
 * @memberof LocationMarker
 * @method disableDetail
 * @description Disables a link from being used
 * @param {string} selector - The element to disable
 */
LocationMarker.prototype.disableDetail = function (selector) {
  $(selector).css({ color: "#CCC", pointerEvents: "none" });
};

/**
 * @memberof LocationMarker
 * @method invoke
 * @description
 */
LocationMarker.prototype.invoke = function (e) {
  const self = this;

  google.maps.event.trigger(self.marker, e);
};
