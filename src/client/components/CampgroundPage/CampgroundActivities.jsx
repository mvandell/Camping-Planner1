import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box";
import CircleIcon from '@mui/icons-material/Circle';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import TextField from "@mui/material/TextField";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

import { useState } from "react";
import { useDeleteActivityMutation, usePostActivityMutation } from "../../redux/api";
import NewActivity from "./NewActivity";

const CampgroundActivities = ({ activities, token }) => {
    const [name, setName] = useState("");
    const [alert, setAlert] = useState(false);
//FIXME: too many re-renders - hooks
    // const [deleteActivity] = useDeleteActivityMutation();
    // const [postActivity] = usePostActivityMutation();

    // if (isLoading) {
    //     return <div> </div>;
    // }
    // if (error) {
    //     return <div>Error:{error.message}</div>;
    // }
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await postActivity({ name: name });
            setAlert(false)
        } catch (error) {
            console.error(error)
        }
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
                <>
                    <IconButton onClick={setAlert(true)} color="info">
                        <AddIcon />
                    </IconButton>
                    {alert &&
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="New Activity"
                                value={name}
                                size="small"
                                sx={{ m: 1 }}
                                onChange={(event) => setName(event.target.value)} />
                            <IconButton type="submit" color="success">
                                <CheckIcon fontSize="small" />
                            </IconButton>
                            <IconButton onClick={setAlert(false)} color="error">
                                <ClearIcon fontSize="small" />
                            </IconButton>
                        </form>
                    }
                </>
            }
        </Card>
    )
}
export default CampgroundActivities;