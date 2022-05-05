import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Typography, Table} from 'antd';

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
                    manufacturer: row.manufacturer,
                    catergory: row.catergory,
                    title: row.title,
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
    title: 'Title',
    dataIndex: 'title',
    key: 'name',
    width: 150,
    render: text => <a>{text}</a>,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    width: 150
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    width: 150,
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
   {
    title: 'Manufacturer',
    dataIndex: 'manufacturer',
    key: 'brand',
    width: 150
  }, {
    title: 'Catergory',
    dataIndex: 'catergory',
    key: 'catergory',
    width: 150,
    filters: [
      {
        text: 'Electronics',
        value: 'Electronics',
      },
      {
        text: 'Clothes',
        value: 'Clothes',
      },
      {
        text: 'Books',
        value: 'Books',
      },
      {
        text: 'Outdoor',
        value: 'Outdoor',
      },
      {
        text: 'Toys',
        value: 'Toys',
      },     
    ],
    onFilter: (value, record) => record.catergory.indexOf(value) === 0,
  },
  {
    title: 'ID',
    dataIndex: 'prodID',
    key: 'prodID',
    width: 150
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}


  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2} > View Stock</Title>
      </div>
      <Table
          columns={columns}
          dataSource={productDetails}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 500, y:240 }}
          onChange={onChange}
        />
    </div>
  )
}

export default ViewStock