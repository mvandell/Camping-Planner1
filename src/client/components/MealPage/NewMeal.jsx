import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

import { useNavigate } from "react-router-dom";
import { usePostMealMutation, useGetAllFoodQuery } from "../../redux/api";

const NewMeal = () => {
    const navigate = useNavigate();

    const [postMeal, {error, isLoading}] = usePostMealMutation();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    return (
        <>
        </>
    )
}

export default NewMeal;