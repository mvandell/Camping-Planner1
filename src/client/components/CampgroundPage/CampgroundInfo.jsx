import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Button from '@mui/material/Button';

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useGetAdminQuery, useDeleteCampgroundMutation } from "../../redux/api";

const CampgroundInfo = ({data}) => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token)

    const { data: adminData, error: adminError, isLoading: adminIsLoading } = useGetAdminQuery();
    const [deleteCampground, {error, isLoading}] = useDeleteCampgroundMutation();
    
    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    return (
        <Grid item xs={6}> {/* picture and info */}
                    <Card sx={{ m: 1, p: 3, backgroundColor: "linen" }}>
                        <img src={data.picture} alt={data.park} />
                    </Card>
                    <Grid container>
                        <Grid item>
                            <Card sx={{ m: 1, p: 1, backgroundColor: "linen" }}>
                                <Typography>
                                    <b>General Area:</b> {data.generalArea}
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card sx={{ m: 1, p: 1, backgroundColor: "linen" }}>
                                <Typography>
                                    <b>Price/night:</b> ${data.price}
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card sx={{ m: 1, p: 1, backgroundColor: "linen" }}>
                                <Typography>
                                    <b>Reserve:</b> {data.reserveFrame} months ahead
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card sx={{ m: 1, p: 1, backgroundColor: "linen" }}>
                                <Typography>
                                    <b>Firewood Price:</b> ${data.firewood}
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>
                    {token && adminData.isAdmin === true &&
                        <>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ m: 1, fontWeight: "bold" }}
                                onClick={() => {
                                    if (confirm("Are you sure you want to delete this campground?") === true) {
                                        deleteCampground(data.id);
                                        navigate("/campgrounds");
                                    }
                                }}>
                                Delete Campground
                            </Button>
                            <Button
                                variant="contained"
                                color="warning"
                                sx={{ m: 1, fontWeight: "bold" }}
                                onClick={() => navigate(`/campgrounds/${data.id}/edit`)}>
                                Edit Campground
                            </Button>
                        </>
                    }
                </Grid>
    )
}
export default CampgroundInfo;