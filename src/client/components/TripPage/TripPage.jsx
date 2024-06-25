import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Alert from "@mui/material/Alert";
import Checkbox from '@mui/material/Checkbox';
import Box from "@mui/material/Box";

import format from 'date-fns/format'
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useGetSingleTripQuery, usePatchTripMutation } from "../../redux/api";
import { usePatchTripCurrentToggleMutation, usePatchTripMealAddMutation, usePatchTripMealRemoveMutation } from "../../redux/api";

const TripPage = () => {
    const { id } = useParams();
    const token = useSelector((state) => state.auth.token)

    const { data, error, isLoading } = useGetSingleTripQuery(id);
    //const [patchTrip] = usePatchTripMutation();
    const [currentToggle] = usePatchTripCurrentToggleMutation();
    // const [addMeal] = usePatchTripMealAddMutation();
    // const [removeMeal] = usePatchTripMealRemoveMutation();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    const year = format(new Date(data.startDate), "yyyy");
    const start = format(new Date(data.startDate), "MMMM d");
    const end = format(new Date(data.endDate), "MMMM d");

    return (
        <div>
            <Stack direction="row">
                <Typography variant="h1">
                    {year}
                </Typography>
                <Typography variant="h4" sx={{color: "bisque"}}>
                    {start} - {end}
                </Typography>
                {token &&
                    <>
                        <Checkbox
                            defaultChecked={data.current}
                            onChange={async () => {
                                console.log("toggle current");
                                const response = await currentToggle({ id: data.id, current: !current });
                                console.log("current", response);
                            }} />
                        <Typography sx={{color: "bisque"}}>Current</Typography>
                    </>
                }
            </Stack>
            <Link to={`/campgrounds/${data.campgroundId}`}>
                <Typography variant="h3" className="park">
                    {data.campground.park}
                </Typography>
            </Link>
            <Grid container>
                <Grid item xs={6}> {/* costs */}
                    <Card sx={{ m: 1, p: 1 }}>
                        <Typography variant="h5">
                            Total Costs
                        </Typography>
                        <Typography>
                            <b>Gas:</b> ${data.gasTotal}
                        </Typography>
                        <Typography>
                            <b>Parking:</b> ${data.parking}
                        </Typography>
                        {data.budgets && data.budgets.map((budget) => (
                            <Typography key={budget.id}>
                                <b>{budget.name}:</b> ${budget.total}
                            </Typography>
                        ))}
                    </Card>
                    <Card sx={{ m: 1, p: 1 }}>
                        <Typography variant="h5">
                            Individual Costs
                        </Typography>
                        <Typography>
                            <b>Gas:</b> ${data.gasSingle}
                        </Typography>
                        <Typography>
                            <b>Firewood:</b> ${data.fireNight}
                        </Typography>
                        <Typography>
                            <b>Parking:</b> ${data.parking/3}
                        </Typography>
                        {data.budgets && data.budgets.map((budget) => (
                            <Typography key={budget.id}>
                                <b>{budget.name}:</b> ${budget.individual}
                            </Typography>
                        ))}
                    </Card>
                </Grid>
                <Grid item xs={4}> {/* meals */}
                    <Typography variant="h4" sx={{color: "bisque"}}>
                        Meals
                    </Typography>
                    {data.meals && data.meals.slice().sort(function(a, b){return a.day-b.day}).map((meal) => (
                        <Card key={meal.id} sx={{ m: 1, p: 1 }}>
                            <Typography variant="h6">
                                {meal.course} Day {meal.day}
                            </Typography>
                            <Typography variant="h5">
                                {meal.name}
                            </Typography>
                        </Card>
                    ))}
                </Grid>
            </Grid>
        </div>
    )
}

export default TripPage