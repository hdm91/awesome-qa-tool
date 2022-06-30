import React from "react";
import { connect } from "react-redux";
import { selectCount } from "../../../redux/slices/questionsSlice";
import { RootState } from "../../../redux/store";
import { Bem } from "../../../utils";

import "./QuestionTip.scss";

type QuestionTipProps = {
  count: number;
};

const cls = Bem("question-tip");

function QuestionTip(props: QuestionTipProps) {
  const { count } = props;

  return (
    <div className={cls()}>
      <img className={cls("icon")} src={"/assets/images/q_a_4.png"} alt="" />
      <span className={cls("title")}>
        Here you can find {count === 0 ? "no" : count} question
        {count > 1 && "s"}. Feel free to create your own questions!
      </span>
    </div>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    count: selectCount(state),
  };
};

export const QuestionTipConnected = connect(mapStateToProps)(QuestionTip);

export default React.memo(QuestionTip);
