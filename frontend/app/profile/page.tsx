"use client"

import { Box, Card, Grid, Text} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import PersonProfile from "../components/PersonProfile";
import ReviewCard from "../components/ReviewCard";
import axios from "axios";

const ProfilePage = ({user_id}) => {
    // Display the user's information, along with their reviews

    const[profile, setProfile] = useState(null);
    const[reviewList, setReviewsList] = useState(null);

    const getUserProfile = async () => {
        try{
            const profileResponse = await axios.get('http://localhost:3000/:user_id');
            const profile = profileResponse.data[user_id];
            setProfile(profile);
        }catch(error){
            console.log("There was a problem getting the user profile.");
        }

        try {
            const reviewsResponse = await axios.get('http://localhost:3000/user/:user_id');
            const userReviews = reviewsResponse.data[user_id];
            setReviewsList(userReviews);
        }
        catch(error){
            console.log("There was a problem getting the user reviews.");
        }
    }
    getUserProfile()

    if(!profile){
        return <div>Loading profile...</div>
    }
    if(!reviewList){
        return <div>Loading reviews...</div>
    }
    return(
        //<Grid>
          //  <PersonProfile name = "John Doe" email = "johndoe@someemail.com"/>
            //<ReviewCard gameName={"Minecraft"}/>
        //</Grid>
        <div>
            <div style={{ display: 'grid', gap:'20px' }}>
            {profile.map(p => (
                <div>
                    <Text as="div" size="2" weight="bold">
                        {p.username};
                    </Text>
                    <Text as="div" size="2" weight="bold">
                        {p.email};
                    </Text>
                </div>
            ))}
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