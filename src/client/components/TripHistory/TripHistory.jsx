import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import format from 'date-fns/format'
import { useGetAllTripsQuery } from "../../redux/api";

const TripHistory = () => {
    const {data, error, isLoading} = useGetAllTripsQuery();
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
            {data && data.map((trip) => (
                <Card key={trip.id} sx={{m: 1}}>
                    {/* campground name and dates */}
                    {trip.current &&
                        <Typography variant="h4">
                            Current
                        </Typography>
                    }
                    <Typography>
                        {format(new Date(trip.startDate), "MMMM d")} - {format(new Date(trip.endDate), "MMMM d, yyyy")}
                    </Typography>
                    <Typography>
                        {trip.campground.park}
                    </Typography>
                </Card>
            ))}
        </div>
    )
}

export default TripHistory