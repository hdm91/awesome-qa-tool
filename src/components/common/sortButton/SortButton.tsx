import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { SortOrder } from "../../../types";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { isFunction } from "../../../utils";

type SortButtonProps = {
  onChange?: (sortOrder: SortOrder) => void;
  [rest: string]: any;
};

const sortOrderArray = [SortOrder.NONE, SortOrder.ASC, SortOrder.DESC];

function SortButton(props: SortButtonProps) {
  const { onChange, ...rest } = props;
  const [counter, setCounter] = useState(0);
  const sortOrder = sortOrderArray[counter % 3];

  const handleClick = () => {
    if (counter === 1000) {
      setCounter(0);
    }

    setCounter(counter + 1);
  };

  useEffect(() => {
    if (counter > 0 && isFunction(onChange)) {
      onChange(sortOrderArray[counter % 3]);
    }
  }, [counter, onChange, sortOrder]);

  const sortOrderIcon =
    sortOrder === SortOrder.ASC ? (
      <CaretUpOutlined />
    ) : sortOrder === SortOrder.DESC ? (
      <CaretDownOutlined />
    ) : (
      <MinusOutlined />
    );

  return (
    <Button {...rest} type="primary" onClick={handleClick} data-key="sort">
      Sort {sortOrderIcon}
    </Button>
  );
}

export default React.memo(SortButton);
