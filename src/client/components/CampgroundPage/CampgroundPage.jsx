import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useGetSingleCampgroundQuery, useDeleteCampgroundMutation } from "../../redux/api";
import CampgroundInfo from "./CampgroundInfo.jsx"
import CampgroundActivities from "./CampgroundActivities.jsx";

const CampgroundPage = () => {
    const token = useSelector((state) => state.auth.token)
    const { id } = useParams();

    const { data, error, isLoading } = useGetSingleCampgroundQuery(id);

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
    //TODO: post activities
    //TODO: break up into more components

    return (
        <div>
            <Typography variant="h1">
                <a href={data.website} target="_blank" id="parkTitle">{data.park}</a>
            </Typography>
            <Grid container>
                <CampgroundInfo data={data} />
                <Grid item xs={6}> {/* activities and drive info */}
                    <CampgroundActivities activities={data.activities} token={token} />
                    <Card sx={{ m: 1, p: 1, backgroundColor: "linen" }}>
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                            Drive Info
                        </Typography>
                        <Typography>
                            <b>Curvy:</b> {data.curvy}
                        </Typography>
                        <Typography>
                            <b>Distance:</b> {data.distance} hrs
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default CampgroundPage