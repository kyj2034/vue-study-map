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

      /**
       *  v3 스크립트를 동적으로 로드하기 위해서  script.src(v3 로딩 스크립트 주소) 에 &autoload=false 를 지정해주어야 한다.
       *  */
      script.src=
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=8fc19945dc1d57788954dab6a661466b&autoload=false"
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.377688, 127.113726, ),
        level: 5,
      };

      this.map = new kakao.maps.Map(container, options);
    }
  }
}

</script>

<style scoped>
  #map {
    width: 400px;
    height: 400px;
  }
</style>
