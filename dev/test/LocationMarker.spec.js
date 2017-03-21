'use strict';

describe('LocationMarker ViewModel Tests', function() {
  it('it is an instance of `LocationMarker` and is of type {object}', function() {
    for (var i = 0; i < googleMaps.markers.length; i++) {
      expect(googleMaps.markers[i]).to.be.an.instanceof(LocationMarker);
    }

    expect(googleMaps).to.be.an('object');
  });

  it('it should have a property of `map` that is not empty and is of type {object}.');

  it('it should have a property of `name` that is not null and is of type {string}.');

  it('it should have a property of `lat` that is not null and is of type {integer}.');

  it('it should have an alias property of `latitude` that is equal to `lat`.');

  it('it should have a property of `lng` that is not null and is of type {integer}.');

  it('it should have an alias property of `longitude` that is equal to `lng`.');

  it('it should have a property of `content` that is not null and is of type {string}.');

  it('it should have a property of `marker` that is an instance of `google.maps.Marker`.');

  it('it should have a property of `infoWindow` that is an instance of `google.maps.InfoWindow`.');
});
