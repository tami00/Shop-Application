import React, { useState, useRef } from 'react';
import Axios from 'axios';
import { Button, Input } from 'antd';
import authService from '../../services/auth.service';
import authHeader from '../../services/auth-header';
import FirstReview from './FirstReview';
import { useEffect } from 'react';

const { TextArea } = Input;

const Reviews = (props) => {
  const currentUser = authService.getCurrentUser();
  const [review, setReview] = useState('');
  const [reload, setReload] = useState(true);

  const handleChange = (e) => {
    setReview(e.target.value);
    // console.log(e.target.value)
  };

  const handleReload = () => {
    setReload(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      prodID: props.prodID,
      title: props.title,
      content: review,
      author: currentUser.id,
      reviewId: props.reviewId
    };

    Axios.post('http://localhost:8080/api/review/addReview', variables)
    .then((response) => {
      if (response.data.success) {
        setReview('');
        props.refreshFunction(response.data.result);
        // console.log(JSON.stringify(review))
      } else {
        alert('Failed to save review');
      }
    });
  };

  return (
    <div>
      <p>replies</p>
      {props.reviewList &&
        props.reviewList.map(
          (review) =>
            !review.responseTo && (
              <React.Fragment key={review._id}>
                <FirstReview
                  review={review}
                  movieId={props.movieId}
                  refreshFunction={props.refreshFunction}
                  handleRefresh={handleReload}
                  isNested={false}
                />
              </React.Fragment>
            )
        )}
      <form style={{ display: 'flex' }} onSubmit>
        <TextArea
          style={{ width: '100%', borderRadius: '5px' }}
          placeholder="leave a review"
          value={review}
          onChange={handleChange}
        />
        <button
          style={{ width: '20%', height: '52px' }}
          onClick={onSubmit}
        ></button>
      </form>
    </div>
  );
};

export default Reviews;
