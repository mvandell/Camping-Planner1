import ImageList from '@mui/material/ImageList';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import Stack from "@mui/material/Stack"

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetAllCampgroundsQuery, useGetAdminQuery } from '../../redux/api';

import MapCampgrounds from './MapCampgrounds';

const CampgroundList = () => {
    const token = useSelector((state) => state.auth.token)
    const navigate = useNavigate();

    const { data, error, isLoading } = useGetAllCampgroundsQuery();
    const { data: adminData, error: adminError, isLoading: adminIsLoading } = useGetAdminQuery();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
    //QUESTION: sort by reserveFrame and generalArea?
    //sort not working cuz of masonry
        //filter would work
        //could add reserveFrame to subtitle
        //could have a "separate" sort page with a plain list - no masonry 
    //use cases
        //know generalArea, need to pick a campground
        //not sure where to go, need to decide - more likely

    return (
        <div>
            <Stack direction="row">
                <Typography variant='h1'>
                    Campgrounds
                </Typography>
                {token && adminData.isAdmin === true &&
                    <IconButton
                        color='warning'
                        onClick={() => navigate("/campgrounds/new/post")}>
                        <AddLocationAltIcon sx={{ fontSize: 75 }} />
                    </IconButton>
                }
            </Stack>
            <Box sx={{ height: "80vh", overflowY: "scroll" }}>
                <ImageList variant='masonry'>
                    <MapCampgrounds />
                </ImageList>
            </Box>
        </div>
    )
}
export default CampgroundList