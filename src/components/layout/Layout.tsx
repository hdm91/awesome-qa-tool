import React from "react";
import { Bem } from "../../utils";
import Header from "./Header";

import "./Layout.scss";

export type LayoutProps = {
  children?: JSX.Element | JSX.Element[];
};

const cls = Bem("layout");

function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <React.Fragment>
      <Header />
      <div className={cls("content")}>{children}</div>
    </React.Fragment>
  );
}

export default Layout;
