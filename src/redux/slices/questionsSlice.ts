import { createSlice, createEntityAdapter, Update } from "@reduxjs/toolkit";
import { sampleQuestion } from "../../data/sampleQuestion";
import { Question, SortOrder } from "../../types";
import { RootState, AppThunk } from "../store";

export interface QuestionsState {
  ids: string[];
  entities: Record<string, Question>;
  sortOrder: SortOrder;
  currentForm: {
    status: "pending" | "idle";
    id: string | null;
  };
}

const initialState: QuestionsState = {
  sortOrder: SortOrder.NONE,
  ids: [sampleQuestion.id],
  entities: {
    [sampleQuestion.id]: {
      ...sampleQuestion,
    },
  },
  currentForm: {
    status: "idle",
    id: null,
  },
};

const questionsAapter = createEntityAdapter<Question>({
  selectId: (question) => question.id,
  sortComparer: false,
});

export const questionsSlice = createSlice({
  name: "questions",
  initialState: questionsAapter.getInitialState(initialState),
  reducers: {
    questionAdd: questionsAapter.addOne,
    questionUpdate: questionsAapter.updateOne,
    questionRemoveOne: questionsAapter.removeOne,
    questionRemoveAll: questionsAapter.removeAll,
    questionChangeSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    questionSetStatus: (state, action) => {
      const { status, id } = action.payload;
      state.currentForm = {
        id,
        status,
      };
    },
  },
});

export const {
  questionAdd,
  questionUpdate,
  questionRemoveOne,
  questionRemoveAll,
  questionChangeSortOrder,
  questionSetStatus,
} = questionsSlice.actions;

export const questionAddWithDelay =
  (question: Question): AppThunk =>
  (dispatch) => {
    dispatch(questionSetStatus({ status: "pending", id: null }));

    setTimeout(() => {
      dispatch(questionAdd(question));
      dispatch(questionSetStatus({ status: "idle", id: null }));
    }, 5000);
  };

export const questionUpdateWithDelay =
  (update: Update<Question>): AppThunk =>
  (dispatch) => {
    dispatch(questionSetStatus({ status: "pending", id: update.id }));

    setTimeout(() => {
      dispatch(questionUpdate(update));
      dispatch(questionSetStatus({ status: "idle", id: null }));
    }, 5000);
  };

export const {
  selectAll: selectAllQuestions,
  selectTotal: selectCount,
  selectById: selectQuestionById,
} = questionsAapter.getSelectors<RootState>((state) => state.questions);

export const selectSortOrder = (state: RootState) => state.questions.sortOrder;
export const selectCurrentForm = (state: RootState) =>
  state.questions.currentForm;

export default questionsSlice.reducer;
