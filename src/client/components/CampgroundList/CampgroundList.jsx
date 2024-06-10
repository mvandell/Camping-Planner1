import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetAllCampgroundsQuery } from '../../redux/api';

const CampgroundList = () => {
    const token = useSelector((state) => state.auth.token)
    const navigate = useNavigate();

    const {data, error, isLoading} = useGetAllCampgroundsQuery();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
//TODO: filters for reserveFrame and generalArea
    return (
        <div>
            <Typography variant='h1'>
                Campgrounds
            </Typography>
            <ImageList>
                {data && data.map((campground) => (
                    <ImageListItem key={campground.id} onClick={navigate(`/`)}>
                        <img src={campground.picture} alt={campground.park}/>
                        <ImageListItemBar 
                            title={campground.name}
                            subtitle={campground.generalArea} />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    )
}
export default CampgroundList