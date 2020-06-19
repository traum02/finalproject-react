import React, { Component } from "react";
import axios from "axios";
import PlaceItem from "./PlaceItem";
import Calendar from "./Calendar";
import map from "../css/map.png";
import "../css/map.css";

class SelectPlace extends Component {
  constructor(props) {
    super(props);
    const tmp = new Date().toLocaleDateString();
    let l = tmp.split(".");
    let today = "";
    for (let j = 0; j < 3; j++) {
      l[j] = l[j].replace(/ /gi, "");
    }
    for (let j = 0; j < 3; j++) {
      if (l[j].length === 1) {
        today += "0";
      }
      today += l[j];
    }

    this.state = {
      placeDatas: [],
      time: [],
      searchPlace: "",
      selectType: this.props.match.params.type,
      placeName: "",
      selectDate: today,
      pageNum: 3,
    };
  }

  list = (e) => {
    const type = this.state.selectType;
    const searchPlace = this.refs.searchPlace.value;
    const placeAddr = this.state.placeName;
    console.log(e + "eee");
    this.setState({
      selectDate: e === undefined ? this.state.selectDate : e,
    });
    let url =
      // "http://192.168.0.108:9000/matchplay/placelist" +
      "http://localhost:9000/matchplay/placelist" +
      "?type=" +
      type +
      "&place_name=" +
      searchPlace +
      "&place_addr=" +
      placeAddr +
      "&pageNum=" +
      this.state.pageNum;
    axios
      .get(url)
      .then((responseData) => {
        this.setState({
          placeDatas: responseData.data,
        });
        console.log(this.state.placeDatas);
      })
      .catch((error) => {
        console.log("list 에러:" + error);
      });
  };

