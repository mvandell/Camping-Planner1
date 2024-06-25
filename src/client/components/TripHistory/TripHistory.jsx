import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import format from 'date-fns/format';
import { Link } from "react-router-dom";
import { useGetAllTripsQuery } from "../../redux/api";

const TripHistory = () => {
    const { data, error, isLoading } = useGetAllTripsQuery();
    console.log(data)
    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    return (
        <div>
            <Typography variant="h1">
                Trip History
            </Typography>
            <Grid container>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    {data && data.map((trip) => (
                        <Card key={trip.id} sx={{ m: 1, p: 1 }}>
                            {/* campground name and dates */}
                            {trip.current &&
                                <Typography variant="h4">
                                    Current
                                </Typography>
                            }
                            <Link to={`/trip/${trip.id}`}>
                                <Typography>
                                    {format(new Date(trip.startDate), "MMMM d")} - {format(new Date(trip.endDate), "MMMM d, yyyy")}
                                </Typography>
                            </Link>
                            <Link to={`/campgrounds/${trip.campgroundId}`}>
                                <Typography>
                                    {trip.campground.park}
                                </Typography>
                            </Link>
                        </Card>
                    ))}
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        </div>
    )
}

export default TripHistory