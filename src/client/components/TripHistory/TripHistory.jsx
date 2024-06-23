import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { useGetAllTripsQuery } from "../../redux/api";

const TripHistory = () => {
    const {data, error, isLoading} = useGetAllTripsQuery();

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
            {data && data.map((trip) => (
                <Card key={trip.id} sx={{m: 1}}>
                    {/* campground name and dates */}
                </Card>
            ))}
        </div>
    )
}

export default TripHistory