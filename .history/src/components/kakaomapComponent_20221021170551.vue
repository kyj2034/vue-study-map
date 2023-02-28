<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {

      
    }
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src=
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=9c02d5ebfb86962aa55245ef5b63fef1"
    }
  },
}

</script>
