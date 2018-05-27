import * as React from 'react';
import { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { Link } from 'dva/router';

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
                <div>ManagementPageComponent</div>
            </div>
        );
    }
};
