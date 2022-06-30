import { sampleQuestion3 } from "./../../data/sampleQuestion";
import { sampleQuestion, sampleQuestion2 } from "../../data/sampleQuestion";
import { SortOrder } from "../../types";
import questionsReducer, {
  questionAdd,
  questionUpdate,
  questionRemoveOne,
  questionRemoveAll,
  questionChangeSortOrder,
  QuestionsState,
} from "./questionsSlice";

const initialState: QuestionsState = {
  sortOrder: SortOrder.NONE,
  ids: [sampleQuestion.id, sampleQuestion2.id],
  entities: {
    [sampleQuestion.id]: { ...sampleQuestion },
    [sampleQuestion2.id]: { ...sampleQuestion2 },
  },
  currentForm: {
    status: "idle",
    id: null,
  },
};

describe("questions reducer", () => {
  it("should handle initial state", () => {
    expect(questionsReducer(undefined, { type: "unknown" })).toEqual({
      sortOrder: SortOrder.NONE,
      ids: [sampleQuestion.id],
      entities: { [sampleQuestion.id]: { ...sampleQuestion } },
      currentForm: {
        status: "idle",
        id: null,
      },
    });
  });

  it("should handle add", () => {
    const actual = questionsReducer(initialState, questionAdd(sampleQuestion3));
    expect(actual.ids).toContain(sampleQuestion3.id);
    expect(actual.entities[sampleQuestion3.id]).toBeTruthy();
    expect(actual.entities[sampleQuestion3.id]).toEqual(sampleQuestion3);
  });

  it("should handle update", () => {
    const changes = {
      title: "How to add a Question?(updated)",
      answer: "Just use the form(updated)",
    };

    const actual = questionsReducer(
      initialState,
      questionUpdate({
        id: sampleQuestion.id,
        changes,
      })
    );

    expect(actual.entities[sampleQuestion.id]).toMatchObject(changes);
  });

  it("should handle remove", () => {
    const actual = questionsReducer(
      initialState,
      questionRemoveOne(sampleQuestion2.id)
    );
    expect(actual.ids).not.toContain(sampleQuestion2.id);
    expect(actual.entities[sampleQuestion2.id]).toBeUndefined();
  });

  it("should handle remove all", () => {
    const actual = questionsReducer(initialState, questionRemoveAll());
    expect(actual.ids.length).toBe(0);
    expect(actual.entities).toEqual({});
  });

  it("should handle change sort order", () => {
    const actual = questionsReducer(
      initialState,
      questionChangeSortOrder(SortOrder.ASC)
    );
    expect(actual.sortOrder).toEqual(SortOrder.ASC);
  });
});
