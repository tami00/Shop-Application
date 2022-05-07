import React, { useState, useEffect } from "react";
import {Container, Container2, PosterImg, InfoColumn, ProductTitle, ProductInfo} from "./product-info.styles";
import { useParams,useLocation } from "react-router-dom";
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import AddCart from "../cart/AddCart";
import { addToCart } from '../../../_actions/user_actions';
import Reviews from '../reviews/Reviews'
import { Rate } from 'antd';

const ProductInfoComponent = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [reviewList, setReviewList] = useState([]);   
    const product = location.state

    const prodID = product.product.prodID

    console.log(product.product.title)

    const { id } = useParams()


    useEffect(() => {
      Axios.post('http://localhost:8080/api/review/getReviews', {data:id})
            .then(response => {
                if (response.data.success) {
                    console.log('All Reviews',response.data.reviews)
                    setReviewList(response.data.reviews)
                } else {
                    alert('Error')
                }
            })
    }, [])


    const updateReview = (newReview) => {
      setReviewList(reviewList.concat(newReview))
    }

    const addToCartHandler = (prodID) => {
      dispatch(addToCart(prodID))
  }

  return (
    <Container>
      <PosterImg src={"http://localhost:8080/" + product.product.images} />
      <InfoColumn>
        <ProductTitle>
          {product.product.title}
        </ProductTitle>
        <ProductInfo>
          Price: {product.product.price}
        </ProductInfo>
        <ProductInfo>
          Catergory: {product.product.catergory}
        </ProductInfo>
        <ProductInfo>
        Manufacturer: {product.product.manufacturer}
        {product.product !== undefined && <AddCart product={product.product} />}
        </ProductInfo>
      </InfoColumn>
      <Rate/>
      <div>
        <Container2>
        <Reviews refreshFunction={updateReview} reviewList={reviewList} prodID={product.prodID} title={product.title} />
        </Container2>
      </div>
    </Container>
  );
};

export default ProductInfoComponent;