  getTime = (e) => {
    let id = e.place_id;
    let type = e.type;
    let date = e.date;
    console.log(date + "type123");
    // const url =
    //   "http://192.168.0.108:9000/matchplay/placelist/gettime?place_id=";
    const url = "http://localhost:9000/matchplay/placelist/gettime?place_id=";
    axios
      .get(url + id + "&res_type=" + type + "&res_time=" + date)
      .then((res) => {
        this.setState({
          time: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.list();
  };
  selectTag = (e) => {
    console.log(e.target.value);
    this.setState(
      {
        placeName: e.target.value,
      },
      () => this.list()
    );
  };
  onClick = (e) => {
    console.log(e.currentTarget.textContent);
    this.setState(
      {
        placeName: e.currentTarget.textContent,
      },
      () => this.list()
    );
    // e.preventDefault();
  };

  searchPlace = (e) => {
    this.list();
    this.refs.searchPlace.value = "";
    e.preventDefault();
  };
  toTop = () => {
    window.scroll(0, 0);
  };
  componentDidMount() {
    const li = document.getElementsByTagName("li");
    for (var i = 0; i < li.length; i++) {
      li[i].addEventListener("click", this.onClick.bind(this));
    }
    this.list();
    document.addEventListener("scroll", () => {
      let tmp = window.innerHeight + window.pageYOffset;
      if (tmp == document.body.scrollHeight) {
        this.setState(
          {
            pageNum: this.state.pageNum + 1,
          },
          () => this.list()
        );
      }

      // console.log(window.innerHeight, window.pageYOffset);
      // console.log(
      //   window.innerHeight + window.pageYOffset >= document.body.offsetHeight
      // );
    });
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.onClick.bind(this));
  }
  render() {
    const arraySelect = [];
    const gu =
      "서울시 전체,강남구,강동구,강북구,강서구,관악구,광진구,구로구,금천구,노원구,도봉구,동대문구,동작구,마포구,서대문구,서초구,성동구,성북구,송파구,양천구,영등포구,용산구,은평구,종로구,중구,중랑구";
    const arrayGu = gu.split(",");
    for (let i = 0; i < arrayGu.length; i++) {
      arraySelect.push(
        <option key={i} value={arrayGu[i]}>
          {arrayGu[i]}
        </option>
      );
    }

    return (
      <div>
        <div id="map"></div>
        <div>
          <button type="button" onClick={this.props.history.goBack.bind(this)}>
            back
          </button>
        </div>
        {this.state.placeName}
        <div>
          <Calendar list={this.list.bind(this)}></Calendar>
        </div>
        <div style={{ border: "1px solid gray" }}>
          <div
            className="map"
            style={{
              width: "420px",
              backgroundImage: `url(${map})`,
              backgroundSize: "400px",
              backgroundRepeat: "no-repeat",
            }}
          >
            <ul>
              <li style={{ top: "25px", left: "165px" }}>도봉</li>
              <li style={{ top: "47px", left: "123px" }}>강북</li>
              <li style={{ top: "40px", left: "136px" }}>노원</li>
              <li style={{ top: "75px", left: "122px" }}>중랑</li>
              <li style={{ top: "75px", left: "50px" }}>성북</li>
              <li style={{ top: "90px", left: "40px" }}>동대문</li>
              <li style={{ top: "113px", left: "25px" }}>광진</li>
              <li style={{ top: "110px", left: "-33px" }}>성동</li>
              <li style={{ top: "103px", left: "-85px" }}>중구</li>
              <li style={{ top: "83px", left: "-122px" }}>종로</li>
              <li style={{ top: "58px", left: "-177px" }}>은평</li>
              <li style={{ top: "92px", left: "-210px" }}>서대문</li>
              <li style={{ top: "110px", left: "-250px" }}>마포</li>
              <li style={{ top: "102px", left: "112px" }}>용산</li>
              <li style={{ top: "78px", left: "-10px" }}>강서</li>
              <li style={{ top: "112px", left: "-15px" }}>양천</li>
              <li style={{ top: "130px", left: "-50px" }}>구로</li>
              <li style={{ top: "110px", left: "-40px" }}>영등포</li>
              <li style={{ top: "150px", left: "-85px" }}>금천</li>
              <li style={{ top: "125px", left: "-80px" }}>동작</li>
              <li style={{ top: "150px", left: "-105px" }}>관악</li>
              <li style={{ top: "140px", left: "-96px" }}>서초</li>
              <li style={{ top: "133px", left: "-93px" }}>강남</li>
              <li style={{ top: "120px", left: "-88px" }}>송파</li>
              <li style={{ top: "88px", left: "-95px" }}>강동</li>
              <br></br>
              <li style={{ top: "0px", left: "-120px", fontSize: "20pt" }}>
                서울
              </li>
            </ul>
          </div>
          <div>
            <div style={{ display: "inline-block" }}>
              <select
                name="selectPlace"
                id="selectPlace"
                onChange={this.selectTag.bind(this)}
              >
                <option disabled hidden selected>
                  지역선택
                </option>
                {arraySelect}
              </select>
            </div>
            <div style={{ display: "inline-block" }}>
              {this.state.searchPlace}
              <form onSubmit={this.searchPlace.bind(this)}>
                <input
                  type="text"
                  name="searchPlace"
                  ref="searchPlace"
                  onChange={this.onChange.bind(this)}
                  placeholder="명칭"
                ></input>
                <button type="submit">검색</button>
              </form>
            </div>
          </div>
        </div>
        {this.state.selectType === "0" ? "개인 선택" : "팀 선택"}
        <br></br>
        {this.state.selectDate !== undefined
          ? "선택일" + this.state.selectDate
          : ""}
        <div>
          {this.state.placeDatas.map((row, idx) => (
            <PlaceItem
              row={row}
              idx={idx}
              key={idx}
              placeName={this.state.placeName}
              type={this.state.selectType}
              date={this.state.selectDate}
            />
          ))}
          <button onClick={this.toTop.bind(this)}>맨 위로</button>
        </div>
        <div
          style={{ height: "100px", backgroundColor: "rgba(80, 51, 150, 0.3)" }}
        ></div>
      </div>
    );
  }
}

export default SelectPlace;
