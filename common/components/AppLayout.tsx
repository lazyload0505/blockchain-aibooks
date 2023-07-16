import React, { ReactNode}  from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Sider, Header, Content, Footer } = Layout;

export function AppLayout(props: {children: ReactNode}) {

    return (<Layout style={{height: '100vh'}}>
        <Header>
            <h1>abc</h1>
        </Header>
        {props.children}
        <Footer>
            <div>footer</div>
        </Footer>
    </Layout>);
}