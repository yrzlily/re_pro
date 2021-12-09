import React, {Component} from 'react'
import { Layout, Menu, Dropdown, message } from 'antd';
import FrontendAuth from '@/router/FrontendAuth'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DownOutlined,
} from '@ant-design/icons';
import './index.scss'
const { Header, Sider, Content } = Layout;

class Index extends Component{
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    toDetail = (path) => {
        this.props.history.push(path)
    }

    logout = () => {
        localStorage.removeItem('token');
        message.success('退出成功');
        this.props.history.push('/login');
    }

    render(){
        const menu = (
            <Menu>
                <Menu.Item>
                    <a onClick={this.logout} target="_blank" >
                        退出登录
                    </a>
                </Menu.Item>
            </Menu>
            );
        return(
            <Layout id="main">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" onClick={this.toDetail.bind(this, '/home/index')} icon={<UserOutlined />}>
                    Index
                    </Menu.Item>
                    <Menu.Item key="2" onClick={this.toDetail.bind(this, '/home/page')} icon={<VideoCameraOutlined />}>
                    Page
                    </Menu.Item>
                </Menu>
                </Sider>
                <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.toggle,
                    })}
                    <div className='rightBar'>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        {localStorage.getItem('token')} <DownOutlined />
                        </a>
                    </Dropdown>
                    </div>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    overflow: 'auto'
                    }}
                >
                    {FrontendAuth(this.props.routes || [])}
                </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Index