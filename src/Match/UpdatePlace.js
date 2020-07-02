import React, { Component } from "react";
import Axios from "axios";
const { kakao } = window;

let placeaddr = "";
let placelat = "";
let placelng = "";

class UpdatePlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultLat: "",
      place_name: "",
      place_pic: "",
      place_etc: [],
      place_max: 0,
      place_price: "",
      dData: [],
      isChecked: true,
    };
  }
  detailData = () => {
    let id = this.props.location.state.place_id;
    console.log(id);
    // const url = "http://192.168.0.108:9000/matchplay/placelist/detail?id=";
    const url = "http://localhost:9000/matchplay/placelist/detail?id=";

    Axios.get(url + id)
      .then((res) => {
        this.setState(
          {
            dData: res.data,
            place_name: res.data.place_name,
            place_etc: res.data.place_etc.split("/"),
            place_pic: res.data.place_pic,
            place_max: res.data.place_max,
            place_price: res.data.place_price,
            place_addr: res.data.place_addr,
            place_lat: res.data.place_lat,
            place_lng: res.data.place_lng,
          },
          () => console.log(this.state.place_etc)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //이미지 업로드 함수
  onImageUpload = (e) => {
    //파일 얻기
    const uploadFiles = e.target.files;
    //파일명 얻기
    let filename = "";
    for (let i = 0; i < e.target.files.length; i++) {
      filename += e.target.files[i].name + "/";
    }
    console.log(filename);
    e.preventDefault();

    //FormData 형식으로 만들기
    const boardFile = new FormData();
    for (let i = 0; i < uploadFiles.length; i++) {
      boardFile.append("uploadFile", uploadFiles[i]);
    }

    Axios({
      method: "post",
      url: "http://localhost:9000/matchplay/place/uploadpic",
      // url: "http://192.168.0.108:9000/matchplay/place/uploadpic",

      data: boardFile,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        this.setState(
          {
            place_pic: this.state.place_pic + "/" + filename,
          },
          () => console.log("업로드한 파일명:" + res.data)
        );
      })
      .catch((err) => {
        console.log("업로드 오류:" + err);
      });
  };
  removeImage = (e) => {
    let a = e.currentTarget.getAttribute("value");
    let placepic = this.state.place_pic.replace(a, "");
    if (placepic.indexOf("/") == 0) {
      placepic = placepic.replace("/", "");
    }
    this.setState({
      place_pic: placepic,
    });
  };

  onKeyChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  toggleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (!e.target.checked) {
      const idx = this.state.place_etc.indexOf(e.target.value);
      if (idx > -1) this.state.place_etc.splice(idx, 1);
    } else {
      this.state.place_etc.push(e.target.value);
    }
    console.log(this.state.place_etc.toString());
  };

  updatePlace = (e) => {
    let url = "http://localhost:9000/matchplay/updateplace";
    // let url = "http://192.168.0.108:9000/matchplay/updateplace";
    Axios.post(url, {
      place_id: this.props.location.state.place_id,
      place_name: this.state.place_name,
      place_etc: this.state.place_etc.toString(),
      place_addr: placeaddr === "" ? this.state.place_addr : placeaddr,
      place_lat: placelat === "" ? this.state.place_lat : placelat,
      place_lng: placelng === "" ? this.state.place_lng : placelng,
      place_pic: this.state.place_pic,
      place_max: this.state.place_max,
      place_price: this.state.place_price,
    })
      .then((responseData) => {
        //url로부터 받은 데이터 state변수에 넣기
        this.props.history.push("/Reservation");
      })
      .catch((error) => {
        console.log("add 에러:" + error);
      });
  };
  componentDidMount() {
    this.detailData();
    let lat = 37.49873322288245;
    let lng = 127.0317097937344;
    let mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
        level: 7, // 지도의 확대 레벨
      };
    let markers = [];
    let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    let geocoder = new kakao.maps.services.Geocoder();

    let marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
      infowindow = new kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          let latlng = mouseEvent.latLng;

          let message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
          message += "경도는 " + latlng.getLng() + " 입니다";

          let resultDiv = document.getElementById("result");
          let resultLat = document.getElementById("maplat");
          let resultLng = document.getElementById("maplng");
          resultLat.value = latlng.getLat();
          resultLng.value = latlng.getLng();
          resultDiv.innerHTML = message;

          // var detailAddr = !!result[0].road_address
          //   ? "<div>도로명주소 : " +
          //     result[0].road_address.address_name +
          //     "</div>"
          //   : "";
          let detailAddr =
            "<div>지번 주소 : " + result[0].address.address_name + "</div>";
          document.getElementById("mapaddr").value =
            result[0].address.address_name;
          let content =
            '<div class="bAddr">' +
            '<span class="title">법정동 주소정보</span>' +
            detailAddr +
            "</div>";
          // 마커를 클릭한 위치에 표시합니다
          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          placeaddr = result[0].address.address_name;
          placelat = latlng.getLat();
          placelng = latlng.getLng();

          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
    });
    kakao.maps.event.addListener(map, "idle", function () {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById("centerAddr");

        for (var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === "H") {
            infoDiv.innerHTML = result[i].address_name;
            break;
          }
        }
      }
    }
  }

  render() {
    return (
      <div align="center">
        {this.state.place_pic}
        {this.state.place_etc.toString()}
        <form onSubmit={this.updatePlace.bind(this)}>
          <table style={{ width: "40%" }}>
            <hr />
            <h5 className="Title">구장 수정</h5>
            <span className="Context">
              수정하고자 하는 구장 정보를 입력하세요.
            </span>
            <hr />
            <strong>· 구장명</strong>
            <br />
            <input
              onChange={this.onKeyChange.bind(this)}
              type="text"
              className="Input"
              name="place_name"
              value={this.state.place_name}
              placeholder="구장명 입력"
            />
            <br />
            <strong>· 사진</strong>
            <input
              type="file"
              className="Input"
              name="place_pic"
              multiple
              onChange={this.onImageUpload.bind(this)}
            />
            <div align="right">
              <div style={{ width: "420px" }}>
                {this.state.place_pic.split("/").map((item, i) =>
                  i != 0 && i % 4 == 0 ? (
                    <div>
                      <img
                        style={{ width: "100px" }}
                        value={item}
                        src={"http://localhost:9000/matchplay/image/" + item}
                        alt=""
                        onClick={this.removeImage.bind(this)}
                      ></img>
                      <br></br>
                    </div>
                  ) : (
                    <img
                      style={{ width: "100px" }}
                      value={item}
                      src={"http://localhost:9000/matchplay/image/" + item}
                      alt=""
                      onClick={this.removeImage.bind(this)}
                    ></img>
                  )
                )}
              </div>
            </div>
            <br></br>
            <strong>· 구장 시설</strong>
            <div
              align="left"
              className="txt8"
              style={{
                marginLeft: "160px",
                marginBottom: "5px",
                height: "35px",
                padding: "10px 12px",
              }}
            >
              <input
                type="checkbox"
                style={{ marginRight: "10px" }}
                name="place_etc1"
                value="주차"
                // onChange={this.handleInputChange.bind(this)}
                onChange={this.toggleChange}
                checked={this.state.place_etc.includes("주차") ? true : false}
              ></input>
              <span style={{ marginRight: "15px" }}>주차</span>
              <input
                type="checkbox"
                style={{ marginRight: "10px" }}
                name="place_etc2"
                value="공"
                onChange={this.toggleChange}
                checked={this.state.place_etc.includes("공") ? true : false}
              ></input>
              <span style={{ marginRight: "15px" }}>공 대여</span>
              <input
                type="checkbox"
                style={{ marginRight: "10px" }}
                name="place_etc3"
                value="샤워"
                onChange={this.toggleChange}
                checked={this.state.place_etc.includes("샤워") ? true : false}
              ></input>
              <span style={{ marginRight: "15px" }}>샤워 시설</span>
              <input
                type="checkbox"
                style={{ marginRight: "10px" }}
                name="place_etc4"
                value="풋살화"
                onClick={this.toggleChange}
                checked={this.state.place_etc.includes("풋살화") ? true : false}
              ></input>
              <span style={{ marginRight: "15px" }}>풋살화 대여</span>
              <input
                type="checkbox"
                style={{ marginRight: "10px" }}
                name="place_etc5"
                value="유니폼"
                onChange={this.toggleChange}
                checked={this.state.place_etc.includes("유니폼") ? true : false}
              ></input>
              <span style={{ marginRight: "15px" }}>유니폼 대여</span>
            </div>
            <br></br>
            <strong>· 이용료</strong>
            <br />
            <input
              id="mapprice"
              className="Input"
              placeholder="구장 이용료"
              name="place_price"
              value={this.state.place_price}
              onChange={this.onKeyChange.bind(this)}
            ></input>
            <br></br>
            <strong>· 최대인원</strong>
            <br />
            <input
              id="mapmax"
              type="number"
              className="Input"
              placeholder="구장 최대인원"
              name="place_max"
              value={this.state.place_max}
              onChange={this.onKeyChange.bind(this)}
            ></input>
            <br></br>
            <strong>· 주소</strong>
            <br />
            <input
              type="text"
              id="maplat"
              className="Input"
              placeholder="위도"
              name="place_lat"
              value={this.state.place_lat}
              onChange={this.onKeyChange.bind(this)}
            ></input>
            <input
              type="text"
              id="maplng"
              className="Input"
              placeholder="경도"
              name="place_lng"
              value={this.state.place_lng}
              onChange={this.onKeyChange.bind(this)}
            ></input>
            <input
              id="mapaddr"
              className="Input"
              placeholder="구장 주소"
              name="place_addr"
              value={this.state.place_addr}
              onChange={this.onKeyChange.bind(this)}
            ></input>
            <br></br>
            <div>
              <span
                id="centerAddr"
                style={{
                  position: "relative",
                  top: "20px",
                  left: "10px",
                  zIndex: "50",
                  backgroundColor: "white",
                }}
              ></span>
              <div
                id="map"
                style={{ width: "100%", height: "350px", zIndex: "0" }}
              ></div>
            </div>
            <div id="result" hidden></div>
            <br />
            <br />
          </table>
          <div align="center">
            <button
              type="submit"
              className="joinbtn"
              id="submit_btn"
              style={{ margin: "0px" }}
            >
              구장수정
            </button>
            <button
              type="button"
              className="backbtn"
              onClick={this.props.history.goBack.bind(this)}
            >
              뒤로가기
            </button>
          </div>
        </form>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default UpdatePlace;
