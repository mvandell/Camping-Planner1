import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Button from '@mui/material/Button';
import CircleIcon from '@mui/icons-material/Circle';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { useGetSingleCampgroundQuery, useDeleteCampgroundMutation } from "../../redux/api";
import { usePatchCampgroundActivityAddMutation, usePatchCampgroundActivityRemoveMutation, useGetAdminQuery } from "../../redux/api";
import CampgroundInfo from "./CampgroundInfo.jsx"

const CampgroundPage = () => {
    const token = useSelector((state) => state.auth.token)
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, error, isLoading } = useGetSingleCampgroundQuery(id);
    const { data: adminData, error: adminError, isLoading: adminIsLoading } = useGetAdminQuery();
    const [deleteCampground] = useDeleteCampgroundMutation();
    const [removeActivity] = usePatchCampgroundActivityRemoveMutation();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
    //TODO: add/remove activities
    //TODO: break up into more components

    //remove activity table b/c not accessing specific activities
        //simpler to just add/remove specific activities
        //more specific
        //require user, not admin
    return (
        <div>
            <Typography variant="h1">
                <a href={data.website} target="_blank" id="parkTitle">{data.park}</a>
            </Typography>
            <Grid container>
                <CampgroundInfo data={data}/>
                <Grid item xs={6}> {/* activities and drive info */}
                    <Card sx={{ m: 1, p: 1, backgroundColor: "linen" }}>
                        <Typography variant="h5" fontWeight="bold">
                            Activities
                        </Typography>
                        {data.activities && data.activities.map((activity) => (
                            <Box key={activity.id} sx={{ m: 1 }}>
                                <Stack direction="row">
                                    {token && adminData.isAdmin === true &&
                                        <IconButton
                                            onClick={() => {
                                                if (confirm("Are you sure you want to remove this activity from this campground?") === true) {
                                                    removeActivity({activityId: Number(activity.id)})
                                                }
                                            }}
                                            color="error"
                                            sx={{ textTransform: "none", m: 0, p: 0, mr: 1 }}>
                                            <ClearIcon fontSize="small" />
                                        </IconButton>
                                    }
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