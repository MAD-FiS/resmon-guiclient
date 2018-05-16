import React from 'react';
import { Layout, Menu, LocaleProvider } from 'antd';
import { Link } from 'react-router-dom';
import pl_PL from 'antd/lib/locale-provider/pl_PL';
import 'moment/locale/pl';
import './layout.less';

const { Sider, Content, Footer } = Layout;

const AppLayout = ({ children, location, auth, signOut }) => (
    <LocaleProvider locale={pl_PL}>
        <Layout className="app-root">
            <Sider breakpoint="lg" collapsedWidth="0" className="app-side">
                <Link to="/" className="title">Res-Mon</Link>
                <Menu
                    theme="dark"
                    mode="inline"
                    className="menu"
                    selectedKeys={[ location.pathname ]}
                    onClick={(item) => item.key === 'sign-out' && signOut()}
                >
                    {auth && <Menu.Item key="/live">
                        <Link to="/live">Pomiary na żywo</Link>
                    </Menu.Item>}
                    {auth && <Menu.Item key="/historical">
                        <Link to="/historical">Pomiary historyczne</Link>
                    </Menu.Item>}
                    {auth && <Menu.Item key="/metrics">
                        <Link to="/metrics">Hosty i Metryki</Link>
                    </Menu.Item>}
                    {auth && <Menu.Item key="/monitors">
                        <Link to="/monitors">Monitory</Link>
                    </Menu.Item>}
                    {!auth && <Menu.Item key="/sign-in">
                        <Link to="/sign-in">Logowanie</Link>
                    </Menu.Item>}
                    {!auth && <Menu.Item key="/sign-up">
                        <Link to="/sign-up">Rejestracja</Link>
                    </Menu.Item>}
                    {auth && <Menu.Item key="sign-out">Wyloguj się</Menu.Item>}
                </Menu>
            </Sider>
            <Layout className="app-content-wrapper">
                <Content className="app-content">
                    {children}
                </Content>
                <Footer className="app-footer">
                    &copy; <a href="https://github.com/MAD-FiS">MAD-Team</a> (
                    <a href="https://github.com/drzazga888">drzazga888</a>&nbsp;
                    / <a href="https://github.com/Grzegorz-00">Grzegorz-00</a>&nbsp;
                    / <a href="https://github.com/GrzegorzR">GrzegorzR</a>&nbsp;
                    / <a href="https://github.com/IanRacon">IanRacon</a>&nbsp;
                    / <a href="https://github.com/kawues">kawues</a>&nbsp;
                    / <a href="https://github.com/lukasz22">lukasz22</a>&nbsp;
                    / <a href="https://github.com/tbajorek">tbajorek</a>&nbsp;
                    / <a href="https://github.com/tchw">tchw</a>&nbsp;
                    / <a href="https://github.com/XtorukmaktoX">XtorukmaktoX</a>
                    ) 2018.
                </Footer>
            </Layout>
        </Layout>
    </LocaleProvider>
);

export default AppLayout;
