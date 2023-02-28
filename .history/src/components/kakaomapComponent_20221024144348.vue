<template>
  <div>
    <div id="map"></div>
    <button @click="makeMarker">makeMarker</button>
  </div>
</template>

<script>
import axios from 'axios'

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
    async getAccessToken(){

      let acessToken = await axios({
        method: 'get',
        url: 'https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json',
        data : {
          consumer_key : '',
          consumer_secret : '',
        },
        success : (data) => {
          const result = { errCnt : 0, accessToken : data.result.accessToken};  
          console.debug(result);
          return result;
        },
        error : function(data) {
          console.debug(data);
        }
      });
      
    },
    useEffect(){
      let data = this.getData();
      let coordinates = []; // 좌표 지정 배열
      let name = '';  // 행정구 이름

      let polygons = [];

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

        coordinates[0].forEach((coordinate) => {
          let point = {};
          point.x = coordinate[1];
          point.y = coordinate[0];
          points.push(point);
          path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
        });

        let polygon = new kakao.maps.Polygon({
          map : map,
          path: path, // 그려질 다각형의 좌표 배열이다.
          strokeWeight: 2, // 선의 두께이다.
          strokeColor: '#004c80', // 선의 색깔.
          strokeOpacity: 0.8,   // 선의 불투명도, 1에서 0 사이의 값이며 0에 가까울수록 투명하다.
          strokeStyle: 'solid',  // 선의 스타일.
          fillColor: '#FFF',    // 채우기 색깔.
          fillOpacity: 0.7,     // 채우기 불투명도.
        });

        polygons.push(polygon);

        // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경한다.
        // 지역명을 표시하는 커스텀오버레이를 지도 위에 표시한다.
        kakao.maps.event.addListener(polygons, 'mouseover', function (mouseEvent) {
          polygon.setOptions({ fillColor: '#09f' });

          customOverlay.setContent('<div> class="area">' + name + '</div>');

          customOverlay.setPosition(mouseEvent.latLng);
          customOverlay.setMap(map);
        })

        // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경한다.
        kakao.maps.event.addListener(polygon, 'mouseover', function(mouseEvent) {
          customOverlay.setPosition(mouseEvent.latLng);
        })

        // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경한다.
        kakao.maps.event.addListener(polygon, 'mouseout', function () {
          polygon.setOptions({fillColor: '#fff'});
          customOverlay.setMap(null);
        });

// 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 다각형의 이름과 면적을 인포윈도우에 표시합니다
        kakao.maps.event.addListener(polygon, 'click', function (mouseEvent) {
          const content =
            '<div style="padding:2px;"><p><b>' +
                +
              '</div>';

          infowindow.setContent(content);
          infowindow.setPosition(mouseEvent.latLng);
          infowindow.setMap(map);
        });

      }

      

      data.forEach((val) => {
          coordinates = val.geometry.coordinates;
          name = val.properties.SIG_KOR_NM;

          (coordinates, name);
        });

      displayArea(coordinates, name);
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
