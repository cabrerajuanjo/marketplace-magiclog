import { Typography } from "@mui/material";
import React from "react";

interface FormErrorDetailProps {
    errorMessage: string | null;
}

const FormErrorDetail: React.FC<FormErrorDetailProps> = ({errorMessage}) => {
    return (errorMessage && <Typography
        color="error"
        variant="body2"
        sx={{ marginTop: "16px", textAlign: "center" }}
    >
        *{errorMessage}
    </Typography>)
}

export default FormErrorDetail;
