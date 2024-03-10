'use client'

import React, {useState, useEffect} from 'react';
import { Card, Inset, Text, Strong, Box, Flex, Avatar, Badge } from '@radix-ui/themes';
import axios from 'axios';

function ReviewCard({gameName}){
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchGameReviews = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getgamereviews');
        const gameReviews = response.data[gameName];
        setReviews(gameReviews);
      } catch (error) {
        console.error('Error fetching game reviews: ', error);
      }
    };
  
    fetchGameReviews();
  }, [gameName]);

  console.log('Game reviews:', reviews); 
  if (!reviews) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ display: 'grid', gap:'20px' }}>
      {reviews.map(review => (

        <div key={review.id} >
          <Card size="2">
            <Box>
              <Text as="div" size="2" weight="bold">
                {review.userName}
              </Text>
              <Text as="div" size="2" color="gray">
                {review.description} 
              </Text>
            </Box>
          </Card>
        </div>
      ))}
    </div>

  )
}

export default ReviewCard