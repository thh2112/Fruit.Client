import { Card, Flex, Typography, Upload, theme } from 'antd';
import ImgCrop from 'antd-img-crop';
import { Plus } from 'lucide-react';
interface UploadSingleFileProps {
  loading: boolean;
  onSubmit: (file: File[]) => void;
}

const UploadSingleFile = ({ onSubmit, loading }: UploadSingleFileProps) => {
  const {
    token: { colorIcon, colorBorderSecondary },
  } = theme.useToken();

  const handleBeforeUpload = (file: File) => {
    if (!file || loading) {
      return;
    }

    onSubmit([file]);
  };

  return (
    <>
      <ImgCrop modalCancel="Cancel" modalOk="Upload">
        <Upload beforeUpload={handleBeforeUpload} showUploadList={false} maxCount={1}>
          <Card style={{ cursor: 'pointer', background: colorBorderSecondary }}>
            <Flex gap={8} align="center">
              <Plus size={16} color={colorIcon} />
              <Typography.Text>Upload</Typography.Text>
            </Flex>
          </Card>
        </Upload>
      </ImgCrop>
    </>
  );
};

export default UploadSingleFile;
