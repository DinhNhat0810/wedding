import { Modal, Upload } from 'antd';

import { useRef, useState } from 'react';
import { getBase64 } from '../../utils/common';
import ThemeLoading from '../ThemeLoading/ThemeLoading';
import ThemeButton from '../ThemeButton/ThemeButton';
import { UploadOutlined } from '@ant-design/icons';
import { uploadFile, uploadMultiFile } from '../../services/uploadFile';

const UploadMultipleImage = (props) => {
    const { onGetImage } = props;
    const [loading, setLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [avatar, setAvatar] = useState(null);
    const multipleUploadImageRef = useRef();

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = async (e) => {
        const files = [...e.target.files];
        setLoading(true);
        const formData = new FormData();
        const callback = (data) => {
            setLoading(false);
        };

        files?.forEach((item) => {
            formData.append('file', item);
        });

        const res = await uploadMultiFile(formData, callback);

        if (res) {
            setAvatar(res);
            onGetImage(res);
        }
        setLoading(false);

        multipleUploadImageRef.current.value = '';
    };

    const handleCancel = () => setPreviewOpen(false);

    return (
        <>
            <ThemeLoading loading={loading} />

            <input
                ref={multipleUploadImageRef}
                onChange={handleChange}
                type="file"
                id="multipleUploadImage"
                multiple
                style={{ display: 'none' }}
            />
            <label htmlFor="multipleUploadImage">
                <ThemeButton
                    onClick={() => {
                        multipleUploadImageRef.current?.click();
                    }}
                    content="Tải ảnh lên"
                    icon={<UploadOutlined />}
                ></ThemeButton>
            </label>

            <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </>
    );
};

export default UploadMultipleImage;
