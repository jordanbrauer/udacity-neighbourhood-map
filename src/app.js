'use strict';

(function (){
  $(document).foundation();
  $('#map').height($(window).height());
})();

let googleMaps;

function initMap() {
  let options = {
    center: new google.maps.LatLng(49.895136, -97.1383743999999),
    zoom: 11,
    scrollwheel: false,
  }

  googleMaps = new Map(Locations, options);

  return ko.applyBindings(googleMaps);
}
