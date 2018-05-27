import { Component, FormEvent, ReactNode } from 'react';
import * as React from 'react';
import { Icon, Form, Button, Input, message } from 'antd';
import DvaProps from '../types/DvaProps';
import { WrappedRegisterForm } from './RegisterForm';
import { Row, Col } from 'antd';
import { Link } from 'dva/router';

export default class RegisterPageComponent extends Component<any> {
    render() {
        return (
            <div>
                <Row type="flex" justify="center" style={{ margin: '12px' }}>
                    <Col span={1}>
                        <Link to="/">
                            <Button icon="circle-o-left" />
                        </Link>
                    </Col>
                    <Col span={8}>
                    </Col>
                    <Col span={1}>
                    </Col>
                </Row>
                <WrappedRegisterForm dispatch={this.props.dispatch} />
            </div>
        );
    }
}
