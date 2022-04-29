import React, { useState, useEffect} from 'react'
import { Typography, Button, Form, message, Input, InputNumber  } from 'antd';

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
    const [categories, setCategories] = useState("Electronics")


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

    const handleChangeTwo = (event) => {
        setCategories(event.currentTarget.value)
    }

    const onSubmit = () => {
        
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