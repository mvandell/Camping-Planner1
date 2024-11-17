import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Checkbox from '@mui/material/Checkbox';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"

import format from 'date-fns/format'
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TripPageBody from "./TripPageBody"

import { useGetSingleTripQuery, usePatchTripCurrentToggleMutation} from "../../redux/api";
import { usePatchTripMealAddMutation, usePatchTripMealRemoveMutation } from "../../redux/api";

const TripPage = () => {
    const { id } = useParams();
    const token = useSelector((state) => state.auth.token)
    const navigate = useNavigate();

    const { data, error, isLoading } = useGetSingleTripQuery(id);
    const [currentToggle] = usePatchTripCurrentToggleMutation();
    // const [addMeal] = usePatchTripMealAddMutation();
    // const [removeMeal] = usePatchTripMealRemoveMutation();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
    //TODO: add meal - new page
    //TODO: remove meal?
    const year = format(new Date(data.startDate), "yyyy");
    const start = format(new Date(data.startDate), "MMMM d");
    const end = format(new Date(data.endDate), "MMMM d");

    return (
        <div style={{ marginTop: "1%" }}>
            <Stack direction="row" >
                <Typography variant="h1" >
                    {year}
                </Typography>
                <Box>
                    <Typography variant="h4" sx={{ color: "#CE853B" }}>
                        {start} - {end}
                    </Typography>
                    {token &&
                        <Stack direction="row">
                            <Checkbox
                                defaultChecked={data.current}
                                onChange={async () => {
                                    console.log("toggle current");
                                    const response = await currentToggle({ id: data.id, current: !current });
                                    console.log("current", response);
                                }} />
                            <Typography sx={{ color: "#CE853B", my: 1 }}>Current</Typography>
                        </Stack>
                    }
                </Box>
            </Stack>
            <Stack direction="row">
                <Link to={`/campgrounds/${data.campgroundId}`}>
                    <Typography variant="h2" id="park">
                        {data.campground.park}
                    </Typography>
                </Link>
                <Button
                    variant="contained"
                    color="warning"
                    sx={{ m: 2, fontWeight: "bold", ml: 3 }}
                    onClick={() => navigate(`/trip/${data.id}/edit`)}>
                    Edit Trip
                </Button>
            </Stack>
            <TripPageBody data={data}/>
        </div>
    )
}

export default TripPage