import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

const cx = classNames.bind(styles);

function Sidebar({ sideBar }) {
    return (
        <div className={cx('wrapper')}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                // onBreakpoint={(broken) => {
                //     console.log(broken);
                // }}
                // onCollapse={(collapsed, type) => {
                //     console.log(collapsed, type);
                // }}
                style={{ height: '100%' }}
            >
                <p className={cx('logo')}>Blissful Bells</p>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['4']}
                    items={sideBar?.map((item, index) => ({
                        key: index,
                        label: <Link to={item?.path}>{item?.title}</Link>,
                    }))}
                />
            </Sider>
        </div>
    );
}

export default Sidebar;
