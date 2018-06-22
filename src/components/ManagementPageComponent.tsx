import * as React from 'react';
import { Component } from 'react';
import { Row, Col, Button, Table, Tabs } from 'antd';
import { Link } from 'dva/router';
import { ManagementState } from '../types/entities';

const { TabPane } = Tabs;

export default class ManagementPageComponent extends Component<{ dispatch: any } & ManagementState> {
    componentDidMount() {
        this.props.dispatch({ type: 'management/setLoading' });
        this.props.dispatch({ type: 'management/getWordbooks' });
        this.props.dispatch({ type: 'management/getWords' });
        this.props.dispatch({ type: 'management/getCustomWords' });
    }

    render() {
        const wordbookColumns = [{
            key: 'id',
            title: '单词书名称',
            dataIndex: 'wordbookName'
        }, {
            key: 'wordCount',
            title: '单词数量',
            dataIndex: 'wordCount'
        }, {
            key: 'ops',
            title: '操作',
            render: (text, record) => (
                <span>
                    <a href='javascript:void(0);' onClick={() => {
                        const { wordbookName } = record;
                        this.props.dispatch({ type: 'management/addWordbookToStudy', payload: { wordbook: wordbookName } });
                    }} >
                        加入学习
                    </a>
                    <span className='ant-divider' />
                    <a href='javascript:void(0);' onClick={() => {}} >全部移除</a>
                </span>
            )
        }];

        const myWordColumns = [{
            key: 'word',
            title: '单词',
            dataIndex: 'word'
        }];

        const customWordColumns = [{
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
                            <TabPane tab="我学习的单词" key="1">
                                <Table dataSource={this.props.myWords} columns={myWordColumns} rowKey='word' loading={this.props.loading} >
                                </Table>
                            </TabPane>
                            <TabPane tab="我的词书" key="2">
                                <Table dataSource={this.props.wordbooks} columns={wordbookColumns} rowKey='id' >
                                </Table>
                            </TabPane>
                            <TabPane tab="我的自定义单词" key="3">
                                <div style={{padding: '12px'}} >
                                    <Button type='primary' >添加单词</Button>
                                </div>
                                <Table dataSource={this.props.customWords} columns={customWordColumns} rowKey='word' >
                                </Table>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        );
    }
};
