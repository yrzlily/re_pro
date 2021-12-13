import { Menu } from 'antd';

const { SubMenu } = Menu;

function MenuItemCom(menu, props){
    const state = {
        singMenu: menu,
    }

    const toDetail = (path) => {
        props.history.push(path);
    }

    let singMenu = state.singMenu;
    //递归遍历菜单栏
    return (
        <SubMenu key={singMenu.path} title={singMenu.label}>
            {
                singMenu.children.map((item) => {
                    if(item.children){
                        return (
                            MenuItemCom(item,props)
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