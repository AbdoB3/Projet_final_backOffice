import React, { useState } from 'react';
import { Button, Table, Avatar, Typography, Flex, Dropdown, Menu, Modal } from 'antd';
import { faEllipsisVertical, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditPatient from './EditPatient';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { Title } = Typography;
const { confirm } = Modal;

const deleteHandler = () => {
  confirm({
    title: 'Do you want to delete this doctor?',
    icon: <ExclamationCircleFilled />,
    content: 'Click ok to delete it',
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));
    },
    onCancel() { },
  });
};


const data = [];
for (let i = 0; i < 44; i++) {
  data.push({
    key: i,
    name: (
      <>
        <Avatar src={'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'} />
        {' '}
        Edward King
        {' '}
        {i}
      </>
    ),
    age: 32,
    email: `Edward.King${i}@gmail.com`,
    phone: `06${i + i}4567890`

  });
}

const ListPation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Action',
      key: 'operation',
      render: () => (

        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">
                <Button type="text" onClick={showModal} icon={<FontAwesomeIcon icon={faEdit} />}>Edit</Button>
              </Menu.Item>
              <Menu.Item key="2">
                <Button type="text" onClick={deleteHandler} icon={<FontAwesomeIcon icon={faTrashAlt} />}>Delete</Button>
              </Menu.Item>

            </Menu>
          }
        >
          <Button type="text" icon={<FontAwesomeIcon icon={faEllipsisVertical} />} />
        </Dropdown>
      ),
    },
  ];


  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Flex wrap="wrap" gap="small" className="site-button-ghost-wrapper justify-between">
          <Title level={2} >List Patient</Title>
          <Button type="primary" onClick={start} className="mt-1" disabled={!hasSelected} loading={loading}>
            Reload
          </Button>
        </Flex>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table
        pagination={{ pageSize: 6 }}
        rowSelection={rowSelection} columns={columns} dataSource={data} />
      <Modal title="Edit Patient" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <EditPatient />
      </Modal>
    </div>
  );
};
export default ListPation;