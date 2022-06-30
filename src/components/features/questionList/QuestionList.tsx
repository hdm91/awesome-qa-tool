import React, { SyntheticEvent, useCallback } from "react";
import { Button, List, Popconfirm, Space } from "antd";
import { Question, SortOrder } from "../../../types";
import { SortButton } from "../../common";
import { DeleteOutlined } from "@ant-design/icons";
import QuestionListItem from "../questionListItem/QuestionListItem";
import { isFunction } from "../../../utils";

type QuestionListProps = {
  questions: Question[];
  onCommand?: (key: string, args?: any) => void;
  count: number;
};

function QuestionList(props: QuestionListProps) {
  const { questions, onCommand, count } = props;
  const toolbarButtonDisabled = count === 0;

  const handleSortChange = useCallback(
    (sortOrder: SortOrder) => {
      if (isFunction(onCommand)) {
        onCommand("sort", { sortOrder });
      }
    },
    [onCommand]
  );

  const handleCommand = useCallback(
    (e: SyntheticEvent) => {
      const id = e.currentTarget.getAttribute("data-id");
      const key = e.currentTarget.getAttribute("data-key") as string;

      if (isFunction(onCommand)) {
        onCommand(key, { id });
      }
    },
    [onCommand]
  );

  const handleRemoveAll = useCallback(() => {
    if (isFunction(onCommand)) {
      onCommand("removeAll");
    }
  }, [onCommand]);

  return (
    <div className="">
      <List
        style={{ minHeight: 245 }}
        locale={{ emptyText: "No questions yet" }}
        header={
          <Space>
            <SortButton
              disabled={toolbarButtonDisabled}
              onChange={handleSortChange}
            />
            <Popconfirm
              title="Are you sure to delete all questions?"
              onConfirm={handleRemoveAll}
              okText="Yes"
              cancelText="No"
              disabled={toolbarButtonDisabled}
            >
              <Button
                data-key="removeAll"
                disabled={toolbarButtonDisabled}
                danger
              >
                Remove questions <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Space>
        }
        dataSource={questions}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                onClick={handleCommand}
                size="small"
                type={"link"}
                data-id={item.id}
                data-key="edit"
              >
                edit
              </Button>,
              <Button
                onClick={handleCommand}
                size="small"
                type={"link"}
                data-id={item.id}
                data-key="remove"
              >
                delete
              </Button>,
            ]}
            style={{ paddingLeft: 0 }}
            key={item.id}
          >
            <QuestionListItem question={item.title} answer={item.answer} />
          </List.Item>
        )}
      />
    </div>
  );
}

export default QuestionList;
