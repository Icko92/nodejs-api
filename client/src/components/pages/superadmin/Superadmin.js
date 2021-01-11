//Dependecies
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Components
import SideNavbar from "../../shared/SideNavbar/SideNavbar";
import Register from "../../shared/Register/Register";

import "./Superadmin.scss";

function Superadmin() {
  return (
    <Router>
      <div className="superadmin">
        <SideNavbar />
        <div className="container">
          <Route exact path="/superadmin/register" component={Register} />
        </div>
      </div>
    </Router>
  );
}

export default Superadmin;
