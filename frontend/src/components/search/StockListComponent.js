import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'; // services
import authHeader from '../../services/auth.service'
import Axios from 'axios';
import { Card, Avatar, Space } from 'antd';


const { Meta } = Card;

const StockListContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 30px;
  gap: 25px;
  justify-content: center;
  align-items: center;
`;

const StockListComponent = (props) => {
  
  const [loading, setLoading] = useState(true);
  const [titleList, setTitleList] = useState([]);
  const { title } = useParams();

  const history = useHistory();

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/admin/search/title?title=${title}`)
      .then(({ data }) => {
        console.log(data.products);
        setTitleList(data.products);
        setTimeout(() => setLoading(false), 500);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  

  return (
    <StockListContainer
      onClick={() => {
        //history.push(`/films/${props.movieList.movie.id}`)
      }}
    >
      {loading && <div>Loading...</div>}
      {!loading &&
        titleList.map((stock, i) => (
        //   <Link key={i} to={`/user/${user._id}`}>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Card key={i} stock={stock} style={{ width: 700 }}>
            <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={stock.title}
                    description={"Quantity: "+stock.quantity}
                  />
            </Card>
          </Space>
        //   </Link>
        ))}
      {!loading && titleList.length === 0 && (
        <div>No stock with that title exists</div>
      )}
    </StockListContainer>
  );
};

export default StockListComponent;