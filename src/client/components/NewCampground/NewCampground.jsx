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

    const [postCampground, { error, isLoading }] = usePostCampgroundMutation();

    if (isLoading) {
        return null;
    }
    if (error) {
        return <div> Sorry! There's a problem posting the campground. </div>
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const result = await postCampground({ park, price: Number(price), firewood: Number(firewood), distance: Number(distance), curvy, reserveFrame: Number(reserve), website: web, generalArea: area, picture })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Park Name"
                helperText={<Typography>Please include NP if National Park or SP if State Park.</Typography>}
                value={park}
                onChange={(event) => setPark(event.target.value)}
                size="small"
                variant="filled"
                required />
            <TextField
                label="Price/night"
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                size="small"
                variant="filled"
                required />
            <TextField
                label="Firewood price/bundle"
                type="number"
                value={firewood}
                onChange={(event) => setFirewood(event.target.value)}
                size="small"
                variant="filled"
                required />
            <TextField
                label="Distance in hours"
                type="number"
                value={distance}
                onChange={(event) => setDistance(event.target.value)}
                size="small"
                variant="filled"
                required />
            <TextField
                label="Curvy?"
                value={curvy}
                helperText={<Typography>Short description OK</Typography>}
                onChange={(event) => setCurvy(event.target.value)}
                size="small"
                variant="filled"
                required />
            <TextField
                label="When to Reserve"
                type="number"
                helperText={<Typography>in months</Typography>}
                value={reserve}
                onChange={(event) => setReserve(event.target.value)}
                size="small"
                variant="filled"
                required />
            <TextField
                label="Website"
                value={web}
                onChange={(event) => setWeb(event.target.value)}
                size="small"
                variant="filled"
                required />
            <TextField
                label="General Area"
                value={area}
                onChange={(event) => setArea(event.target.value)}
                size="small"
                variant="filled"
                required />
            <TextField
                label="Picture web address"
                value={picture}
                helperText={<Typography>Link to the picture, must end in a picture file extension</Typography>}
                onChange={(event) => setPicture(event.target.value)}
                size="small"
                variant="filled"
                required />
            <Typography textAlign="center" sx={{ m: 1 }}>
                <Button type="submit" variant="contained" sx={{ textTransform: "none" }}>
                    Submit
                </Button>
            </Typography>
            <Typography textAlign="center" sx={{ m: 1 }}>
                <Button onClick={() => navigate("/account")} variant="contained" sx={{ textTransform: "none" }}>
                    Cancel
                </Button>
            </Typography>
        </form>
    )
}
export default NewCampground;