import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Switch from '@mui/material/Switch';

import { useState } from "react";
import MapUnpackedClothing from "./MapUnpackedClothing";
import MapAllClothing from "./MapAllClothing";

const ClothingList = () => {
    const [unpacked, setUnpacked] = useState(false)
    //TODO: filter by packed status - unpacked or all
    return (
        <div>
            <Stack direction="row">
                <Typography variant="h3" sx={{ color: "bisque" }}>
                    Clothing
                </Typography>
                <Switch
                    defaultChecked={unpacked}
                    onChange={() => {setUnpacked(!unpacked)}} />
                <Typography>Unpacked only</Typography>
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