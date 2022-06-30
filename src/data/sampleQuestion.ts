import { Question } from "../types";
import { uid } from "../utils";

export const sampleQuestion: Question = {
  id: uid(),
  title: "How to add a Question?",
  answer: "Just use the form",
};

export const sampleQuestion2: Question = {
  id: uid(),
  title: "Can I add my own question?",
  answer: "Yes, of course",
};

export const sampleQuestion3: Question = {
  id: uid(),
  title: "How to update a Question?",
  answer: "Just use the edit button in each question",
};
