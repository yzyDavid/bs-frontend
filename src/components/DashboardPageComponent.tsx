import * as React from 'react';
import { Component } from 'react';
import { Layout, Row, Col, Button } from 'antd';

export default class DashboardPageComponent extends Component<any> {
    render() {
        return (
            <div style={{ margin: 'auto'}}>
                <Row type="flex" justify="center" style={{margin: '12px'}}>
                    <Col>
                        <div><span style={{fontSize: '72px', color: 'Navy'}}>{this.props.recordDays}</span>天</div>
                        <div style={{textAlign: 'center'}}>打卡天数</div>
                    </Col>
                </Row>
                <Row type="flex" justify="center" style={{margin: '12px'}}>
                    <Col style={{margin: '0 30px'}}>
                        <div><span style={{fontSize: '48px', color: 'Navy'}}>{this.props.todayToStudy}</span>个</div>
                        <div style={{textAlign: 'center'}}>今日要学</div>
                    </Col>
                    <Col style={{margin: '0 30px'}}>
                        <div><span style={{fontSize: '48px', color: 'Navy'}}>{this.props.totalStudied}</span>个</div>
                        <div style={{textAlign: 'center'}}>总共已学</div>
                    </Col>
                </Row>
                <Row>
                    <div style={{ textAlign: 'center' }}>学习进度</div>
                </Row>
                <Row type="flex" justify="center" style={{margin: '12px'}}>
                    <Button size="large" style={{width: '300px'}}>管理词库</Button>
                </Row>
                <Row type="flex" justify="center" style={{margin: '12px'}}>
                    <Button size="large" type="primary" style={{width: '300px'}}>开始学习</Button>
                </Row>
            </div>
        );
    }
};
