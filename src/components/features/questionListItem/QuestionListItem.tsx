import React, { useState } from "react";
import { Bem } from "../../../utils";
import { CaretRightOutlined, CaretDownOutlined } from "@ant-design/icons";

import "./QuestionListItem.scss";

type QuestionListItemProps = {
  question: string;
  answer: string;
};

const cls = Bem("question-list-item");

function QuestionListItem(props: QuestionListItemProps) {
  const { question, answer } = props;
  const [answerVisible, setAnswerVisible] = useState(false);

  const handleClick = () => {
    setAnswerVisible(!answerVisible);
  };

  return (
    <div className={cls()}>
      {answerVisible ? (
        <CaretDownOutlined onClick={handleClick} className={cls("caret")} />
      ) : (
        <CaretRightOutlined onClick={handleClick} className={cls("caret")} />
      )}
      <span onClick={handleClick} className={cls("q")}>
        {question}
      </span>
      {answerVisible && <p className={cls("a")}>{answer}</p>}
    </div>
  );
}

export default QuestionListItem;
