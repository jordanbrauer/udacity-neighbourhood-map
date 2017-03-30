'use strict';

describe('LocationMarker ViewModel Tests', function () {
  // LocationMarker Constructor Tests
  describe('LocationMarker Constructor Tests', function () {
    it('it is an instance of `LocationMarker` and is of type {object}', function () {
      for (var i = 0; i < googleMaps.markers.length; i++) {
        expect(googleMaps.markers()[i]).to.be.an.instanceof(LocationMarker);
      }

      expect(googleMaps).to.be.an('object');
    });

    it('it should have a property of `map` that is not empty and is of type {object}.', function () {
      for (var i = 0; i < googleMaps.markers.length; i++) {
        expect(googleMaps.markers()[i]).to.have.property('map').that.is.an('object');
      }
    });

    it('it should have a property of `name` that is not null and is of type {string}.');

    it('it should have a property of `lat` that is not null and is of type {integer}.');

    it('it should have an alias property of `latitude` that is equal to `lat`.');

    it('it should have a property of `lng` that is not null and is of type {integer}.');

    it('it should have an alias property of `longitude` that is equal to `lng`.');

    it('it should have a property of `content` that is not null and is of type {string}.', function () {
      expect(googleMaps.markers()[0].content).to.be.a('string');
    });

    it('it should have a property of `marker` that is an instance of `google.maps.Marker`.');

    it('it should have a property of `infoWindow` that is an instance of `google.maps.InfoWindow`.');
  });

  describe('LocationMarker Method Tests', function () {
    describe('animate() Tests', function () {
      it('it responds to a method call of `animate()`', function () {
        expect(googleMaps.markers()[0]).to.respondTo('animate');
      });
    });
  });
});
