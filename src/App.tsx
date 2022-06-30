import React from "react";
import { Layout } from "./components/layout";
import { Card, Tooltip } from "./components/common";
import { Col, Row } from "antd";
import { QuestionFormContainer } from "./components/features/questionForm";
import { QuestionListContainer } from "./components/features/questionList";
import { QuestionTipConnected } from "./components/features/questionTip";

import "antd/dist/antd.min.css";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Layout>
        <Row gutter={16}>
          <Col span={24}>
            <Card>
              <QuestionTipConnected />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 9 }}>
            <Card
              title={
                <Tooltip
                  content={
                    "heare you can create new questions and their answers."
                  }
                >
                  {"Create a new question"}
                </Tooltip>
              }
            >
              <QuestionFormContainer mode="new" />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 15 }}>
            <Card
              title={
                <Tooltip
                  content={
                    "heare you can find the created questions and their answers."
                  }
                >
                  {"Created questions"}
                </Tooltip>
              }
            >
              <QuestionListContainer />
            </Card>
          </Col>
        </Row>
      </Layout>
    </div>
  );
}

export default App;
