<template>
  <div>
    <div id="map" style="width:500px;height:400px;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {

      
    }
  }
  mounted() {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.Lating(33.450701, 126.560667),
      level: 3
    };
    var map = new kakao.maps.Map(container, options);
  },
}

</script>
