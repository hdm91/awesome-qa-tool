import { createSelector } from "@reduxjs/toolkit";
import { Modal } from "antd";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  questionChangeSortOrder,
  questionRemoveAll,
  questionRemoveOne,
  selectAllQuestions,
  selectCount,
  selectSortOrder,
} from "../../../redux/slices/questionsSlice";
import { SortOrder } from "../../../types";
import QuestionFormContainer from "../questionForm/QuestionFormContainer";
import QuestionList from "./QuestionList";

const selectQuestionOrdered = createSelector(
  selectAllQuestions,
  selectSortOrder,
  (questions, sortOrder) => {
    if (sortOrder === SortOrder.ASC) {
      return [...questions].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === SortOrder.DESC) {
      return [...questions].sort((a, b) => b.title.localeCompare(a.title));
    }

    return [...questions];
  }
);

function QuestionListContainer() {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({ visible: false, id: "" });
  const questions = useSelector(selectQuestionOrdered);
  const count = useSelector(selectCount);

  const handleCommand = useCallback(
    (key: string, args: any) => {
      switch (key) {
        case "removeAll":
          dispatch(questionRemoveAll());
          break;
        case "sort":
          dispatch(questionChangeSortOrder(args.sortOrder));
          break;
        case "edit":
          setFormState({ visible: true, id: args.id });
          break;
        case "remove":
          dispatch(questionRemoveOne(args.id));
          break;
      }
    },
    [dispatch]
  );

  return (
    <React.Fragment>
      <QuestionList
        count={count}
        onCommand={handleCommand}
        questions={questions}
      ></QuestionList>
      <Modal
        footer={false}
        destroyOnClose={true}
        title="Edit question"
        visible={formState.visible}
        onCancel={() => setFormState({ visible: false, id: "" })}
      >
        <QuestionFormContainer
          onFinish={() => setFormState({ visible: false, id: "" })}
          mode="edit"
          id={formState.id}
        />
      </Modal>
    </React.Fragment>
  );
}

export default QuestionListContainer;
