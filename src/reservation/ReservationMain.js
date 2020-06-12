import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import SelectPlace from "./SelectPlace";
import SelectDetail from "./SelectDetail";
import SelectTeam from "./SelectTeam";

class ReservationMain extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/" component={SelectTeam} />
          <Route path="/SelectPlace/:type" component={SelectPlace} />
          <Route path="/SelectDetail/" component={SelectDetail} />
        </BrowserRouter>
      </div>
    );
  }
}

export default ReservationMain;
