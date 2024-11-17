import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';

import { Link } from "react-router-dom";

const TripPageBody = ({data}) => {
    return (
        <Grid container>
                <Grid item xs={6}> {/* costs */}
                    <Typography variant="h4" sx={{ color: "bisque" }}>
                        Costs
                    </Typography>
                    <Card sx={{ m: 1, p: 1, backgroundColor: "linen" }}>
                        <Typography variant="h5">
                            Total Costs
                        </Typography>
                        <Typography>
                            <b>Gas:</b> ${data.gasTotal}
                        </Typography>
                        <Typography>
                            <b>Parking:</b> ${data.parking}
                        </Typography>
                        {data.budgets && data.budgets.map((budget) => (
                            <Typography key={budget.id}>
                                <b>{budget.name}:</b> ${budget.total}
                            </Typography>
                        ))}
                    </Card>
                    <Card sx={{ m: 1, p: 1, backgroundColor: "linen" }}>
                        <Typography variant="h5">
                            Individual Costs
                        </Typography>
                        <Typography>
                            <b>Gas:</b> ${data.gasSingle}
                        </Typography>
                        <Typography>
                            <b>Firewood:</b> ${data.fireNight}
                        </Typography>
                        <Typography>
                            <b>Parking:</b> ${data.parking / 3}
                        </Typography>
                        {data.budgets && data.budgets.map((budget) => (
                            <Typography key={budget.id}>
                                <b>{budget.name}:</b> ${budget.individual}
                            </Typography>
                        ))}
                    </Card>
                </Grid>
                <Grid item xs={4}> {/* meals */} {/* TODO: tidy up meals, with links to only one breakfast and lunch */}
                    <Typography variant="h4" sx={{ color: "bisque" }}>
                        Meals
                    </Typography>
                    {data.meals && data.meals.map((meal) => (
                        <Card key={meal.id} sx={{ m: 1, p: 1, backgroundColor: "linen" }}>
                            <Typography variant="h6">
                                {meal.course}
                            </Typography>
                            <Typography variant="h5">
                                <Link to={`/meal/${meal.id}`}>
                                    {meal.name}
                                </Link>
                            </Typography>
                        </Card>
                    ))}
                </Grid>
            </Grid>
    )
}
export default TripPageBody;