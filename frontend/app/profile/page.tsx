import { Grid} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import PersonProfile from "../components/PersonProfile";
import ReviewCard from "../components/ReviewCard";

const ProfilePage = () => {
    // Display the user's information, along with their reviews

    // These are placeholders; in the final app the name and email should
    // be as given by the user when they sign up

    return(
        <Grid>
            <PersonProfile name = "John Doe" email = "johndoe@someemail.com"/>
            <ReviewCard gameName={"Minecraft"}/>
        </Grid>
    )
}

export default ProfilePage;