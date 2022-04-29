import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Typography, Table, Tag, Space} from 'antd';

const { Title } = Typography;

function ViewStock() {

  const [productDetails, setProductDetails] = useState([])

  useEffect(() => {
    axios.post('http://localhost:8080/api/admin/getStock')
        .then(response => {
            if (response.data.success) {
                console.log('STOCK:', response.data.products)
                setProductDetails(
                  response.data.products.map(row => ({
                    brand: row.brand,
                    catergory: row.catergory,
                    name: row.name,
                    price: row.price,
                    quantity: row.quantity,
                    prodID: row.prodID
                  })))
            } else {
                alert('Error')
            }
        })
},[])

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
   {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
  }, {
    title: 'Catergory',
    dataIndex: 'catergory',
    key: 'catergory',
  },
  {
    title: 'ID',
    dataIndex: 'prodID',
    key: 'prodID',
  },
];

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2} > View Stock</Title>
      </div>
      <Table
          columns={columns}
          dataSource={productDetails}
          pagination={{ pageSize: 10 }}
          scroll={{ y: 240 }}
        />
    </div>
  )
}

export default ViewStock