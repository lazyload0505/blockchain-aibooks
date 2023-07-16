"use client";

import NoSsr from '../common/components/nossr';

import {
    PageContainer,
    ProCard,
    ProConfigProvider,
    ProLayout,
    SettingDrawer,
} from '@ant-design/pro-components';

import {
    ChromeFilled,
    CrownFilled,
    SmileFilled,
    TabletFilled,
  } from '@ant-design/icons';

import {
    CaretDownFilled,
    DoubleRightOutlined,
    GithubFilled,
    InfoCircleFilled,
    LogoutOutlined,
    PlusCircleFilled,
    QuestionCircleFilled,
    SearchOutlined,
  } from '@ant-design/icons';

import {
    Button,
    ConfigProvider,
    Divider,
    Dropdown,
    Input,
    Popover,
    theme,
} from 'antd';
import React, { useState } from 'react';

const SearchInput = () => {
    const { token } = theme.useToken();
    return (
      <div
        key="SearchOutlined"
        aria-hidden
        style={{
          display: 'flex',
          alignItems: 'center',
          marginInlineEnd: 24,
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <Input
          style={{
            borderRadius: 4,
            marginInlineEnd: 12,
            backgroundColor: token.colorBgTextHover,
          }}
          prefix={
            <SearchOutlined
              style={{
                color: token.colorTextLightSolid,
              }}
            />
          }
          placeholder="搜索方案"
          bordered={false}
        />
        <PlusCircleFilled
          style={{
            color: token.colorPrimary,
            fontSize: 24,
          }}
        />
      </div>
    );
  };

export default function HomePage() {
    const [pathname, setPathname] = useState('/chat');
    return (
      <NoSsr>
        <div id="home-page" style={{ height: '100vh', overflow: 'auto' }}>
            <ProConfigProvider hashed={false}>
                <ConfigProvider
                    getTargetContainer={() => {
                        return document.getElementById('test-pro-layout') || document.body;
                    }}
                >
                    <ProLayout
                        siderMenuType="group"
                        menu={{
                          collapsedShowGroupTitle: true,
                        }}
                        avatarProps={{
                            src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                            size: 'small',
                            title: '七妮妮',
                            render: (props, dom) => {
                              return (
                                <Dropdown
                                  menu={{
                                    items: [
                                      {
                                        key: 'logout',
                                        icon: <LogoutOutlined />,
                                        label: '退出登录',
                                      },
                                    ],
                                  }}
                                >
                                  {dom}
                                </Dropdown>
                              );
                            },
                          }
                        }
                        route={{
                            path: '/',
                            routes: [
                                {
                                    path: '/chat/',
                                    name: '欢迎',
                                    icon: <SmileFilled />,
                                    component: './chat/index',
                                  },
                                  {
                                    path: '/admin',
                                    name: '管理页',
                                    icon: <CrownFilled />,
                                    access: 'canAdmin',
                                    component: './Admin',
                                    routes: [
                                      {
                                        path: '/admin/sub-page1',
                                        name: '一级页面',
                                        icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
                                        component: './Welcome',
                                      },
                                      {
                                        path: '/admin/sub-page2',
                                        name: '二级页面',
                                        icon: <CrownFilled />,
                                        component: './Welcome',
                                      },
                                      {
                                        path: '/admin/sub-page3',
                                        name: '三级页面',
                                        icon: <CrownFilled />,
                                        component: './Welcome',
                                      },
                                    ],
                                  },
                                  {
                                    path: 'https://ant.design',
                                    name: 'Ant Design 官网外链',
                                    icon: <ChromeFilled />,
                                  },
                            ]
                        }}
                        location={{
                            pathname,
                        }}
                        token={{
                        header: {
                            colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
                        },
                        }}
                        actionsRender={(props) => {
                            if (props.isMobile) return [];
                            if (typeof window === 'undefined') return [];
                            return [
                                props.layout !== 'side' && document.body.clientWidth > 1400 ? (
                                <SearchInput />
                                ) : undefined,
                                <InfoCircleFilled key="InfoCircleFilled" />,
                                <QuestionCircleFilled key="QuestionCircleFilled" />,
                                <GithubFilled key="GithubFilled" />,
                            ];
                        }}
                        menuFooterRender={(props) => {
                            if (props?.collapsed) return undefined;
                            return (
                              <div
                                style={{
                                  textAlign: 'center',
                                  paddingBlockStart: 12,
                                }}
                              >
                                <div>© 2021 Made with love</div>
                                <div>by Ant Design</div>
                              </div>
                            );
                          }}
                          onMenuHeaderClick={(e) => console.log(e)}
                          menuItemRender={(item, dom) => (
                            <div
                              onClick={() => {
                                setPathname(item.path || '/welcome');
                              }}
                            >
                              {dom}
                            </div>
                          )}
                    >

                    </ProLayout>
                </ConfigProvider>
            </ProConfigProvider>
        </div>
        </NoSsr>
    );

}