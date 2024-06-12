import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"
import Alert from "@mui/material/Alert";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useGetSingleCampgroundQuery, usePatchCampgroundMutation } from "../../redux/api";
import { usePatchCampgroundActivityAddMutation, usePatchCampgroundActivityRemoveMutation } from "../../redux/api";

const CampgroundPage = () => {
    const token = useSelector((state) => state.auth.token)
    const {id} = useParams();

    const { data, error, isLoading } = useGetSingleCampgroundQuery(id);

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    return (
        <div>
            <Typography variant="h1">
                <a href={data.website} target="_blank">{data.park}</a>
            </Typography>
            <Grid container>
                <Grid item xs={6}> {/* picture and info */}
                    <Card sx={{ m: 1, p: 3 }}>
                        <img src={data.picture} alt={data.park}/>
                    </Card>
                    <Grid container>
                        <Grid item>
                            <Card sx={{ m: 1, p: 1 }}>
                                <Typography>
                                    <b>General Area:</b> {data.generalArea}
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card sx={{ m: 1, p: 1 }}>
                                <Typography>
                                    <b>Price/night:</b> ${data.price}
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card sx={{ m: 1, p: 1 }}>
                                <Typography>
                                    <b>Reserve:</b> {data.reserveFrame} months ahead
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card sx={{ m: 1, p: 1 }}>
                                <Typography>
                                    <b>Firewood Price:</b> ${data.firewood}
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}> {/* activities and drive info */}
                    <Card sx={{ m: 1, p: 1 }}>
                        <Typography variant="h5" fontWeight="bold">
                            Activities
                        </Typography>
                        {data.activities && data.activities.map((activity) => (
                            <Box key={activity.id} sx={{ m: 1 }}>
                                <Typography>{activity.name}</Typography>
                            </Box>
                        ))}
                    </Card>
                    <Card sx={{ m: 1, p: 1 }}>
                        <Typography variant="h5" fontWeight="bold" sx={{mb:1}}>
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