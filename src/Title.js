import React from "react";
import { Route } from "react-router-dom";
import {
  Home,
  Team,
  QnA,
  Gujang,
  Reservation,
  JoinFinal,
  JoinForm,
  LoginForm,
  Payment,
  TeamHome,
  TeamMember,
  MatchHistory,
  TeamBoard,
  TWrite,
  Mypage,
  MyMatchHistory,
  Account,
  PointHistory,
  Write,
  CreateTeam,
  PwdCheck,
  TCSuccess,
  PointCharge,
  List,
  Content,
  IboardItemPwdCheck,
  PwdChange,
  IboardUpdate,
  ICommentAdd,
  TeamMatchHistory,
  TWriteUpdate,
  TContent,
} from "./pages"; //index.js 호출
import { Drop, UpdPass } from "./User";
import League from "./League/LeagueMain";
import Match from "./Match/SelectTeam";
import Root from "./Root";
import "./Css/MainStyle.css";
import Menu from "./MainComponents/Menu";
import Footer from "./MainComponents/Footer";
import Banner from "./MainComponents/Banner";
import logo2 from "./image/logo2.png";
import ReservationMain from "./Match/ReservationMain";
import MyRes from "./pages/MyRes";
import MngRes from "./Manage/MngRes";
const Title = () => {
  return (
    <div>
      <Banner />
      <Menu />
      <img src={logo2} className="logo2" alt="" />
      <Route exact path="/" component={Home} />
      {/* exact : 다른 페이지랑 겹쳐나오지 않도록 해준다. */}
      {/* <Route exact path="/Match" component={Match} /> */}
      {/* <Route path="/about" component={About} /> */}
      <ReservationMain></ReservationMain>

      <Route exact path="/League" component={League} />

      <Route exact path="/Team/:team_num" component={Team} />

      {/* <Route exact path="/QnA" component={QnA} /> */}

      {/* <Route exact path="/Match/Gujang" component={Gujang} /> */}

      <Route exact path="/Match/Gujang/Reservation" component={Reservation} />

      <Route exact path="/Login" component={LoginForm} />

      <Route exact path="/Login/JoinForm" component={JoinForm} />

      <Route exact path="/Login/JoinForm/JoinFinal" component={JoinFinal} />
      {/* <Route
        exact
        path="/Match/Gujang/Reservation/Payment"
        component={Payment}
      /> */}

      <Route exact path="/Team/TeamHome/:team_num" component={TeamHome} />

      <Route
        exact
        path="/Team/TeamHome/TeamMember/:team_num"
        component={TeamMember}
      />

      <Route
        exact
        path="/Team/TeamHome/MatchHistory"
        component={MatchHistory}
      />

      <Route
        exact
        path="/Team/TeamHome/TeamBoard/:team_num"
        component={TeamBoard}
      />
      <Route
        path="/Team/TeamHome/TeamBoard/list/:team_num/:start"
        component={TeamBoard}
      />

      <Route
        exact
        path="/Team/TeamHome/TeamBoard/add/TWrite"
        component={TWrite}
      />

      <Route exact path="/Mypage" component={Mypage} />

      <Route exact path="/Mypage/MyMatchHistory" component={MyMatchHistory} />

      <Route exact path="/Mypage/Account" component={Account} />

      <Route exact path="/Mypage/PointHistory" component={PointHistory} />

      <Route exact path="/QnA/Write" component={Write} />

      <Route exact path="/Account/UserInfo/UserDrop" component={Drop} />

      <Route exact path="/Mypage/Account/PwdCheck" component={PwdCheck} />

      <Route
        exact
        path="/Mypage/Account/PwdCheck/PwdChange"
        component={UpdPass}
      />

      <Route exact path="/QnA/1/Write" component={Write} />

      <Route exact path="/QnA/:preidx?" component={List} />
      <Route
        exact
        path="/iboard/select/:iboard_num/:preidx"
        component={Content}
      />

      <Route
        exact
        path="/iboard/secpwd/:iboard_num/:preidx"
        component={IboardItemPwdCheck}
      />
      {/* <Route exact path="/iboard/secpwd/:iboard_num" component={IboardItemPwdCheck}/> */}

      <Route
        exact
        path="/iboard/update/:iboard_num"
        component={IboardUpdate}
      ></Route>

      <Route
        exact
        path="/icomment/add/:iboard_num"
        component={ICommentAdd}
      ></Route>

      <Route exact path="/Team/CreateTeam/Success" component={TCSuccess} />

      <Route exact path="/Mypage/ReservationHistory" component={MyRes} />

      <Route exact path="/Mypage/PointCharge" component={PointCharge} />

      <Route
        exact
        path="/Team/TeamHome/MatchHistory/:team_num"
        component={TeamMatchHistory}
      />
      <Route
        exact
        path="/Team/TeamHome/TeamBoard/update/TWriteUpdate/:tboard_num"
        component={TWriteUpdate}
      />
      <Route
        exact
        path="/Team/TeamHome/TeamBoard/TContent/:tboard_num/:start"
        component={TContent}
      />
      <Route exact path="/Team/Create/CreateTeam" component={CreateTeam} />
      <Route exact path="/MngRes" component={MngRes} />
      <Footer />
    </div>
  );
};

export default Title;
