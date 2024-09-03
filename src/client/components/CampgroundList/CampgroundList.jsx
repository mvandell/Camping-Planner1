import ImageList from '@mui/material/ImageList';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import Stack from "@mui/material/Stack"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Radio from '@mui/material/Radio';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PlaceIcon from '@mui/icons-material/Place';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SortIcon from '@mui/icons-material/Sort';
import ClearIcon from '@mui/icons-material/Clear';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useGetAllCampgroundsQuery, useGetAdminQuery } from '../../redux/api';

import MapCampgrounds from './MapCampgrounds';
import SortCampgroundsArea from './SortCampgroundsArea';
import SortCampgroundsReserve from './SortCampgroundsReserve';

const CampgroundList = () => {
    const token = useSelector((state) => state.auth.token)
    const navigate = useNavigate();

    const [sort, setSort] = useState("0");

    const { data, error, isLoading } = useGetAllCampgroundsQuery();
    const { data: adminData, error: adminError, isLoading: adminIsLoading } = useGetAdminQuery();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
    const handleSort = (event) => {
        setSort(event.target.value);
    }
    //TODO: sort by reserveFrame and generalArea
    //sort not working cuz of masonry
        //filter would work
        //could add reserveFrame to subtitle
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
            {/* <ToggleButtonGroup
                value={sort}
                exclusive
                onChange={handleSort}
                sx={{ backgroundColor: "ivory", m: 1 }}
                aria-label='sort'>
                <ToggleButton value="0" aria-label='no sort'>
                    <SortIcon fontSize='small' /> <ClearIcon fontSize='small' />
                </ToggleButton>
                <ToggleButton value="1" aria-label='reserve increasing'>
                    <BookOnlineIcon fontSize='small' /> <ArrowUpwardIcon fontSize='small' />
                </ToggleButton>
                <ToggleButton value="2" aria-label='reserve decreasing'>
                    <BookOnlineIcon fontSize='small' /> <ArrowDownwardIcon fontSize='small' />
                </ToggleButton>
                <ToggleButton value="3" aria-label='area increasing'>
                    <PlaceIcon fontSize='small' /> <ArrowUpwardIcon fontSize='small' />
                </ToggleButton>
                <ToggleButton value="4" aria-label='area decreasing'>
                    <PlaceIcon fontSize='small' /> <ArrowDownwardIcon fontSize='small' />
                </ToggleButton>
            </ToggleButtonGroup> */}
            <form onChange={handleSort}>
                <label>
                    <SortIcon fontSize='small' /> <ClearIcon fontSize='small' />
                    <input type='radio' value={0} name='sorting'/>
                </label>
                <label>
                    <BookOnlineIcon fontSize='small' /> <ArrowUpwardIcon fontSize='small' />
                    <input type='radio' value={1} name='sorting'/>
                </label>
                <label>
                    <BookOnlineIcon fontSize='small' /> <ArrowDownwardIcon fontSize='small' />
                    <input type='radio' value={2} name='sorting'/>
                </label>
                <label>
                    <PlaceIcon fontSize='small' /> <ArrowUpwardIcon fontSize='small' />
                    <input type='radio' value={3} name='sorting'/>
                </label>
                <label>
                    <PlaceIcon fontSize='small' /> <ArrowDownwardIcon fontSize='small' />
                    <input type='radio' value={4} name='sorting'/>
                </label>
            </form>
            <Box sx={{ height: "80vh", overflowY: "scroll" }}>
                <ImageList variant='masonry'>
                    <>
                        {
                            (sort == 1 || sort == 2) ? <SortCampgroundsReserve type={sort} />
                                : (sort == 3 || sort == 4) ? <SortCampgroundsArea type={sort} />
                                    : <MapCampgrounds />
                        }
                    </>
                </ImageList>
            </Box>
        </div>
    )
}
export default CampgroundList