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

    const year = format(new Date(data.start), "yyyy");
    const start = format(new Date(data.start), "MMMM d");
    const end = format(new Date(data.end), "MMMM d");

    return (
        <div>
            <Stack direction="row">
                <Typography variant="h1">
                    {year}
                </Typography>
                <Typography variant="h4">
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
                        <Typography>Current</Typography>
                    </>
                }
            </Stack>
            <Link to={`/campgrounds/${data.campgroundId}`}>
                <Typography variant="h3">
                    {data.campground.park}
                </Typography>
            </Link>
            <Grid container>
                <Grid item xs={6}> {/* costs */}
                    <Card>
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
                    <Card>
                        
                    </Card>
                </Grid>
                <Grid item xs={4}> {/* meals */}
                    
                </Grid>
            </Grid>
        </div>
    )
}

export default TripPage