import React, { useState} from 'react'
import axios from 'axios';
import { Typography, Button, Form, Input, InputNumber  } from 'antd';
import authHeader from '../../services/auth-header';

const { Title } = Typography;

const Catergory = [
    { value: 0, label: "Electronics" },
    { value: 0, label: "Clothes" },
    { value: 0, label: "Books" },
    { value: 0, label: "Toys" },
    { value: 0, label: "Outdoor" },
]


function UpdateStock() {

    const [prodID, setProdID] = useState("");
    const [title, setTitle] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [categories, setCategories] = useState("Electronics")


    const handleChangeProdID = ( event ) => {
      setProdID(event.currentTarget.value)
  }

    const handleChangeTitle = ( event ) => {
        setTitle(event.currentTarget.value)
    }

    const handleChangeManufacturer = (event) => {
        console.log(event.currentTarget.value)
        setManufacturer(event.currentTarget.value)
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

        const variables = {
            prodId: prodID,
            title: title,
            manufacturer: manufacturer,
            catergory: categories,
            price: price,
            quantity: quantity,
            // images: images
        }

        console.log(variables)

        axios.post('http://localhost:8080/api/admin/updateStock', variables,  {headers: authHeader(),
        })
            .then(response => {
                if (response.data) {
                    console.log('Stock updated successfully')
                } else {
                    alert('Failed to update stock')
                }
            })


            // const onSubmit = (event) => {
            //     const variables = {
            //         userFrom: currentUser.id,
            //         username: username,
            //         email: email,
            //         bio: bio,
            //         phoneNo: phoneNo,
            //         filePath: filePath
            //     }
        
            //     Axios.post("http://localhost:8080/api/auth/update", variables, {headers: authHeader(),
            //     }).then((response) => {
            //         console.log(variables.userFrom);
            //         if (response.data.success) {
            //             console.log("Updated");
            //             localStorage.setItem("user", JSON.stringify(response.data));
            //             return uploadSuccess()
            //         } else {
            //             console.log(response.error);
            //             return uploadError()
            //         }
            //     });
            //     window.location.reload()
            // }
        

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Title level={2} > Update Stock</Title>
        </div>

        <Form onSubmit={onSubmit}>
        <label>ID</label>
            <Input
                 onChange={handleChangeProdID}
                 value={prodID}
            />
            <label>Title</label>
            <Input
                 onChange={handleChangeTitle}
                 value={title}
            />
            <br/><br/>
            <label>Manufacturer</label>
            <Input
                 onChange={handleChangeManufacturer}
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

export default UpdateStock