import { Breadcrumb, Carousel, Col, Image, Row } from 'antd';
import styles from './DetailCombo.module.scss';
import classNames from 'classnames/bind';
import useBreadCrumb from '../../hooks/useBreadCrumb';
import { breadcrumbNameMap, noImage } from '../../utils/constant';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ThemeButton from '../../components/ThemeButton/ThemeButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import ProductItem from '../../components/ProductItem/ProductItem';
import Slogan from '../../components/Slogan/Slogan';
import { getServiceById } from '../../services/services';
import { convertToVnd, isEmptyArray } from '../../utils/common';
import { getComboByComboId } from '../../services/comboServices';

const cx = classNames.bind(styles);

const DetailCombo = () => {
    const [dataDetail, setDataDetail] = useState();
    const location = useLocation();
    const pathSnippets = decodeURIComponent(location.pathname);
    const nameService = pathSnippets?.split('/');
    // breadcrumbNameMap[location.pathname] = dataDetail?.name;
    const breadcrumbItems = useBreadCrumb(breadcrumbNameMap);

    const getService = async () => {
        const res = await getComboByComboId(nameService[nameService?.length - 1]);

        if (res) {
            setDataDetail(res);
        }
    };

    useEffect(() => {
        getService();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className="container">
                <Breadcrumb
                    separator=">"
                    style={{ margin: '1rem 0 6rem 0', paddingBottom: '1rem', borderBottom: '0.1rem solid #ccc' }}
                    items={breadcrumbItems}
                />

                <h2>Gói dịch vụ</h2>

                <div className={cx('list-service')}>
                    <h3>Trọn bộ dịch vụ bao gồm</h3>

                    {!isEmptyArray(dataDetail) &&
                        dataDetail?.map((item, index) => {
                            return (
                                <p key={index}>{`${item?.quantity} ${item?.serviceViewModel?.name} ${convertToVnd(
                                    item?.price,
                                )}`}</p>
                            );
                        })}
                </div>

                <Slogan />
            </div>
        </div>
    );
};

export default DetailCombo;
