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

const mapFail = function () {
  let el = document.getElementById('map').innerHTML = `
  <div class="row column">
    <div class="large alert callout">
      <h3>Whoops!</h3>
      <p>It seems something has gone terribly wrong... :(</p>
    </div>
  </div>
  `;
};
