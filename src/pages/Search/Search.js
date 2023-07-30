import { Breadcrumb, Col, Pagination, Row } from 'antd';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import useBreadCrumb from '../../hooks/useBreadCrumb';
import { breadcrumbNameMap } from '../../utils/constant';
import { useEffect, useState } from 'react';
import ThemeButton from '../../components/ThemeButton/ThemeButton';
import ThemeInput from '../../components/ThemeInput/ThemeInput';
import ProductItem from '../../components/ProductItem/ProductItem';
import Slogan from '../../components/Slogan/Slogan';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { searchService } from '../../services/services';

const cx = classNames.bind(styles);

const Search = () => {
    const [activePage, setActivePage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const location = useLocation();
    const [searchData, setSearchData] = useState([]);
    const [pagination, setPagination] = useState({
        pageSize: 10,
        totalDocs: '',
    });

    const handleChangePagination = (page) => {
        const payload = {
            search: searchInput,
        };
        handleSearch(payload, page - 1);
        setActivePage(page);
    };

    const handleSearch = async (data) => {
        const params = {
            search: data,
            page: 0,
            size: 10,
        };
        const res = await searchService(params);
        if (res?.content) {
            setSearchData(res?.content);
            setPagination((prev) => {
                return {
                    ...prev,
                    total: res?.totalElements,
                };
            });
        }
    };

    console.log(searchData);

    useEffect(() => {
        if (location.state?.searchString) {
            handleSearch(location.state?.searchString);
        }
    }, [location.state?.searchString]);

    const breadcrumbItems = useBreadCrumb(breadcrumbNameMap);

    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>Tìm kiếm</title>
            </Helmet>
            <div className="container">
                <Breadcrumb
                    separator=">"
                    style={{ margin: '1rem 0 6rem 0', paddingBottom: '1rem', borderBottom: '0.1rem solid #ccc' }}
                    items={breadcrumbItems}
                />

                <Row gutter={48}>
                    <Col lg={12} xl={12}>
                        <h1 className={cx('title')}>Nhập từ khóa để tìm kiếm sản phẩm</h1>
                        <h2>Có {pagination?.total || 0} kết quả tìm kiếm phù hợp</h2>
                    </Col>
                    <Col lg={12} xl={12} className={cx('searchbox')}>
                        <div className={cx('searchbox_input')}>
                            <ThemeInput
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Tìm kiếm..."
                                stylesInput={{ borderRadius: 0, padding: '1rem ' }}
                            />
                        </div>
                        <ThemeButton
                            onClick={() => handleSearch(searchInput)}
                            content="Tìm kiếm"
                            styles={{ borderRadius: 0, border: 'none', height: '4.4rem', width: '10rem' }}
                        />
                    </Col>
                </Row>

                <div className={cx('products')}>
                    <Row gutter={36}>
                        {searchData?.map((item, index) => {
                            return <ProductItem key={index} item={item} positionAction="70%" />;
                        })}
                    </Row>
                </div>
                <div className={cx('pagination')}>
                    <Pagination
                        current={activePage}
                        onChange={handleChangePagination}
                        total={pagination?.total}
                        pageSize={pagination?.pageSize}
                        showSizeChanger={false}
                    />
                </div>

                <Slogan />
            </div>
        </div>
    );
};

export default Search;
