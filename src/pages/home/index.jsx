import React, {Component} from 'react'
import request from '@/utils/request'
import { Layout, Menu, Dropdown, message } from 'antd';
import FrontendAuth from '@/router/FrontendAuth'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DownOutlined,
} from '@ant-design/icons';
import MenuItemCom from './components/MenuItemCom'
import './index.scss'
import {getParentTag} from '@/utils/base'

const { Header, Sider, Content } = Layout;

class Index extends Component{

    constructor(props){
        super()
        this.state = {
            collapsed: false,
            menuList: [
                {label: '图表管理' ,path: '/home', icon: <UserOutlined/>, children:[
                    {label: '数据图' ,path: '/homes/', icon: <UserOutlined/>, children:[
                        {label: '柱状图' ,path: '/home/index', icon: <UserOutlined/>},
                        {label: '检测' ,path: '/home/test', icon: <UserOutlined/>}
                    ]},
                ] },
                {label: '表格管理' ,path: '/page', icon: <VideoCameraOutlined/>, children:[
                    {label: '数据表格' ,path: '/home/page', icon: <VideoCameraOutlined/>},
                ] },
            ],
            nowPath: props.location.pathname
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    toDetail = (path) => {
        console.log(this.state.nowPath);
        this.props.history.push(path)
    }

    logout = () => {
        localStorage.removeItem('token');
        message.success('退出成功');
        this.props.history.push('/login');
    }

    showMessage = async () => {
        // let res = await request.post('http://127.0.0.1');
        // console.log(res)
    }
    
    componentDidMount(){
        this.showMessage();
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
                {/* 左侧菜单栏 */}
                <Menu theme="dark" mode="inline" defaultOpenKeys={getParentTag(this.state.menuList, this.state.nowPath)} defaultSelectedKeys={[this.state.nowPath]}>
                    {
                        this.state.menuList.map((res)=>{
                            if(res.children){
                                return MenuItemCom(res, this.props)
                            }else{
                                return(
                                    <Menu.Item key={res.path} onClick={this.toDetail.bind(this, res.path)} icon={res.icon}>
                                        {res.label}
                                    </Menu.Item>
                                )
                            }
                        })
                    }
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