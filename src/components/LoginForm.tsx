import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Icon, Form, Button, Input, message} from 'antd';
import DvaProps from '../types/DvaProps';

const FormItem = Form.Item;

interface FormProps extends DvaProps {
    form: any;
}

export class LoginFormData {
    email: string;
    password: string;
}

export class LoginForm extends Component<FormProps, LoginFormData> {
    componentDidMount() {
    }

    handleSubmit = (e: FormEvent<{}>) => {
        e.preventDefault();
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, values: LoginFormData) => {
            if (err) {
                message.error('信息填写不合法');
                return;
            }
            this.props.dispatch({type:'login/login', payload: values});
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem label="邮箱" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('email', {
                            rules: [
                                {required: true, message: '请输入邮箱'}
                            ]
                        })(
                            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}/>
                        )
                    }
                </FormItem>
                <FormItem label="密码" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('password', {
                            rules: [
                                {required: true, message: '请输入密码'}
                            ]
                        })(
                            <Input type="password" prefix={<Icon type="unlock" style={{fontSize: 13}}/>}/>
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout}>
                    <Button icon="copy" type="primary" htmlType="submit">登录</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedLoginForm: any = Form.create({})(LoginForm);

export {WrappedLoginForm};
