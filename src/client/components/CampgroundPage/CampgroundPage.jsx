import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Button from '@mui/material/Button';
import CircleIcon from '@mui/icons-material/Circle';

import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { useGetSingleCampgroundQuery, useDeleteCampgroundMutation } from "../../redux/api";
import { usePatchCampgroundActivityAddMutation, usePatchCampgroundActivityRemoveMutation, useGetAdminQuery } from "../../redux/api";

const CampgroundPage = () => {
    const token = useSelector((state) => state.auth.token)
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, error, isLoading } = useGetSingleCampgroundQuery(id);
    const { data: adminData, error: adminError, isLoading: adminIsLoading } = useGetAdminQuery();
    const [deleteCampground] = useDeleteCampgroundMutation();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
    //TODO: add/remove activities
    return (
        <div>
            <Typography variant="h1" sx={{ color: "beige" }}>
                <a href={data.website} target="_blank" className="park">{data.park}</a>
            </Typography>
            <Grid container>
                <Grid item xs={6}> {/* picture and info */}
                    <Card sx={{ m: 1, p: 3, backgroundColor: "linen" }}>
                        <img src={data.picture} alt={data.park} />
                    </Card>
                    <Grid container>
                        <Grid item>
                            <Card sx={{ m: 1, p: 1, backgroundColor: "linen" }}>
                                <Typography>
                                    <b>General Area:</b> {data.generalArea}
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card sx={{ m: 1, p: 1, backgroundColor: "linen" }}>
                                <Typography>
                                    <b>Price/night:</b> ${data.price}
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card sx={{ m: 1, p: 1, backgroundColor: "linen" }}>
                                <Typography>
                                    <b>Reserve:</b> {data.reserveFrame} months ahead
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card sx={{ m: 1, p: 1, backgroundColor: "linen" }}>
                                <Typography>
                                    <b>Firewood Price:</b> ${data.firewood}
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>
                    {token && adminData.isAdmin === true &&
                        <>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ m: 1, fontWeight: "bold" }}
                                onClick={() => {
                                    if (confirm("Are you sure you want to delete this campground?") === true) {
                                        deleteCampground(data.id);
                                        navigate("/campgrounds");
                                    }
                                }}>
                                Delete Campground
                            </Button>
                            <Button
                                variant="contained"
                                color="warning"
                                sx={{ m: 1, fontWeight: "bold" }}
                                onClick={() => navigate(`/campgrounds/${data.id}/edit`)}>
                                Edit Campground
                            </Button>
                        </>
                    }
                </Grid>
                <Grid item xs={6}> {/* activities and drive info */}
                    <Card sx={{ m: 1, p: 1, backgroundColor: "linen" }}>
                        <Typography variant="h5" fontWeight="bold">
                            Activities
                        </Typography>
                        {data.activities && data.activities.map((activity) => (
                            <Box key={activity.id} sx={{ m: 1 }}>
                                <Stack direction="row">
                                    <CircleIcon sx={{ fontSize: 9, p: 1 }} />
                                    <Typography>{activity.name}</Typography>
                                </Stack>
                            </Box>
                        ))}
                    </Card>
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