import React, {Suspense , lazy} from 'react'
import {BrowserRouter, Switch, Redirect} from 'react-router-dom';
import FrontendAuth from './FrontendAuth'
import { Spin } from 'antd';
import style from  './router.scss' 

const routerList = [
    {name:'home', path:'/home', exact:true, component:lazy(()=>import('@/pages/home/index')), children:[
        {name:'index', path:'/home/index', exact:true, component:lazy(()=>import('@/pages/home/main/index'))},
        {name:'index', path:'/home/page', exact:true, component:lazy(()=>import('@/pages/home/main/page'))},
    ]},
    {name:'login' , exact:false, path:'/login', component:lazy(()=>import('@/pages/login/index'))},
];
//遍历初始路由
function BasicRoute (){
    return (
        <Suspense fallback={<div className={style.loading}><Spin/></div>}>
            <BrowserRouter>
                <Switch>
                    {FrontendAuth(routerList)}
                    <Redirect from="/" to="/home/index" />
                </Switch>
            </BrowserRouter>
        </Suspense>
    );
}

export default BasicRoute