import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"
import Alert from "@mui/material/Alert";

import { useState } from "react";
import { useSelector } from "react-redux";

import { useGetSingleCampgroundQuery, usePatchCampgroundMutation } from "../../redux/api";
import { usePatchCampgroundActivityAddMutation, usePatchCampgroundActivityRemoveMutation } from "../../redux/api";

const CampgroundPage = () => {
    const token = useSelector((state) => state.auth.token)

    const { data, error, isLoading } = useGetSingleCampgroundQuery();

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
                        <img src={data.picture} alt={data.name} />
                    </Card>
                    <Grid container>
                        <Grid item>
                            <Card>
                                <Typography>
                                    <b>General Area:</b> {data.generalArea}
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card>
                                <Typography>
                                    <b>Price/night:</b> ${data.price}
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card>
                                <Typography>
                                    <b>When to Reserve:</b> {data.reserveFrame} months
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card>
                                <Typography>
                                    <b>Firewood Price:</b> ${data.firewood}
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}> {/* activities and drive info */}
                    <Card>
                        <Typography>
                            Activities
                        </Typography>
                        {data.activities && data.activities.map((activity) => (
                            <Card key={activity.id} sx={{ p: 1, m: 1 }}>
                                <Typography>{activity.name}</Typography>
                            </Card>
                        ))}
                    </Card>
                    <Card>
                        <Typography>
                            Drive Info
                        </Typography>
                        <Typography>
                            Curvy: {data.curvy}
                        </Typography>
                        <Typography>
                            Distance: {data.distance} hrs
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default CampgroundPage