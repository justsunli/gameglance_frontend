"use client"
import { Avatar, Box, Card, Grid, Inset, Text} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import ReviewCard from "../components/ReviewCard";
import axios from "axios";
import {auth} from '../components/firebase';
import ProgressBar from "../components/ProgressBar";

interface Review {
    game_id: number;
    review: string;
    rating: number;
  }

const ProfilePage = () => {

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
              console.log(reviewedGames);          
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
    
    return(
        <div style = {{display: 'flex', flexDirection: 'row'}}>
            <div style={{ display: 'grid', gap:'20px'}}>
                <div>
                    <Card size="2">
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'space-around', height: ' 100%'}}>
                            <div style={{ flex: 1, position: 'relative', paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20}}> 
                                <Inset clip="padding-box" side="left">
                                    <Text as="div" size="6" weight="bold">
                                        {username}
                                    </Text>
                                    <Text as="div" size="4" weight="bold">
                                        {userEmail}
                                    </Text>
                                </Inset>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <div style={{ display: 'grid', gap:'20px' }}>
            <div>
                {reviewList && reviewList.length > 0 ? (
                    <div style={{ display: 'grid', gap: '20px' }}>
                    {reviewList.map((review, index) => (
                        <div key={index}>
                        <Card size="2">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', justifyContent: 'space-around', height: '100%' }}>
                            <div style={{ flex: 1, position: 'relative', paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }}>
                                <Box>
                                <a href={`/reviews/${review.game_id}`}>
                                    <Text as="div" size="2" weight="bold">
                                    {reviewedGames[index]}
                                    </Text>
                                </a>
                                {/* <Avatar 
                                    size="6" 
                                    src={getGameNameImage(review.game_id).image_link}
                                    fallback="An image of the game."   
                                /> */}
                                <Text as="div" size="2" color="gray">
                                    {review.review} 
                                </Text>
                                <Text as="div" size="2" color="yellow">
                                    <ProgressBar initialValue={review.rating} finalValue={100}/> 
                                </Text>
                                </Box>
                            </div>
                            </div>
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
      </div>
    </div>
    )
}

export default ProfilePage;