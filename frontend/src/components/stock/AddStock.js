import React, { useState} from 'react'
import axios from 'axios';
import { Typography, Button, Form, Input, InputNumber  } from 'antd';
import UploadImage from './UploadImage'
const { Title } = Typography;

const Catergory = [
    { value: 0, label: "Electronics" },
    { value: 0, label: "Clothes" },
    { value: 0, label: "Books" },
    { value: 0, label: "Toys" },
    { value: 0, label: "Outdoor" },
]


function AddStock() {

    const [title, settitle] = useState("");
    const [manufacturer, setmanufacturer] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [categories, setCategories] = useState("Electronics")

    const [images, setImages] = useState([])

    const prodID = title+quantity+price


    const handleChangetitle = ( event ) => {
        settitle(event.currentTarget.value)
    }

    const handleChangemanufacturer = (event) => {
        console.log(event.currentTarget.value)
        setmanufacturer(event.currentTarget.value)
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

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" || manufacturer === "" ||
        categories === "" || price === "") {
        return alert('Please fill in all the fields first')
        }

        const variables = {
            title: title,
            manufacturer: manufacturer,
            catergory: categories,
            price: price,
            quantity: quantity,
            prodID: prodID,
            images: images,
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
        
            window.location.reload()
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Title level={2} > Add Stock</Title>
        </div>

        <Form onSubmit={onSubmit}>


        <UploadImage refreshFunction={updateImages} />
        <br/><br/>

            <label>title</label>
            <Input
                 onChange={handleChangetitle}
                 value={title}
            />
            <br/><br/>
            <label>manufacturer</label>
            <Input
                 onChange={handleChangemanufacturer}
                 value={manufacturer}
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