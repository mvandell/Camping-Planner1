import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ForestIcon from '@mui/icons-material/Forest';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";

import format from 'date-fns/format';
import { Link } from "react-router-dom";
import { useGetAllTripsQuery, useGetAdminQuery, useDeleteTripMutation } from "../../redux/api";

const TripHistory = () => {
    const { data, error, isLoading } = useGetAllTripsQuery();
    const { data: adminData, error: adminError, isLoading: adminIsLoading } = useGetAdminQuery();
    const [deleteTrip] = useDeleteTripMutation();

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
                        <Card key={trip.id} sx={{ m: 1, p: 1, backgroundColor: "linen" }}>
                            {trip.current && //campground name and dates
                                <Typography variant="h4">
                                    Current
                                </Typography>
                            }
                            <Stack direction="row">
                                {adminData.isAdmin === true &&
                                    <IconButton
                                        color="error"
                                        sx={{ p: 0, pr: 1 }}
                                        onClick={() => {
                                            if (confirm("Are you sure you want to delete this trip?") === true) {
                                                deleteTrip(trip.id)
                                            }
                                        }}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                }
                                <Link to={`/trip/${trip.id}`}>
                                    <Typography sx={{ fontWeight: "bold" }}>
                                        {format(new Date(trip.startDate), "MMMM d")} - {format(new Date(trip.endDate), "MMMM d, yyyy")}
                                    </Typography>
                                </Link>
                            </Stack>
                            <Link to={`/campgrounds/${trip.campgroundId}`}>
                                <Typography>
                                    {trip.campground.park}
                                </Typography>
                            </Link>

                            <ForestIcon sx={{ mx: 6 }} fontSize="large" color="success" />
                        </Card>
                    ))}
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        </div>
    )
}

export default TripHistory