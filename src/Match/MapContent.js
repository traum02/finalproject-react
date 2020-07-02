import React, { Component } from "react";
const { kakao } = window;

class MapContent extends Component {
  componentDidUpdate() {
    let lat = this.props.dData.place_lat;
    let lng = this.props.dData.place_lng;
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 4,
    };

    let map = new kakao.maps.Map(container, options);

    let markerPosition = new kakao.maps.LatLng(lat, lng);

    // 마커를 생성합니다
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  }

  render() {
    return <div id="map" style={{ width: "100%", height: "350px" }}></div>;
  }
}

export default MapContent;
