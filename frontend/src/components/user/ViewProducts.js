import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FireOutlined } from '@ant-design/icons'
import { Col, Card, Row } from 'antd'
import CheckBox from '../filter/CheckBox'
import { useHistory } from "react-router-dom";

const { Meta } = Card;

function ViewProducts() {
    const [productDetails, setProductDetails] = useState([])
    const history = useHistory();
    // const location = useLocation();
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [Filters, setFilters] = useState({
        catergories: [],
        price: []
    })

    useEffect(() => {

        getProducts()

    }, [])

    const getProducts = (variables) => {
        axios.post('http://localhost:8080/api/admin/getStock', variables)
            .then(response => {
                if (response.data.success) {
                    console.log('STOCK:', response.data.products)
                    setProductDetails(response.data.products)
                } else {
                    alert('Error')
                }
            })



    }

    const getFilterProducts = (variables) => {
        axios.post('http://localhost:8080/api/admin/getFilterStock', variables)
            .then(response => {
                if (response.data.success) {
                    console.log('STOCK:', response.data.products)
                    setProductDetails(response.data.products)
                } else {
                    alert('Error')
                }
            })
    }

    const renderCards = productDetails.map((product, index) => {

        return <Col lg={6} md={8} xs={24}>
            <Card
                key={index}
                productTitle={product.title}
                hoverable={true}
                cover={<img alt="pic" src={"http://localhost:8080/" + product.images} />}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                    onClick={() => { history.push(`/products/${product.title}/${product.prodID}`, {product}) }}
                />
            </Card>
        </Col>
    })

    const showFilteredResults = (filters) => {
        const variables = {
            filters: filters

        }
        getProducts(variables)
        setSkip(0)
    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        if (category === "price") {
            // let priceValues = handlePrice(filters)
            // newFilters[category] = priceValues

        }

        console.log(newFilters)

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }




    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>  We Sell Everything!  <FireOutlined />  </h2>
            </div>


            <CheckBox
                handleFilters={filters => handleFilters(filters, "catergories")}
            />

            {productDetails.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No products available yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>

                        {renderCards}

                    </Row>


                </div>
            }

        </div>
    )
}

export default ViewProducts