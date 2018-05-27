import * as React from 'react';
import { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { Link } from 'dva/router';

export default class StudyPageComponent extends Component<any> {
    componentDidMount() {
        this.props.dispatch({ type: 'study/getTodayWords' });
        this.props.dispatch({ type: 'study/switchWord' });
    }

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
                <Row type="flex" justify="center" style={{ margin: '12px', height: '100px' }}>
                    <div style={{ fontSize: '36px', color: 'Navy' }}>{this.props.word}</div>
                </Row>
                <Row type="flex" justify="center" style={{ margin: '12px', minHeight: '400px' }}>
                    <div style={{ fontSize: '18px', maxWidth: '450px' }}>{this.props.meaning}</div>
                </Row>
                <Row type="flex" justify="center" style={{ margin: '12px' }}>
                    <Button size="large" style={{ width: '300px' }} icon="frown">没记住</Button>
                </Row>
                <Row type="flex" justify="center" style={{ margin: '12px' }}>
                    <Button size="large" type="primary" style={{ width: '300px' }} icon="smile">记住了</Button>
                </Row>
            </div>
        );
    }
};
