import React from 'react'
import authService from "../../services/auth.service";

function OrderConfirmation() {
    const currentUser = authService.getCurrentUser();
  return (
    <div>
        <h2>Your order has been successful!</h2>
        <h3>A confimation email was sent to {currentUser.email}</h3>
    </div>
  )
}

export default OrderConfirmation