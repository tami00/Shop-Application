import Axios from "axios";
import React, { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import authHeader from "../../services/auth-header";
import {Button} from 'antd';


function AddCart(props) {
  const currentUser = authService.getCurrentUser();

  const onClickAdd = () => {
  }

  return (
    <div>
      <Button onClick={onClickAdd}>Add to Cart</Button> 
    </div>
  );
}

export default AddCart;