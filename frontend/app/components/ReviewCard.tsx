'use client'

import React, {useState, useEffect} from 'react';
import { Card, Inset, Text, Strong, Box, Flex, Avatar, Badge } from '@radix-ui/themes';
import axios from 'axios';
import { FaCircleUser } from "react-icons/fa6";
import ProgressBar from './ProgressBar';

interface Review {
  id: number;
  user_id: number;
  review: string;

}

interface UserReview{
  username: string;
}

interface ReviewCardProps{
  game_id: number;
}

const ReviewCard = ({ game_id }: ReviewCardProps) => {
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
        // const userReviewsData: UserReview[] = userReviewsResponses.map(response => response.data);
        // setUserReviews(userReviewsData);
        const userReviewsData: string[] = userReviewsResponses.map(response => response.data.username);
        setUsernames(userReviewsData);
      } catch (error) {
        console.error('Error fetching game reviews', error);
      }
    };

    fetchGameReviews();
  }, [game_id]);

  if (!reviews) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ display: 'grid', gap:'20px' }}>
      {reviews.map((post, index) => {
          const userReview = usernames[index];
          return(
            <div key={index}>
            <Card size="2">
              <Box>
                <Flex css={{ alignItems: 'center' }} >
                  <FaCircleUser size= {30} style={{ marginRight: '10px' }} />
                  <Text as="div" size="3" weight="bold" style={{ marginBottom: '20px'}}>
                    {/* {userReview && userReview.username} */}
                    {userReview}
                  </Text>
                </Flex>
                  <ProgressBar initialValue={0} finalValue={post.rating} />
                  {/* <Text as="div" size="2" color="gray">
                    {post.rating} 
                  </Text> */}
                  <Text as="div" size="2" color="gray" style={{ marginBottom: '20px', marginTop: '20px'}}>
                    {post.review} 
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