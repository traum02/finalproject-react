import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import SelectPlace from "./SelectPlace";
import SelectDetail from "./SelectDetail";
import SelectTeam from "./SelectTeam";
import ResultRes from "./ResultRes";
import AddPlace from "./AddPlace";
import Updateplace from "./UpdatePlace";

class ReservationMain extends Component {
  render() {
    return (
      <div align="center">
        <Switch>
          <Route exact path="/Reservation" component={SelectTeam} />
          <Route exact path="/SelectPlace/:type" component={SelectPlace} />
          <Route exact path="/SelectDetail/" component={SelectDetail} />
          <Route exact path="/ResultRes/" component={ResultRes} />
          <Route exact path="/AddPlace/" component={AddPlace} />
          <Route exact path="/Updateplace/" component={Updateplace} />
        </Switch>
      </div>
    );
  }
}

export default ReservationMain;
