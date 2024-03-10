"use client"

import { Box, Card, Grid, Text} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import PersonProfile from "../components/PersonProfile";
import ReviewCard from "../components/ReviewCard";
import axios from "axios";

const ProfilePage = () => {
    // Display the user's information, along with their reviews

    const[profile, setProfile] = useState('');
    const[reviewList, setReviewsList] = useState([]);

    const getUserProfile = async () => {
        //const url = 'http://localhost:8080/user/' + user_id;
        const url = 'http://localhost:8080/user/13';
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
        const reviewURL = 'http://localhost:8080/review/user/14';
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
        <div>
            <div style={{ display: 'grid', gap:'20px' }}>
                <div>
                    <Text as="div" size="4" weight="bold">
                        {profile.username}
                    </Text>
                    <Text as="div" size="2" weight="bold">
                        {profile.email}
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