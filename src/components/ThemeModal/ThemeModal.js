import { Modal } from 'antd';

const ThemeModal = (props) => {
    const {
        open,
        centered,
        keyboard,
        style,
        width,
        title,
        onCancel = () => {},
        onOk = () => {},
        contents,
        okButtonProps,
        ...rest
    } = props;

    return (
        <>
            <Modal
                centered={centered}
                keyboard={keyboard}
                style={{ maxHeight: '90vh', ...style }}
                title={<p style={{ fontSize: '20px' }}>{title}</p>}
                open={open}
                width={width}
                onOk={onOk}
                onCancel={onCancel}
                okButtonProps={okButtonProps}
                {...rest}
            >
                {contents}
            </Modal>
        </>
    );
};

export default ThemeModal;
