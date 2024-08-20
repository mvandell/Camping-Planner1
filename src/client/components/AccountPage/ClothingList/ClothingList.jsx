import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Switch from '@mui/material/Switch';

import { useState } from "react";
import MapUnpackedClothing from "./MapUnpackedClothing";
import MapAllClothing from "./MapAllClothing";

const ClothingList = () => {
    const [unpacked, setUnpacked] = useState(false);

    return (
        <div>
            <Stack direction="row">
                <Typography variant="h3" sx={{ color: "bisque", mr: 5 }}>
                    Clothing
                </Typography>
                <Switch
                    defaultChecked={unpacked}
                    sx={{backgroundColor: "#B2702E", borderRadius: 5}}
                    onChange={() => {setUnpacked(!unpacked)}} />
                <Typography sx={{color: "beige", py: 1, ml: 1}}>Unpacked only</Typography>
            </Stack>
            {unpacked ?
                <div>
                    <MapUnpackedClothing />
                </div>
                :
                <div>
                    <MapAllClothing />
                </div>
            }
        </div>
    )
}
export default ClothingList;