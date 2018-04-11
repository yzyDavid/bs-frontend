import { Component } from 'react';
import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import DvaProps from '../types/DvaProps';

const { Header, Footer } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export class PublicHeader extends Component {
    render() {
        return (
            <Header>
                <h1 style={{ color: 'white' }}>Vocabup</h1>
            </Header>
        );
    }
}

export class PublicFooter extends Component {
    render() {
        return (
            <Footer>
                <div style={{ textAlign: 'center' }}>&copy;2018 Zhenyun Yu</div>
            </Footer>
        );
    }
}
