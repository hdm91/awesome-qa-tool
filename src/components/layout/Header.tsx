import React from "react";
import { Bem } from "../../utils";

import "./Header.scss";

const cls = Bem("header");

function Header() {
  return (
    <header className={cls()}>
      <img className={cls("logo")} src="/assets/images/q_a_3.png" alt="" />
      <span className={cls("title")}>
        The awesome <span>Q</span>/<span>A</span> tool
      </span>
    </header>
  );
}

export default Header;
