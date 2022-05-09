import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons'
import { Card, Space, Input, Button, message } from 'antd'
import authService from "../../services/auth.service";
import { useHistory } from "react-router-dom";

const { Meta } = Card;

function Checkout() {
    const [loyalty, setLoyalty] = useState("");
    const currentUser = authService.getCurrentUser();
    const [cartDetails, setCartDetails] = useState([])
    const [total, setTotal] = useState([])
    const history = useHistory();

    const handleChangeLoyalty = ( event ) => {
        setLoyalty(event.currentTarget.value)
    }

    const error = () => {
        message.error('Enter a valid discount');
      };

    useEffect(() => {

        checkout()

    }, [])

    const checkout = () => {
        axios.get("http://localhost:8080/api/getCart", { data: currentUser.id })
            .then((response) => {
                console.log('DATA', response.data.products.items);
                setCartDetails(response.data.products)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const items = cartDetails.items
    // console.log('ITEMS', items)

    // const map =items

    // const result = Object && Object.values(map);

    // console.log(result)

    const variables = {
        title: cartDetails.items,
        bill: cartDetails.bill,
        userID: currentUser.id
    }

    const createOrder = () => {
        axios.post("http://localhost:8080/api/order/addOrder", { data: variables })
            .then((response) => {
                // console.log('DATA', response.data);
                // setCartDetails(response.data.products)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getDiscount = () =>{
        if(loyalty != "NEW10") {
            error()
        }
        else{
            const percent = cartDetails.bill * 0.1
            setTotal(cartDetails.bill - percent)
            console.log(total)
        }
    }

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
                                <DeleteOutlined />
                            </Card>

                        }) : <div></div>}
                    </Space>


                    <br></br>
                    {total.length === 0 ? <h3>Total: {cartDetails.bill}</h3> : <h3>Total: {total}</h3>} 
                    <p>Input any discount codes below</p>
                    <Input
                        style={{ width: '20%' }}
                        onChange={handleChangeLoyalty}
                        value={loyalty}
                    />
                    <br></br>
                    <Button onClick={getDiscount}>Enter</Button>
                    <br></br>
                    <br></br>
                    <Button onClick={createOrder} size="large" shape="round" icon={<ShoppingCartOutlined />}>BUY</Button>
                    <br></br>
                    <br></br>
                </div>
            }
        </div>
    )
}

export default Checkout;