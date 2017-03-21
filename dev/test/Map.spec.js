'use strict';

describe('Map ViewModel Tests', function() {
  describe('Map Constructor Tests', function() {
    it('it is an instance of `Map` and is of type {object}', function() {
      expect(googleMaps).to.be.an.instanceof(Map);
      expect(googleMaps).to.be.an('object');
    });

    it('it should have a property of `locations` that is not empty and is of type {object} passed to it on creation', function() {
      expect(googleMaps).to.have.property('locations').that.is.an('array');
      expect(googleMaps.locations).to.have.length.of.at.least(1);
    });

    it('it should have a property of `options` that is not empty and is of type {object} passed to it on creation', function() {
      expect(googleMaps).to.have.property('options').that.is.an('object');
    });

    it('it should have a property of `map` that is an instance of `google.maps.Map` and of type {object}', function() {
      expect(googleMaps).to.have.property('map').that.is.an('object');
      expect(googleMaps.map).to.be.an.instanceof(google.maps.Map);
    });

    it('it should have a property of `markers` that is not empty and is of type {array}', function() {
      expect(googleMaps).to.have.property('markers').that.is.an('array');
      expect(googleMaps.markers).to.have.length.of.at.least(1);
    });

  });

  describe('Map Required Options Tests', function() {
    it('it should have the property `options` define `center` as an instance of `google.maps.LatLng`', function() {
      expect(googleMaps).to.have.deep.property('options.center').that.is.an.instanceof(google.maps.LatLng);
      expect(googleMaps).to.have.deep.property('options.center').that.is.an('object');
    });

    it('it should have the property `options` define `zoom` as an {integer}', function() {
      expect(googleMaps).to.have.deep.property('options.zoom').that.is.a('number');
    });
  });

  describe('Map Prototype Method Tests', function() {
    it('it should respond to a method call of `setLocationMarkers()`', function() {
      expect(googleMaps).to.respondTo('setLocationMarkers');
    });

    it('it should have a method of `onError()`', function() {
      expect(googleMaps).to.respondTo('onError');
    });
  });
});
