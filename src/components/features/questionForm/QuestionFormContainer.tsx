import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  questionAdd,
  questionAddWithDelay,
  questionUpdate,
  questionUpdateWithDelay,
  selectQuestionById,
  selectCurrentForm,
} from "../../../redux/slices/questionsSlice";
import { RootState } from "../../../redux/store";
import { FormMode, Question } from "../../../types";
import { isFunction, uid } from "../../../utils";
import QuestionForm from "./QuestionForm";

type FormContainerProps = {
  mode: FormMode;
  id?: string;
  onFinish?: () => void;
};

function QuestionFormContainer(props: FormContainerProps) {
  const { mode, id, onFinish } = props;
  const dispatch = useDispatch<any>();
  const currentForm = useSelector(selectCurrentForm);
  const initialValues = useSelector(
    (state: RootState) => id && selectQuestionById(state, id)
  );

  const handleFinishNew = useCallback(
    (values: any) => {
      const newValues = {
        id: uid(),
        title: values.title,
        answer: values.answer,
      };
      if (values.withDelay) {
        dispatch(questionAddWithDelay(newValues));
      } else {
        dispatch(questionAdd(newValues));
      }
    },
    [dispatch]
  );

  const handleFinishEdit = useCallback(
    (values: any) => {
      if (id) {
        const updateValue = {
          id,
          changes: {
            title: values.title,
            answer: values.answer,
          },
        };
        if (values.withDelay) {
          dispatch(questionUpdateWithDelay(updateValue));
        } else {
          dispatch(questionUpdate(updateValue));
        }

        if (isFunction(onFinish)) {
          onFinish();
        }
      }
    },
    [dispatch, id, onFinish]
  );

  if (mode === "new") {
    return (
      <QuestionForm
        pending={currentForm.status === "pending" && currentForm.id === null}
        onFinish={handleFinishNew}
      />
    );
  } else if (mode === "edit" && initialValues) {
    return (
      <QuestionForm
        pending={currentForm.status === "pending" && currentForm.id === id}
        initialValues={initialValues as Question}
        onFinish={handleFinishEdit}
        submitButtonText={"Update"}
      />
    );
  }

  return null;
}

export default QuestionFormContainer;
