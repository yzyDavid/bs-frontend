import { Component, FormEvent, ReactNode } from 'react';
import * as React from 'react';
import { Icon, Form, Button, Input, message } from 'antd';
import DvaProps from '../types/DvaProps';
import { WrappedRegisterForm } from './RegisterForm';

export default class RegisterPageComponent extends Component<any> {
    render() {
        return (
            <div>
                <WrappedRegisterForm />
            </div>
        );
    }
}
