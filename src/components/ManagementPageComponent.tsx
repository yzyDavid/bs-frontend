import * as React from 'react';
import { Component } from 'react';
import { Row, Col, Button, Table, Tabs } from 'antd';
import { Link } from 'dva/router';

const { TabPane } = Tabs;

export default class ManagementPageComponent extends Component<any> {
    render() {
        return (
            <div>
                <Row type="flex" justify="center" style={{ margin: '12px' }}>
                    <Col span={1}>
                        <Link to="/dashboard">
                            <Button icon="circle-o-left" />
                        </Link>
                    </Col>
                    <Col span={8}>
                    </Col>
                    <Col span={1}>
                    </Col>
                </Row>
                <Row type="flex" justify="center" style={{ margin: '12px' }}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="我的单词" key="1">
                            <Table>
                            </Table>
                        </TabPane>
                        <TabPane tab="我的词书" key="2">
                            <Table>
                            </Table>
                        </TabPane>
                    </Tabs>
                </Row>
                <div>ManagementPageComponent</div>
            </div>
        );
    }
};
