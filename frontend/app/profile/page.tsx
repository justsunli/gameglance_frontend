"use client"
import { Box, Card, Grid, Text} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import ReviewCard from "../components/ReviewCard";
import axios from "axios";
import {auth} from '../components/firebase';

interface Review {
    game_id: number;
    review: string;
    rating: number;
}

const ProfilePage = () => {
//   const [profile, setProfile] = useState('');
  const [reviewList, setReviewsList] = useState<Review[]>([]);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [reviewedGames, setReviewedGames] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserId = async () => {
      const user = auth.currentUser;
      if (user) {
        const response = await axios.get(`${process.env.BACKEND_URL}/user/email/${user.email}`);
        setUserId(response.data.id);
        setUserEmail(response.data.email);
        setUsername(response.data.username);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const getReviews = async () => {
      if (userId) {
        const reviewURL = `${process.env.BACKEND_URL}/review/user/${userId}`;
        try {
          const reviewResponse = await axios.get(reviewURL);
          setReviewsList(reviewResponse.data);

        } catch (error) {
            if (error instanceof Error) {
                console.log("Error: Failed to get reviews.", error.message);
              } else {
                console.log("An error occurred while fetching reviews.");
              }
        }
      }
    };

    getReviews();
  }, [userId]);

  useEffect(() => {
    const getReviewedGames = async () => {
      if (reviewList.length > 0) {
        try {
          const gamesPromises = reviewList.map(review => axios.get(`${process.env.BACKEND_URL}/game/${review.game_id}`));
          const reviewedGamesNamesPromises = await Promise.all(gamesPromises);
          const gameNamesData: string[] = reviewedGamesNamesPromises.map(response => response.data.name);
          setReviewedGames(gameNamesData);          
        } catch (error) {
          if (error instanceof Error) {
              console.log("Error: Failed to get reviews.", error.message);
            } else {
              console.log("An error occurred while fetching reviews.");
            }   
        }
      } 
    };
    getReviewedGames();
  }, [reviewList]);
  return (
    <div>
      <div style={{ display: 'grid', gap:'20px' }}>
        <div>
          <Text as="div" size="4" weight="bold">
            {username}
          </Text>
          <Text as="div" size="2" weight="bold">
            {userEmail}
          </Text>
        </div>
      </div>
      {
        reviewList ? (
          <div style={{ display: 'grid', gap:'20px' }}>
            {reviewList.map((review, index) => (  
              <div key={index}>
                <Card size="2">
                  <Box>
                    <a href={`/reviews/${review.game_id}`}>
                    <Text as="div" size="2" weight="bold">
                      {reviewedGames[index]}
                    </Text>
                    </a>
                    <Text as="div" size="2" color="gray">
                      {review.review} 
                    </Text>
                    <Text as="div" size="2" color="yellow">
                      {review.rating} 
                    </Text>
                  </Box>
                </Card>
              </div>
            ))}
          </div>
        ) : 
        <div>
          <Text as="div" size="2" weight="bold">
            No reviews found.
          </Text>
        </div>
      }

    </div>
  )
}

export default ProfilePage;