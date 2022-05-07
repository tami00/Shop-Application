import React, { useState, useEffect } from "react";
import {Container, Container2, PosterImg, InfoColumn, ProductTitle, ProductInfo} from "./product-info.styles";
import { useParams,useLocation } from "react-router-dom";
import Axios from 'axios';
import authHeader from '../../services/auth-header';
import Reviews from '../reviews/Reviews'
import { Rate } from 'antd';

const ProductInfoComponent = () => {
    const location = useLocation();
    const [reviewList, setReviewList] = useState([]);   
    const product = location.state[0]
    const { id } = useParams()


    useEffect(() => {
      Axios.post('http://localhost:8080/api/review/getReviews', {data:id}, { headers: authHeader()})
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

  return (
    <Container>
      <PosterImg src={"http://localhost:8080/" + product.images} />
      <InfoColumn>
        <ProductTitle>
          {product.title}
        </ProductTitle>
        <ProductInfo>
          Price: {product.price}
        </ProductInfo>
        <ProductInfo>
          Catergory: {product.catergory}
        </ProductInfo>
        <ProductInfo>
        Manufacturer: {product.manufacturer}
        </ProductInfo>
      </InfoColumn>
      <Rate/>
      {/* <div>
        {movieInfo !== undefined && <FavouriteComp movieInfo={movieInfo} />}
      </div>
      <div>
      {movieInfo !== undefined && <FutureFilmsComponent movieInfo={movieInfo} />}
      </div> */}
      <div>
        <Container2>
        <Reviews refreshFunction={updateReview} reviewList={reviewList} prodID={product.prodID} title={product.title} />
        </Container2>
      </div>
    </Container>
  );
};

export default ProductInfoComponent;