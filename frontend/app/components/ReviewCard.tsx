'use client'

import React, {useState, useEffect} from 'react';
import { Card, Inset, Text, Strong, Box, Flex, Avatar, Badge } from '@radix-ui/themes';
import axios from 'axios';

interface Review {
  id: number;
  user_id: number;
  review: string;

}

interface UserReview{
  username: string;
}


const ReviewCard = ({ game_id }: { game_id: number }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [usernames, setUsernames] = useState<string[]>([]);

  useEffect(() => {
    const fetchGameReviews = async () => {
      try {
        const response = await axios.get(`${process.env.BACKEND_URL}/game/getGameReviews/${game_id}`);
        const gameReviews: Review[] = response.data;
        setReviews(gameReviews);

        // query for username using user_id from each review
        const userReviewsPromises = gameReviews.map(review =>
          axios.get(`${process.env.BACKEND_URL}/user/${review.user_id}`)
        );
        const userReviewsResponses = await Promise.all(userReviewsPromises);
        const userReviewsData: string[] = userReviewsResponses.map(response => response.data.username);
        // setUserReviews(userReviewsData);
        setUsernames(userReviewsData);
        
      } catch (error) {
        // Handle error
      }
    };

    fetchGameReviews();
  }, [game_id]);

  if (!reviews) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ display: 'grid', gap:'20px' }}>
      {reviews.map((review, index) => {
          const userReview = usernames[index];
          return(
            <div key={index}>
            <Card size="2">
              <Box>
                <Text as="div" size="2" weight="bold">
                  {userReview}
                </Text>
                <Text as="div" size="2" color="gray">
                  {review.review} 
                </Text>
              </Box>
            </Card>
          </div>
  
          );
      })}
    </div>

  )
}

export default ReviewCard