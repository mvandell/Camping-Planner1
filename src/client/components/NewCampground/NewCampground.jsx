import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostCampgroundMutation } from "../../redux/api";

const NewCampground = () => {
    const navigate = useNavigate();

    const [park, setPark] = useState("");
    const [price, setPrice] = useState(null);
    const [firewood, setFirewood] = useState(null);
    const [distance, setDistance] = useState(null);
    const [curvy, setCurvy] = useState("");
    const [reserve, setReserve] = useState(null);
    const [web, setWeb] = useState("");
    const [area, setArea] = useState("");
    const [picture, setPicture] = useState("");

    const [postCampground, {error, isLoading}] = usePostCampgroundMutation();

    if (isLoading) {
        return null;
    }
    if (error) {
        return <div> Sorry! There's a problem posting the campground. </div>
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const result = await postCampground({park, price: Number(price), firewood: Number(firewood), distance: Number(distance), curvy, reserveFrame: Number(reserve), website: web, generalArea: area, picture})
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>

        </form>
    )
}
export default NewCampground;