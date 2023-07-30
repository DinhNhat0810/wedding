import { Table, Pagination } from 'antd';
import { useEffect, useState } from 'react';
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const ThemeTable = (props) => {
    const {
        bordered,
        columns = [],
        components,
        dataSource = {},
        expandable,
        footer,
        getPopupContainer,
        loading,
        locale,
        pagination,
        rowKey,
        scroll,
        showHeader,
        showSorterTooltip,
        size,
        sortDirections,
        title,
        onChange = () => {},
        pageSize,
        totalDocs,
        activePagation = 1,
        handlePaginationChange = () => {},
    } = props;

    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        setActivePage(activePagation);
    }, [activePagation]);

    const newColumns = columns?.map((item) => {
        return {
            ...item,
            title: item.title,
            dataIndex: item.dataIndex,
            key: item.dataIndex,
            render: item.render,
            sorter: item.sorter,
        };
    });

    return (
        <div style={{ overflow: 'hidden' }}>
            <Table
                bordered={bordered}
                columns={newColumns}
                components={components}
                dataSource={dataSource}
                expandable={expandable}
                footer={footer}
                getPopupContainer={getPopupContainer}
                loading={loading}
                locale={locale}
                pagination={false}
                rowKey={rowKey}
                scroll={scroll}
                showHeader={showHeader}
                showSorterTooltip={showSorterTooltip}
                size={size}
                sortDirections={['ascend', 'descend']}
                title={title}
                onChange={onChange}
            ></Table>

            {pagination && (
                <div style={{ textAlign: 'right', marginTop: '20px' }}>
                    <Pagination
                        current={activePage}
                        total={totalDocs}
                        pageSize={pageSize}
                        showTotal={(total) => `Tổng số bản ghi: ${total}`}
                        onChange={handlePaginationChange}
                        showSizeChanger={false}
                    ></Pagination>
                </div>
            )}
        </div>
    );
};

export default ThemeTable;
