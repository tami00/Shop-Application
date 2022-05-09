import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Typography, Table} from 'antd';

const { Title } = Typography;

function UserList() {

  const [userDetails, setUserDetails] = useState([])

  useEffect(() => {
    axios.post('http://localhost:8080/api/admin/getUsers')
        .then(response => {
            if (response.data.success) {
                console.log('USERS:', response.data.users)
                setUserDetails(
                  response.data.users.map(row => ({
                    username: row.username,
                    email: row.email,
                    phoneNo: row.phoneNo,
                    address: row.address
                  })))
            } else {
                alert('Error')
            }
        })
},[])

const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    width: 150,
    render: text => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 150
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNo',
    key: 'phoneNo',
    width: 150
  },
   {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 150
  }, 
];

function onChange(pagination) {
  console.log('params', pagination);
}


  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2} > View Users</Title>
      </div>
      <Table
          columns={columns}
          dataSource={userDetails}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 500, y:240 }}
          onChange={onChange}
        />
    </div>
  )
}

export default UserList