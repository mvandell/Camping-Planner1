import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetAllCampgroundsQuery } from '../../redux/api';

const CampgroundList = () => {
    const token = useSelector((state) => state.auth.token)

    const { data, error, isLoading } = useGetAllCampgroundsQuery();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
    //TODO: filters for reserveFrame and generalArea
    //TODO: post campground
    return (
        <div>
            <Typography variant='h1'>
                Campgrounds
            </Typography>
            <Box sx={{height: "85vh", overflowY: "scroll"}}>
            <ImageList variant='masonry'>
                {data && data.map((campground) => ( //scrollable
                    <ImageListItem key={campground.id} sx={{ m: 1 }}>
                        <img src={campground.picture} alt={campground.park} />
                        <ImageListItemBar
                            title={campground.park}
                            subtitle={campground.generalArea}
                            actionIcon={
                                <Link to={`/campgrounds/${campground.id}`}>
                                    <IconButton color='success'>
                                        <InfoIcon />
                                    </IconButton>
                                </Link>
                            } />
                    </ImageListItem>
                ))}
            </ImageList>
            </Box>
        </div>
    )
}
export default CampgroundList