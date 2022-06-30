import React, { useState } from "react";
import { Bem } from "../../../utils";

import "./Tooltip.scss";

type TooltipProps = {
  content: string | JSX.Element | JSX.Element[];
  children: string | JSX.Element | JSX.Element[];
};

const cls = Bem("tooltip");

function Tooltip(props: TooltipProps) {
  const [visible, setVisible] = useState(false);

  const handleMouseEnter = () => {
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  return (
    <div
      className={cls()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {props.children}
      {visible && <div className={cls("content")}>{props.content}</div>}
    </div>
  );
}

export default React.memo(Tooltip);
