import React from "react";
import { Text } from "@radix-ui/themes";

const PersonProfile = ({name, email}) => {
    return (
        <div>
            <Text as="div" size = "4" >
                {name}
            </Text>
            <Text as="div" size = "2" >
                {email}
            </Text>
        </div>
    )
}

export default PersonProfile;