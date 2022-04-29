import React, { useState} from 'react'
import axios from 'axios';
import { Typography, Button, Form, Input, InputNumber  } from 'antd';

const { Title } = Typography;

const Catergory = [
    { value: 0, label: "Electronics" },
    { value: 0, label: "Clothes" },
    { value: 0, label: "Books" },
    { value: 0, label: "Toys" },
    { value: 0, label: "Outdoor" },
]


function AddStock() {

    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [categories, setCategories] = useState("Electronics")

    const prodID = name+quantity+price


    const handleChangeName = ( event ) => {
        setName(event.currentTarget.value)
    }

    const handleChangeBrand = (event) => {
        console.log(event.currentTarget.value)
        setBrand(event.currentTarget.value)
    }

    const handleChangePrice = (value) => {
        console.log(value)
        setPrice(value)
    }

    const handleChangeQuantity = (value) => {
        console.log(value)
        setQuantity(value)
    }

    const handleChangeTwo = (event) => {
        setCategories(event.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (name === "" || brand === "" ||
        categories === "" || price === "") {
        return alert('Please fill in all the fields first')
        }

        const variables = {
            name: name,
            brand: brand,
            catergory: categories,
            price: price,
            quantity: quantity,
            prodID: prodID
        }

        console.log(variables)

        axios.post('http://localhost:8080/api/admin/addStock', variables)
            .then(response => {
                if (response.data.success) {
                    console.log('Stock added successfully')
                } else {
                    alert('Failed to add stock')
                }
            })
        

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Title level={2} > Add Stock</Title>
        </div>

        <Form onSubmit={onSubmit}>
            <label>Name</label>
            <Input
                 onChange={handleChangeName}
                 value={name}
            />
            <br/><br/>
            <label>Brand</label>
            <Input
                 onChange={handleChangeBrand}
                 value={brand}
            />
            <br/><br/>
            <label>Price</label>
            <InputNumber
                 onChange={handleChangePrice}
                 value={price}
            />
            <br/><br/>

            <label>Quantity</label>
            <InputNumber
                 onChange={handleChangeQuantity}
                 value={quantity}
            />
            <br/><br/>

            <select onChange={handleChangeTwo}>
                {Catergory.map((item, index) => (
                    <option key={index} value={item.label}>{item.label}</option>
                ))}
            </select>
            <br /><br />

            <Button type="primary" size="large" onClick={onSubmit}>
                Submit
            </Button>

        </Form>
    </div>
    )
}

export default AddStock