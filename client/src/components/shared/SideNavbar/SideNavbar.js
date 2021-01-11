import React from "react";
import { Link } from "react-router-dom";

import "./SideNavbar.scss";

function SideNavbar() {
  return (
    <div className="side-navbar">
      <Link to="/superadmin/register" className="side-nav-links">
        Add Account
      </Link>
    </div>
  );
}

export default SideNavbar;
