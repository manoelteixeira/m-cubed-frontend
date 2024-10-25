import React from "react";
import { Typography, Box } from "@mui/material";

const FooterTwo = () => {
    return (
        <Box
            sx={{
                backgroundColor: "#00a250",
                color: "#f6f7f8",
                padding: "40px 0",
                // transition: "all 0.3s ease",
                // "&:hover": {
                //     padding: "60px 0",
                //     backgroundColor: "#008b3e",
                // },
            }}
        >
            <Typography
                variant="body2"
                align="center"
                sx={{
                    fontSize: "14px",
                    // transition: "color 0.3s ease",
                    // "&:hover": {
                    //     color: "#ffeb3b",
                    //     textDecoration: "underline",
                    // },
                }}
            >
                © {new Date().getFullYear()} MoneyMoneyMoney. All rights reserved.
            </Typography>
        </Box>
    );
};

export default FooterTwo;

