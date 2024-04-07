import { Button, Modal, Space, Typography } from 'antd';
import { useState } from 'react';
import { MdError } from "react-icons/md";

interface Props {
  error: string
}

const ErrorModal = ({ error }: Props) => {
  const [isOpen, setOpen] = useState(true)
  return (
    <Modal
      title={
        <Space.Compact>
          <MdError color='red' size={32} />
          <Typography.Title level={3} style={{ margin: '-1px 10px'}}>Oops</Typography.Title>
        </Space.Compact>
      }
      destroyOnClose
      open={isOpen}
      closeIcon={false}
      footer={
        <Button key='submit' type='primary' onClick={() => {
          setOpen(false)
          window.location.reload()
        }}>
          Reload
        </Button>
      }
    >
      <div>{error}</div>
    </Modal>
  )
}

export default ErrorModal