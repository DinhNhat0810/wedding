import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ProductItem.module.scss';
import classNames from 'classnames/bind';
import { faCartShopping, faEye } from '@fortawesome/free-solid-svg-icons';
import { noImage } from '../../utils/constant';

const cx = classNames.bind(styles);

const ProductItem = (props) => {
    const { item, positionAction, ...colProps } = props;
    const navigate = useNavigate();

    return (
        <Col xl={6} lg={6} className={cx('product')} {...colProps}>
            <div>
                <Link to={`/dich-vu/${item?.id}`}>
                    <img src={item?.linkImageBanner || noImage} alt={item?.name} />
                </Link>
                <div className={cx('action')} style={{ top: positionAction && positionAction }}>
                    <FontAwesomeIcon
                        style={{ paddingRight: '5px' }}
                        icon={faEye}
                        size="xl"
                        className={cx('action_icon')}
                        onClick={() => {
                            navigate(`/dich-vu/${item?.id}`);
                        }}
                    />
                    <FontAwesomeIcon
                        size="xl"
                        style={{ paddingRight: '5px' }}
                        icon={faCartShopping}
                        className={cx('action_icon')}
                    />
                </div>
                <div className={cx('content')}>
                    <Link to={`/dich-vu/${item?.id}`} state={item?.name} className={cx('content_title')}>
                        {item?.name}
                    </Link>
                    <p className={cx('content_price')}>
                        {item?.price?.toLocaleString('vi', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </p>
                </div>
            </div>
        </Col>
    );
};

export default ProductItem;
