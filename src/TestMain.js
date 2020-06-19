import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
// import SelectPlace from "./reservation/SelectPlace";
// import SelectDetail from "./reservation/SelectDetail";
// import SelectTeam from "./reservation/SelectTeam";
// import ResultRes from "./reservation/ResultRes";
import TestMenu from "./TestMenu";
import ReservationMain from "./reservation/ReservationMain";
import LeagueMain from "./league/LeagueMain";

class TestMain extends Component {
  render() {
    return (
      <div>
        <BrowserRouter forceRefresh={true}>
          <Route exact path="/" component={TestMenu} />
          <ReservationMain></ReservationMain>
          <Route path="/League/" component={LeagueMain} />
          {/* <Route path="/SelectTeam" component={SelectTeam} />
          <Route path="/SelectPlace/:type" component={SelectPlace} />
          <Route path="/SelectDetail/" component={SelectDetail} />
          <Route path="/ResultRes/" component={ResultRes} /> */}
        </BrowserRouter>
      </div>
    );
  }
}

export default TestMain;
