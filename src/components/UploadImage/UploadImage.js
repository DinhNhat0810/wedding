import { Modal, Upload } from 'antd';

import { useState } from 'react';
import { getBase64 } from '../../utils/common';
import ThemeLoading from '../ThemeLoading/ThemeLoading';
import ThemeButton from '../ThemeButton/ThemeButton';
import { UploadOutlined } from '@ant-design/icons';
import { uploadFile } from '../../services/uploadFile';

const UploadImage = (props) => {
    const { onGetImage, multiple, showUploadList } = props;
    const [loading, setLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [fileList, setFileList] = useState([]);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = async ({ fileList: newFileList }) => {
        setLoading(true);
        const formData = new FormData();
        const callback = (data) => {
            setLoading(false);
        };
        formData.append('file', newFileList[0]?.originFileObj);
        const res = await uploadFile(formData, callback);

        if (res) {
            setAvatar(res);
            onGetImage(res);
        }
        setLoading(false);

        if (showUploadList) {
            setFileList(newFileList);
        }
    };

    const handleCancel = () => setPreviewOpen(false);

    return (
        <>
            <ThemeLoading loading={loading} />

            <Upload
                beforeUpload={() => false}
                listType="picture"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                multiple={multiple}
                showUploadList={showUploadList}
            >
                <ThemeButton content="Tải ảnh lên" icon={<UploadOutlined />}></ThemeButton>
            </Upload>

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

export default UploadImage;
