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
    const [price, setPrice] = useState("");
    const [firewood, setFirewood] = useState("");
    const [distance, setDistance] = useState("");
    const [curvy, setCurvy] = useState("");
    const [reserve, setReserve] = useState("");
    const [web, setWeb] = useState("");
    const [area, setArea] = useState("");
    const [picture, setPicture] = useState("");

    const [postCampground, { error, isLoading }] = usePostCampgroundMutation();

    if (isLoading) {
        return <div></div>;
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
        <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={8}>
                <Typography variant="h2" sx={{ mb: 1, color: "bisque" }}>
                    New Campground
                </Typography>
                <Card sx={{ backgroundColor: "linen", m: 2, p: 2 }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Park Name"
                            helperText="Please include NP if National Park or SP if State Park."
                            value={park}
                            onChange={(event) => setPark(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ mx: 2, my: 1 }}
                            required />
                        <TextField
                            label="Price/night"
                            type="number"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ mx: 2, my: 1 }}
                            required />
                        <TextField
                            label="Firewood price/bundle"
                            type="number"
                            value={firewood}
                            onChange={(event) => setFirewood(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ mx: 2, my: 1 }}
                            required />
                        <TextField
                            label="Distance in hours"
                            type="number"
                            value={distance}
                            onChange={(event) => setDistance(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ mx: 2, my: 1 }}
                            required />
                        <TextField
                            label="Curvy?"
                            value={curvy}
                            helperText="Short description OK"
                            onChange={(event) => setCurvy(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ mx: 2, my: 1 }}
                            required />
                        <TextField
                            label="When to Reserve"
                            type="number"
                            helperText="in months"
                            value={reserve}
                            onChange={(event) => setReserve(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ mx: 2, my: 1 }}
                            required />
                        <TextField
                            label="Website"
                            value={web}
                            onChange={(event) => setWeb(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ mx: 2, my: 1 }}
                            required />
                        <TextField
                            label="General Area"
                            value={area}
                            onChange={(event) => setArea(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ mx: 2, my: 1 }}
                            required />
                        <TextField
                            label="Picture web address"
                            value={picture}
                            helperText="Link to the picture, must end in a picture file extension"
                            onChange={(event) => setPicture(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ mx: 2, my: 1 }}
                            required />
                        <Typography textAlign="center">
                            <Button type="submit" variant="contained" color="success" sx={{ textTransform: "none", m: 1 }}>
                                Submit
                            </Button>
                            <Button
                                onClick={() => navigate("/campgrounds")}
                                variant="contained"
                                sx={{ textTransform: "none", m: 1, backgroundColor: "sienna", ":hover": { backgroundColor: "saddlebrown" } }}>
                                Cancel
                            </Button>
                        </Typography>
                    </form>
                </Card>
            </Grid>
            <Grid item xs={1}></Grid>
        </Grid>
    )
}
export default NewCampground;