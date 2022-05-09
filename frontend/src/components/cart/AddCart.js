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
      .post(`http://localhost:8080/api/cart`, {productId: props.product.prodID, quantity: 1,id: currentUser.id, })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div>
      <Button onClick={addToCarthandler}>Add to Cart</Button>
    </div>
  );
}

export default AddCart;