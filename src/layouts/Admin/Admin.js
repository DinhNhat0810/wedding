import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import { Helmet } from 'react-helmet-async';
import { Layout } from 'antd';
import Sidebar from '../components/Sidebar/Sidebar';
import HeaderAdmin from '../components/HeaderAdmin/HeaderAdmin';
import { Toaster } from 'react-hot-toast';
import { sideBarAdmin, sideBarManager } from '../../utils/constant';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/user/userSlice';
import { useMemo } from 'react';

const { Content } = Layout;

const cx = classNames.bind(styles);

function Admin({ children }) {
    const { currentUser } = useSelector(selectUser);

    // eslint-disable-next-line react-hooks/exhaustive-deps

    const checkRoles = (roles) => {
        let result;

        const newRoles = roles?.map((role) => role?.name);

        if (newRoles?.includes('ROLE_ADMIN')) {
            result = sideBarAdmin;
        }

        if (newRoles?.includes('ROLE_MANAGER')) {
            result = sideBarManager;
        }

        return result;
    };

    const sideBar = useMemo(() => checkRoles(currentUser?.user?.authorities), [currentUser]);

    return (
        <div className={cx('wrapper')}>
            <Toaster position="top-right" reverseOrder={false} containerStyle={{ zIndex: '10000' }} />
            <Helmet>
                <title>Quản trị</title>
            </Helmet>
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar sideBar={sideBar} />
                <Layout>
                    <HeaderAdmin />
                    <Content
                        style={{
                            margin: '24px 16px 0',
                        }}
                    >
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: '#fff',
                            }}
                        >
                            <div className={cx('children')}>{children}</div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

Admin.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Admin;
