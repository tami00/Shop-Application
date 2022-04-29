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
                //setFavouriteList(response.data.products)
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
    dataIndex: 'price',
    key: 'price',
  },
];

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2} > View Stock</Title>
      </div>

    




    </div>
  )
}

export default ViewStock