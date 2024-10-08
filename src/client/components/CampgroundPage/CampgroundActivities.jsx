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

import { usePostActivityMutation, useDeleteActivityMutation } from "../../redux/api";

const CampgroundActivities = ({activities, token}) => {
    const [deleteActivity, {error, isLoading}] = useDeleteActivityMutation();
    const [postActivity] = usePostActivityMutation();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    
}
export default CampgroundActivities;