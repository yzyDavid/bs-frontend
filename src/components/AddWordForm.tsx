import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Icon, Form, Button, Input, message} from 'antd';
import DvaProps from '../types/DvaProps';

const FormItem = Form.Item;

interface FormProps extends DvaProps {
    form: any;
}

export class AddWordFormData {
    word: string;
    maening: string;
}

export class AddWordForm extends Component<FormProps, AddWordFormData> {
    componentDidMount() {
    }

    handleSubmit = (e: FormEvent<{}>) => {
        e.preventDefault();
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, values: AddWordFormData) => {
            if (err) {
                message.error('信息填写不合法');
                return;
            }
            this.props.dispatch({ type: 'management/addWordToCustomWordbook', payload: values });
            this.props.dispatch({ type: 'management/toggleAddWordDialog' });
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
            <Form style={{ margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={this.handleSubmit}>
                <FormItem style={{ width: '600px' }} label="单词" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('word', {
                            rules: [
                                {required: true, message: '请输入单词'}
                            ]
                        })(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem style={{ width: '600px' }} label="释义" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('meaning', {
                            rules: [
                                {required: true, message: '请输入释义'}
                            ]
                        })(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout} style={{ }}>
                    <Button style={{ }} icon="copy" type="primary" htmlType="submit">添加</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedAddWordForm: any = Form.create({})(AddWordForm);

export {WrappedAddWordForm};
