import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import SelectPlace from "./SelectPlace";
import SelectDetail from "./SelectDetail";
import SelectTeam from "./SelectTeam";
import ResultRes from "./ResultRes";

class ReservationMain extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/Reservation" component={SelectTeam} />
          <Route path="/SelectPlace/:type" component={SelectPlace} />
          <Route path="/SelectDetail/" component={SelectDetail} />
          <Route path="/ResultRes/" component={ResultRes} />
        </Switch>
      </div>
    );
  }
}

export default ReservationMain;
