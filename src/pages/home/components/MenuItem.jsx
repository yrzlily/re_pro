import { Menu } from 'antd';

const { SubMenu } = Menu;

function MenuItemCom(props){
    const state = {
        singMenu: props.singMenu,
    }

    const toDetail = (path) => {
        props.props.history.push(path);
    }

    let singMenu = state.singMenu;
    return (
        <SubMenu key={singMenu.path} title={singMenu.label}>
            {
                singMenu.children.map((item, index) => {
                    if(item.children){
                        return (
                            <SubMenu key={item.path} title={item.label}>
                                <MenuItemCom props={props.props} menuList={item.children} />
                            </SubMenu>
                        )
                    }else{
                        return (
                            <Menu.Item onClick={toDetail.bind(this, item.path)} key={item.path} icon={item.icon}>
                                {item.label}
                            </Menu.Item>
                        )
                    }
                })
            }
        </SubMenu>
    );
}

export default MenuItemCom;