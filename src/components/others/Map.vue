<template>
  <div class="map">
    <div class="title">{{title}}</div>
    <div id="map"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster.js";

export default defineComponent({
  name: "Map",
  props: {
    points: {
      type: Object,
      required: false,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      tiles: null,
      map: null,
      markers: [],
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    addMarkers() {
      let markerList = [];

      this.points.forEach((point) => {
        let marker = L.marker(L.latLng(point.lat, point.lon)).bindPopup(
          point.name
        );
        markerList.push(marker);
      });

      this.markers.addLayers([...markerList]);
      this.map.addLayer(this.markers);
    },
    initMap() {
      this.tiles = L.tileLayer(
        "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        // "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      );
      this.map = L.map("map", {
        minZoom: 3,
        zoomControl: false,
        layers: this.tiles,
        center: [48.85341, 2.3488],
        zoom: 7,
        crossOrigin: true,
      });
      //sometimes an error is thrown "L.markerClusterGroup is not a function"
      try {
        this.markers = L.markerClusterGroup();
      } catch {
        //this.$router.go(0);
      }
      this.addMarkers();
    },
  },
});
</script>
<style lang="scss" scoped>
.map {
  margin-bottom: 50px;
  .title {
    font-size: 1.8em;
    margin-bottom: 10px;
  }
  #map {
    width: 80vw;
    height: 800px;
  }
}
</style>
