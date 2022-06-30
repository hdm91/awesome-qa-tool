import React from "react";
import { Bem } from "../../../utils";

import "./Card.scss";

type CardProps = {
  children?: JSX.Element | JSX.Element[];
  title?: string | JSX.Element;
};

const cls = Bem("card");

function Card(props: CardProps) {
  const { children, title } = props;

  return (
    <div data-testid="card" className={cls()}>
      {title && <h3 className={cls("title")}>{title}</h3>}
      {children}
    </div>
  );
}

export default React.memo(Card);
