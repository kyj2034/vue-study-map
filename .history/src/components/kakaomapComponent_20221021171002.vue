<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {

      infowindow: null,
    }
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src=
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=9c02d5ebfb86962aa55245ef5b63fef1"
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5
      };

      this.map = new kakao.maps.Map(container, options);
    }
  }
}

</script>
