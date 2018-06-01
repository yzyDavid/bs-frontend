import * as React from 'react';
import { Component } from 'react';
import { Row, Col, Button, Modal } from 'antd';
import { Link, Redirect } from 'dva/router';
import { StudyState } from '../types/entities';

export default class StudyPageComponent extends Component<{dispatch: any} & StudyState> {
    componentDidMount() {
        this.props.dispatch({ type: 'study/getTodayWords' });
        this.props.dispatch({ type: 'study/switchWord' });
    }

    onOk() {
        this.props.dispatch({ type: 'study/toggleModal' });
        this.props.dispatch({ type: 'study/getTodayWords' });
    }

    onCancel() {
        this.props.dispatch({ type: 'study/toggleModal' });
        this.props.dispatch({ type: 'dashboard/jumpToMe' });
    }

    renderModal() {
        return (
            <Modal title="Hooooray!" okText="再来一批" cancelText="看看进度"
            visible={this.props.showModal} onOk={this.onOk.bind(this)} onCancel={this.onCancel.bind(this)} >
                <p>
                    本批次学习任务已完成，请选择继续学习下一批单词或者去查看我的学习进度。
                </p>
            </Modal>
        );
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
                        <Button icon="book" onClick={() => this.props.dispatch({ type: 'study/printState' })} >
                            {this.props.showMeaning ? '隐藏释义' : '显示释义'}
                        </Button>
                    </Col>
                </Row>
                <Row type="flex" justify="center" style={{ margin: '12px', height: '100px' }}>
                    <div style={{ fontSize: '36px', color: 'Navy' }}>{this.props.word}</div>
                </Row>
                <Row type="flex" justify="center" style={{ margin: '12px', minHeight: '400px' }}>
                    <div style={{ fontSize: '18px', maxWidth: '450px' }}>{this.props.showMeaning ? this.props.meaning : ''}</div>
                </Row>
                <Row type="flex" justify="center" style={{ margin: '12px' }}>
                    <Button size="large" style={{ width: '300px' }} icon="frown" onClick={() => this.props.dispatch({ type: 'study/forget' })}>
                        没记住
                    </Button>
                </Row>
                <Row type="flex" justify="center" style={{ margin: '12px' }}>
                    <Button size="large" type="primary" style={{ width: '300px' }} icon="smile" onClick={() => this.props.dispatch({ type: 'study/recall' })}>
                        记住了
                    </Button>
                </Row>
                {this.renderModal()}
            </div>
        );
    }
};
