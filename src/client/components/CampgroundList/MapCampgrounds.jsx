import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

import { Link } from 'react-router-dom';
import { useGetAllCampgroundsQuery } from '../../redux/api';

const MapCampgrounds = () => {
    const { data, error, isLoading } = useGetAllCampgroundsQuery();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    return (
        <>
            {data && data.map((campground) => (
                <ImageListItem key={campground.id} sx={{ m: 1 }}>
                    <img src={campground.picture} alt={campground.park} />
                    <ImageListItemBar
                        title={campground.park}
                        subtitle={campground.generalArea}
                        actionIcon={
                            <Link to={`/campground/${campground.id}`}>
                                <IconButton color='success'>
                                    <InfoIcon />
                                </IconButton>
                            </Link>
                        } />
                </ImageListItem>
            ))}
        </>
    )
}
export default MapCampgrounds;