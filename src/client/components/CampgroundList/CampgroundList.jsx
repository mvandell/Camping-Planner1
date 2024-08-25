import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import Stack from "@mui/material/Stack"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PlaceIcon from '@mui/icons-material/Place';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SortIcon from '@mui/icons-material/Sort';
import ClearIcon from '@mui/icons-material/Clear';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import { useGetAllCampgroundsQuery, useGetAdminQuery } from '../../redux/api';

const CampgroundList = () => {
    const token = useSelector((state) => state.auth.token)
    const navigate = useNavigate();

    const [sort, setSort] = useState(0);

    const { data, error, isLoading } = useGetAllCampgroundsQuery();
    const { data: adminData, error: adminError, isLoading: adminIsLoading } = useGetAdminQuery();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
    const handleSort = (event, newSort) => {
        setSort(newSort);
    }
    //TODO: sort by reserveFrame and generalArea
    //switch case or 
    //nested if/else or ternary
    //variables a=b, b=a
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
            <ToggleButtonGroup
                value={sort}
                exclusive
                onChange={handleSort}
                sx={{ backgroundColor: "ivory", m: 1 }}
                aria-label='sort'>
                  <ToggleButton value={0} aria-label='no sort'>
                    <SortIcon fontSize='small'/> <ClearIcon fontSize='small'/>
                </ToggleButton>   
                <ToggleButton value={1} aria-label='reserve increasing'>
                    <BookOnlineIcon fontSize='small'/> <ArrowUpwardIcon fontSize='small'/>
                </ToggleButton>
                <ToggleButton value={2} aria-label='reserve decreasing'>
                    <BookOnlineIcon fontSize='small'/> <ArrowDownwardIcon fontSize='small'/>
                </ToggleButton>
                <ToggleButton value={3} aria-label='area increasing'>
                    <PlaceIcon fontSize='small'/> <ArrowUpwardIcon fontSize='small'/>
                </ToggleButton>
                <ToggleButton value={4} aria-label='area decreasing'>
                    <PlaceIcon fontSize='small'/> <ArrowDownwardIcon fontSize='small'/>
                </ToggleButton>
            </ToggleButtonGroup>
            <Box sx={{ height: "80vh", overflowY: "scroll" }}>
                <ImageList variant='masonry'>
                    {data && data.map((campground) => (
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