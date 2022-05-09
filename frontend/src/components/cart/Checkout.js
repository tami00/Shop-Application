import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons'
import { Card, Space,Input  } from 'antd'
import authService from "../../services/auth.service";
import { useHistory } from "react-router-dom";

const { Meta } = Card;

function Checkout() {
    const currentUser = authService.getCurrentUser();
    const [cartDetails, setCartDetails] = useState([])
    const history = useHistory();

    useEffect(() => {

        checkout()

    }, [])

    const checkout = () => {
        axios.get("http://localhost:8080/api/getCart", { data: currentUser.id })
            .then((response) => {
                console.log('DATA', response.data);
                setCartDetails(response.data.products)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const items = cartDetails.items
    console.log('ITEMS', items)


    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>  Cart <ShoppingCartOutlined />  </h2>
            </div>


            {cartDetails.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>Add to your cart</h2>
                </div> :
                <div>
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        {items ? items.map((product, index) => {

                            return <Card
                                    // key={index}
                                    // productTitle={product.title}
                                    hoverable={true}
                                >
                                    <Meta
                                        title={product.title}
                                    description={`$${product.price}`}
                                    />
                                     <DeleteOutlined/>
                                </Card>
            
                        }) : <div></div>}
</Space>


<br></br>
<h3>Total: {cartDetails.bill}</h3>
<p>Input any discount codes below</p>
<Input style={{ width: '20%' }}/>

                </div>
            }

        </div>
    )
}

export default Checkout;