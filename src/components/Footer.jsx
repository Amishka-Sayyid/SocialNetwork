import { Box, Typography } from "@mui/material";
export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#cfaea2",
        minHeight: "10vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.25rem",
        padding: "0.5rem",
        width: "100%",
      }}
    >
      <Typography variant="h5" sx={{ color: "white" }}>
        2025
      </Typography>
    </Box>
  );
}
