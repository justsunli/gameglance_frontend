"use client"
import { Avatar, Box, Card, Grid, Inset, Text, Flex} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import ReviewCard from "../components/ReviewCard";
import axios from "axios";
import {auth} from '../components/firebase';
import ProgressBar from "../components/ProgressBar";
import { FaCircleUser } from "react-icons/fa6";

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
    const [reviewedGames, setReviewedGames] = useState<{name: string, image_link: string}[]>([]);

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
            const gameNamesData: {name: string, image_link: string}[] = reviewedGamesNamesPromises.map(response => ({name: response.data.name, image_link: response.data.image_link}));
            setReviewedGames(gameNamesData);
            console.log(gameNamesData);          
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
        <div style = {{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{flex: 1,  margin: '0 20px', position: 'relative', paddingLeft: 20, paddingRight: 20 }}>
                    
                    <Card size="2">
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'space-around', height: ' 100%'}}>
                            <FaCircleUser size= {55} style={{ marginRight: '10px' }} />
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
            <div style={{ flex: 2 }}>
            <div>
                {reviewList && reviewList.length > 0 ? (
                    <div style={{ display: 'grid', gap: '20px' }}>
                    {reviewList.map((review, index) => (
                        <div key={index}>
                        <Card size="2">
                          <Box >
                            <a href={`/reviews/${review.game_id}`}>
                              <Flex align="center" style={{ marginBottom: '10px',}}>
                                  <Avatar
                                      size="4" 
                                      src={reviewedGames[index] ? reviewedGames[index].image_link : ''}
                                      fallback="An image of the game." 
                                      style={{ marginRight: '10px' }}  
                                  />
                                
                                  <Text as="div" size="3" weight="bold">
                                  {reviewedGames[index] ? reviewedGames[index].name : 'Loading...'}
                                  </Text>
                              </Flex>
                            </a>
                            <ProgressBar initialValue={0} finalValue={review.rating}/> 
                            <Text as="div" size="2" color="gray" style={{ marginBottom: '10px', marginTop: '20px'}}>
                                {review.review} 
                            </Text>
                              
                          </Box>
                
                            {/* </div> */}
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