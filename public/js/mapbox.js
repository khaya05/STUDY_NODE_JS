/*eslint-disable */
const locations = document.getElementById('map').dataset.locations;

mapboxgl.accessToken =
  'pk.eyJ1Ijoia2hheWEwNSIsImEiOiJjbGlkMGd5MXcwM2R3M3RtaXZlN25uZjI3In0.nUJMvSKaNK8hodiaS-rfkA';

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/khaya05/clid122y7001r01r0cmy9czw3' // style URL
  // center: [-118.113491, 34.111745], // starting position [lng, lat]
  // zoom: 4 // starting zoom
});

const bounds = new mapboxgl.LngLatBounds();

locations.foreEach(loc => {
  // create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(loc.coordinates)
    .addTo(map);
  // add popup
  new mapboxgl.Popup().setLngLat;
  // extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 200,
    left: 100,
    right: 100
  }
});
