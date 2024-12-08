import { Box, Stack, Paper } from "@mui/material";
import '../../css/Services.css';
import ChatApplication from "./ChatApplication";
import FileUpload from "./FileUpload";
import { FileProvider } from "../../store/Sample-context";

const Services = () => {
    return (
        <Box className="boxContainer">
            <FileProvider>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }} // Column for small screens, row for larger screens
                    spacing={3}
                    className="fileContainer"
                >
                    <Paper elevation={10} className="paperContainer">
                        <FileUpload />
                    </Paper>
                    <Paper elevation={10} className="paperContainerChat">
                        <ChatApplication />
                    </Paper>
                </Stack>
            </FileProvider>
           
        </Box>
    )
}

export default Services;
