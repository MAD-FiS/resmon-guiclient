import React from 'react';
import { Layout, Menu, LocaleProvider } from 'antd';
import { Link } from 'react-router-dom';
import pl_PL from 'antd/lib/locale-provider/pl_PL';
import 'moment/locale/pl';
import './layout.less';
import { LIVE_ROUTE, HISTORICAL_ROUTE, MONITORS_ROUTE, HOSTS_ROUTE,
    LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../routes';

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
                    {auth && <Menu.Item key={LIVE_ROUTE}>
                        <Link to={LIVE_ROUTE}>Pomiary na żywo</Link>
                    </Menu.Item>}
                    {auth && <Menu.Item key={HISTORICAL_ROUTE}>
                        <Link to={HISTORICAL_ROUTE}>Pomiary historyczne</Link>
                    </Menu.Item>}
                    {auth && <Menu.Item key={HOSTS_ROUTE}>
                        <Link to={HOSTS_ROUTE}>Hosty i Metryki</Link>
                    </Menu.Item>}
                    {auth && <Menu.Item key={MONITORS_ROUTE}>
                        <Link to={MONITORS_ROUTE}>Monitory</Link>
                    </Menu.Item>}
                    {!auth && <Menu.Item key={LOGIN_ROUTE}>
                        <Link to={LOGIN_ROUTE}>Logowanie</Link>
                    </Menu.Item>}
                    {!auth && <Menu.Item key={REGISTRATION_ROUTE}>
                        <Link to={REGISTRATION_ROUTE}>Rejestracja</Link>
                    </Menu.Item>}
                    {auth && <Menu.Item key="sign-out">Wyloguj się</Menu.Item>}
                </Menu>
            </Sider>
            <Layout className="app-content-wrapper">
                <Content className="app-content">
                    {React.cloneElement(children, { location })}
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
