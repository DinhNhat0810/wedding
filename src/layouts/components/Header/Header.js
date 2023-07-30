import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'antd';
// import images from '../../../assets/images';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeInput from '../../../components/ThemeInput/ThemeInput';
import ThemeButton from '../../../components/ThemeButton/ThemeButton';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { logout, selectUser } from '../../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { sideBarAdmin, sideBarManager } from '../../../utils/constant';
import { searchService } from '../../../services/services';

const menus = [
    {
        title: 'Trang chủ',
        path: '/',
    },
    {
        title: 'Giới thiệu',
        path: '/gioi-thieu',
    },
    {
        title: 'Dịch vụ',
        path: '/dich-vu',
    },
    {
        title: 'Gói dịch vụ',
        path: '/goi-dich-vu',
    },
    {
        title: 'Liên hệ',
        path: '/lien-he',
    },
];

const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();
    const [inputSearch, setInputSearch] = useState('');
    const dispatch = useDispatch();

    const { currentUser } = useSelector(selectUser);

    // const getPath = useMemo(() => {
    //     const { user } = currentUser;

    //     if (user?.authorities?.includes('ROLE_ADMIN')) {
    //     }
    // }, []);

    const accountOption = [
        {
            label: 'Đăng nhập',
            path: '/dang-nhap',
            hidden: currentUser ? true : false,
        },
        {
            label: 'Đăng ký',
            path: '/dang-ky',
            hidden: currentUser ? true : false,
        },
        {
            label: 'Thông tin tài khoản',
            path: '/tai-khoan',
            hidden: currentUser ? false : true,
        },
        {
            label: 'Dịch vụ của cửa hàng',
            path: '/cua-hang/dich-vu',
            hidden: currentUser?.user?.authorities?.find((item) => ['ROLE_STORE_OWNER'].includes(item.name))
                ? false
                : true,
        },
        {
            label: 'Trang quản trị',
            path: currentUser?.user?.authorities?.find((item) => ['ROLE_ADMIN'].includes(item.name))
                ? sideBarAdmin[0]?.path
                : sideBarManager[0]?.path,
            hidden: currentUser?.user?.authorities?.find((item) => ['ROLE_ADMIN', 'ROLE_MANAGER'].includes(item.name))
                ? false
                : true,
        },
        {
            label: 'Đăng xuất',
            handleClick: () => {
                dispatch(logout(currentUser));
                navigate('/dang-nhap');
            },
            hidden: currentUser ? false : true,
        },
    ];

    useEffect(() => {}, [currentUser]);

    return (
        <div className={cx('wrapper')}>
            {/* <div className={cx('topbar')}>
                <Row className="container">
                    <Col lg={24} xl={24}>
                        <a href="tel:dsada">
                            <FontAwesomeIcon style={{ paddingRight: '5px' }} icon={faPhone} />
                            0988674064
                        </a>
                        <span>
                            <FontAwesomeIcon style={{ paddingRight: '5px' }} icon={faLocationDot} />
                            Số 01, ngõ 167, Thanh Nhàn, Hai Bà Trưng, Hà Nội
                        </span>
                    </Col>
                </Row>
            </div> */}
            <div className={cx('header')}>
                <Row className={cx('container', 'inner')}>
                    <Col lg={3} xl={3}>
                        <Link to="/" className={cx('logo')}>
                            Blissful Bells
                        </Link>
                    </Col>
                    <Col lg={15} xl={15}>
                        <ul className={cx('menu')}>
                            {menus.map((e, index) => {
                                return (
                                    <li className={cx('item')} key={index}>
                                        <Link to={e.path}>{e.title}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </Col>
                    <Col lg={6} xl={6}>
                        <div className={cx('right')}>
                            <div className={cx('search')}>
                                <div className={cx('searchbox_input')}>
                                    <ThemeInput
                                        placeholder="Tìm kiếm..."
                                        stylesInput={{
                                            borderRadius: 0,
                                            padding: '0.6rem ',
                                            borderColor: '#fff',
                                            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                        }}
                                        stylesItem={{ marginBottom: 0 }}
                                        onChange={(e) => {
                                            setInputSearch(e.target.value);
                                        }}
                                    />
                                </div>
                                <ThemeButton
                                    icon={<SearchOutlined />}
                                    styles={{
                                        borderRadius: 0,
                                        backgroundColor: '#Fff',
                                        color: '#000',
                                        border: 'none',
                                        height: '3.6rem',
                                        width: '3.6rem',
                                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                    }}
                                    onClick={() => {
                                        navigate(
                                            {
                                                pathname: '/tim-kiem',
                                            },
                                            { state: { searchString: inputSearch } },
                                        );
                                    }}
                                />
                            </div>
                            <div className={cx('account')}>
                                {currentUser ? (
                                    <img
                                        src={
                                            currentUser?.user?.avater
                                                ? currentUser?.user?.avatar
                                                : 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.1182173601.1677507032&semt=ais'
                                        }
                                        alt="Avatar"
                                    />
                                ) : (
                                    <FontAwesomeIcon size="lg" icon={faUser} />
                                )}

                                <ul className={cx('account_menu')}>
                                    {accountOption?.map((e, index) => {
                                        return (
                                            <div key={index}>
                                                {!e?.hidden && (
                                                    <li className={cx('item')}>
                                                        {e.path ? (
                                                            <Link to={e.path}>{e.label}</Link>
                                                        ) : (
                                                            <div onClick={e?.handleClick}>{e.label}</div>
                                                        )}
                                                    </li>
                                                )}
                                            </div>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Header;
