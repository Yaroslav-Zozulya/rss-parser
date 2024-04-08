import { Box, Typography } from "@mui/material";
import { FC } from "react";

const NotFound: FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h2">Not Found</Typography>
    </Box>
  );
};

export default NotFound;
