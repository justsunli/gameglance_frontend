"use client"
import { Box, Card, Grid, Text} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import PersonProfile from "../components/PersonProfile";
import ReviewCard from "../components/ReviewCard";
import axios from "axios";
import {auth} from '../components/firebase';

const ProfilePage = () => {
//   const [profile, setProfile] = useState('');
  const [reviewList, setReviewsList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [username, setUsername] = useState(null);

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
          console.log("Error: Failed to get reviews.", error.message);
        }
      }
    };

    getReviews();
  }, [userId]);


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
      <div style={{ display: 'grid', gap:'20px' }}>
        {reviewList.map(review => (  
          <div>
            <Card size="2">
              <Box>
                <Text as="div" size="2" weight="bold">
                  {review.game_id}
                </Text>
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
    </div>
  )
}

export default ProfilePage;