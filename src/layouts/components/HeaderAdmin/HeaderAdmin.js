import classNames from 'classnames/bind';
import styles from './HeaderAdmin.module.scss';
import { Header } from 'antd/es/layout/layout';
import { Button, Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../../redux/user/userSlice';

const cx = classNames.bind(styles);

function HeaderAdmin(props) {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { currentUser } = useSelector(selectUser);

    const items = [
        {
            key: '1',
            label: <Link to="/">Quay lại trang chủ</Link>,
        },

        {
            key: '2',
            label: (
                <p
                    onClick={() => {
                        dispatch(logout(currentUser));
                        navigate('/');
                    }}
                >
                    Đăng xuất
                </p>
            ),
        },
    ];

    const {} = props;
    return (
        <div className={cx('wrapper')}>
            <Header
                style={{
                    padding: 0,
                    background: '#fff',
                }}
            >
                <div className={cx('header')}>
                    <div></div>
                    <div className={cx('right')}>
                        <span>{currentUser?.user?.fullname}</span>
                        <Dropdown
                            menu={{
                                items,
                            }}
                            placement="bottomRight"
                            arrow
                        >
                            <img
                                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.1182173601.1677507032&semt=ais"
                                alt="Avatar"
                            />
                        </Dropdown>
                    </div>
                </div>
            </Header>
        </div>
    );
}

export default HeaderAdmin;
