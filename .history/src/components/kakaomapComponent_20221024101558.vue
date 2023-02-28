<template>
  <div>
    <div id="map"></div>
    <button @click="makeMarker">makeMarker</button>
  </div>
</template>

<script>
import geojson from '../../src/assets/data/emd.geojson'


export default {
  data() {
    return {
      container : null,
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
      this.container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.37768859034813, 127.11372691736119),
        level: 3,
      };

      this.map = new kakao.maps.Map(this.container, options);
    },
    makeMarker(){
      const markerPosition = new kakao.maps.LatLng(37.37768859034813, 127.11372691736119);

      const marker = new kakao.maps.Marker({
        position: markerPosition
      });

      marker.setMap(this.map);
    },
    useEffect(){
      let data = geojson.features;
      let coordinates = []; // 좌표 지정 배열
      let name = '';  // 행정구 이름

      let polygon = [];

      const mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 9, // 지도의 확대 레벨
      }

      const map = new kakao.maps.Map(this.container, mapOption );
      const customOverlay = new kakao.maps.CustomOverlay({});
      const infowindow = new kakao.maps.InfoWindow({ removable : true});

      const displayArea = (coordinates, name) => {
        let path = [];
        let points = [];
        let areaResult = pollution.filter((item) => item[0] === name);
        console.log(areaResult);

        coordinates[0].forEach((coordinate) => {
          let point = {};
          point.x = coordinate[1];
          point.y = coordinate[0];
          points.push(point);

        })
      }
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
