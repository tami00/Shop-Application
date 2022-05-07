import Axios from "axios";
import React, { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import authHeader from "../../services/auth-header";
import { Button } from "antd";
import axios from "axios";

function AddCart(props) {
  const currentUser = authService.getCurrentUser();
  console.log(currentUser);
  console.log(props);
  const addToCarthandler = () => {
    axios
      .post(
        `http://localhost:8080/api/cart`,
        {
          productId: props.product.prodID,
          quantity: 1,
        },
        {
          params: { id: currentUser.id },
        }
      )
      .then((response) => {
        console.log(response);
        // if (response.data.success) {
        //   console.log("STOCK:", response.data.products);
        //   setProductDetails(
        //     response.data.products.map((row) => ({
        //       manufacturer: row.manufacturer,
        //       catergory: row.catergory,
        //       title: row.title,
        //       price: row.price,
        //       quantity: row.quantity,
        //       prodID: row.prodID,
        //     }))
        //   );
        // } else {
        //   alert("Error");
        // }
      });
  };

  return (
    <div>
      <Button onClick={addToCarthandler}>Add to Cart</Button>
    </div>
  );
}

export default AddCart;