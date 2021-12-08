import React from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

const renderRoutes = (routerConfig) =>
    // 将需要用到的属性component,children解构出来,其他直接根据配置渲染到Route上
  
    (routerConfig || []).map(({ component: Component, children, exact, ...routeProps},index) =>
         // /* render() 是component={} 的替代写法,
        // * 这里使用render进行渲染是为了将 当前路由的子路由 children 绑定到 routes 属性,
        // * 这样子元素的props终究会出现 routes,也就是当前组建的子路由,再合适的位置进行`渲染`就可以了
        // */
        <Route {...routeProps}
            key={index}
            component={(props) => {
                if(exact && (!localStorage.getItem('token') || localStorage.getItem('token') === 'undefined')){
                    return <Redirect to="/login" />
                }else{

                    if(props.match.path === '/login' && (localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined')){
                        return <Redirect to="/" />
                    }

                    return <Component {...props} routes={children} />
                }
            }
        }/>
    )

export default renderRoutes;