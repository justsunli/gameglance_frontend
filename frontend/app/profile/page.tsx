"use client"

import { Avatar, Box, Card, Grid, Inset, Text} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import PersonProfile from "../components/PersonProfile";
import ReviewCard from "../components/ReviewCard";
import axios from "axios";
import {auth} from '../components/firebase';
import ProgressBar from "../components/ProgressBar";

const ProfilePage = () => {
    // Display the user's information, along with their reviews
 
    // auth.onAuthStateChanged(auth, (currentUser) => {
    //     const user = auth.currentUser;
    //     console.log("User: ", user);
    //     const user_id = user.uid;
    // })
    const user_id = 14;
    const[profile, setProfile] = useState('');
    const[reviewList, setReviewsList] = useState([]);
    const[games, setGames] = useState('');

    const getUserProfile = async () => {
        const url = 'http://localhost:8080/user/' + user_id;
        //const url = 'http://localhost:8080/user/13';
            //useEffect(() => {
            try {
                const profileResponse = await axios({
                    method: 'GET',
                    url: url,
                    //responseType: 'text'
                });
                //console.log("Data: ", profileResponse.data);
                setProfile(profileResponse.data);
                //return profileResponse.data;
            }
            catch(error) {
                console.log("Error: Failed to get profile.", error.message);
            }
    }

    const getReviews = async () => {
        const reviewURL = 'http://localhost:8080/review/user/' + user_id;
        try {
        const reviewResponse = await axios({
            method: 'GET',
            url: reviewURL,
            //responseType: 'text'
        });
            console.log("reviews: ", reviewResponse.data);
            setReviewsList(reviewResponse.data);
        }catch(error){
            console.log("Error: Failed to get reviews.", error.message);
        }
    }

    const getGameNameImage = async (game_id) => {
        const gameURL = 'http://localhost:8080/game/' + game_id;
        try {
        const gameResponse = await axios({
            method: 'GET',
            url: gameURL,
            //responseType: 'text'
        });
            console.log("Game: ", gameResponse.data);
            return gameResponse.data;
        }catch(error){
            console.log("Error: Failed to get game.", error.message);
        }
    }
    getUserProfile();
    getReviews();
    //console.log("Data: ", profile);

    if(!profile){
       return <div>Loading profile...</div>
    }
    //if(!reviewList){
    //    return <div>Loading reviews...</div>
    //}
    //console.log("data: ", profile);
    return(
        <div style = {{display: 'flex', flexDirection: 'row'}}>
            <div style={{ display: 'grid', gap:'20px'}}>
                <div>
                    <Card size="2">
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'space-around', height: ' 100%'}}>
                            <div style={{ flex: 1, position: 'relative', paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20}}> 
                                <Inset clip="padding-box" side="left">
                                    <Text as="div" size="6" weight="bold">
                                        {profile.username}
                                    </Text>
                                    <Text as="div" size="4" weight="bold">
                                        {profile.email}
                                    </Text>
                                </Inset>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <div style={{ display: 'grid', gap:'20px' }}>
            <div>
                {reviewList.map(review => (  
                <div>
                    <Card size="2">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', justifyContent: 'space-around', height: ' 100%'}}>
                            <div style={{ flex: 1, position: 'relative', paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20}}> 
                                <Box>
                                    <Text as="div" size="2" weight="bold">
                                        {getGameNameImage(review.game_id).name}
                                    </Text>
                                    <Avatar 
                                        size="6" 
                                        src = {getGameNameImage(review.game_id).image_link}
                                        fallback="An image of the game."   
                                    />
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
      </div>
    </div>
    )
}

export default ProfilePage;