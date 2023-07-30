import styles from './AdminPage.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import ThemeButton from '../../components/ThemeButton/ThemeButton';

const cx = classNames.bind(styles);

const AdminPage = () => {
    return <div className={cx('wrapper')}></div>;
};

export default AdminPage;
