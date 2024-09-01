import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

import { Link } from 'react-router-dom';
import { useGetAllCampgroundsQuery } from '../../redux/api';

const SortCampgroundsReserve = ({ type }) => {
    const { data, error, isLoading } = useGetAllCampgroundsQuery();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
console.log("SortCampgroundsReserve")
    return (
        <>
            {data && data.slice().sort((a, b) => { type == 1 ? a.reserveFrame - b.reserveFrame : b.reserveFrame - a.reserveFrame }).map((campground) => (
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
        </>
    )
}
export default SortCampgroundsReserve;