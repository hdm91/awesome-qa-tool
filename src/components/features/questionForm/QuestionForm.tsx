import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Question } from "../../../types";

type QuestionFormProps = {
  initialValues?: Question;
  pending?: boolean;
  onFinish?: (values: QuestionFormValues) => void;
  submitButtonText?: string;
};

type QuestionFormValues = Question & {
  withDelay: boolean;
};

function QuestionForm(props: QuestionFormProps) {
  const { initialValues, onFinish, pending, submitButtonText } = props;
  return (
    <Form
      name="question"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      initialValues={initialValues}
    >
      <Form.Item
        label="Question"
        name="title"
        rules={[{ required: true, message: "Please input your Question!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Answer"
        name="answer"
        rules={[{ required: true, message: "Please input your answer!" }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="withDelay"
        valuePropName="checked"
        wrapperCol={{
          xs: { offset: 0, span: 24 },
          sm: { offset: 4, span: 16 },
        }}
      >
        <Checkbox>Delay</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          xs: { offset: 0, span: 24 },
          sm: { offset: 4, span: 16 },
        }}
      >
        <Button loading={pending} type="primary" htmlType="submit">
          {submitButtonText || "Create question"}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default QuestionForm;
