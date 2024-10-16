import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box";
import CircleIcon from '@mui/icons-material/Circle';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

import { usePostActivityMutation, useDeleteActivityMutation } from "../../redux/api";
import NewActivity from "./NewActivity";

const CampgroundActivities = ({ activities, token }) => {
    const [deleteActivity, { error, isLoading }] = useDeleteActivityMutation();
    const [postActivity] = usePostActivityMutation();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    return (
        <Card sx={{ m: 1, p: 1, backgroundColor: "linen" }}>
            <Typography variant="h5" fontWeight="bold">
                Activities
            </Typography>
            {activities && activities.map((activity) => (
                <Box key={activity.id} sx={{ m: 1 }}>
                    <Stack direction="row">
                        {token &&
                            <IconButton
                                onClick={() => {
                                    if (confirm("Are you sure you want to delete this activity from this campground?") === true) {
                                        deleteActivity(activity.id)
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
            {token &&
                <NewActivity />
            }
        </Card>
    )
}
export default CampgroundActivities;