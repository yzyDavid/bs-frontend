import * as React from 'react';
import { Component } from 'react';
import { Row, Col, Button, Table, Tabs } from 'antd';
import { Link } from 'dva/router';
import { ManagementState } from '../types/entities';

const { TabPane } = Tabs;

export default class ManagementPageComponent extends Component<{ dispatch: any } & ManagementState> {
    componentDidMount() {
        this.props.dispatch({ type: 'management/getWordbooks' });
    }

    render() {
        const wordbookColumns = [{
            key: 'id',
            title: '单词书名称',
            dataIndex: 'wordbookName'
        }];

        const myWordColumns = [{
            key: 'word',
            title: '单词',
            dataIndex: 'word'
        }];

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
                    <Col span={10}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="我的单词" key="1">
                                <Table dataSource={this.props.myWords} columns={myWordColumns} rowKey='word' >
                                </Table>
                            </TabPane>
                            <TabPane tab="我的词书" key="2">
                                <Table dataSource={this.props.wordbooks} columns={wordbookColumns} rowKey='id' >
                                </Table>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        );
    }
};
