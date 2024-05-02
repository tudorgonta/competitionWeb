
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Box, CircularProgress, Paper } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, loading: topLoading }) => {

    const theme = useTheme();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
            {topLoading ? (
            <Box
                sx={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0,0,0,0.5)",
                    zIndex: "100",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress />
            </Box>
            ) : (
            <Paper
                data-mui-color-scheme={theme.palette.mode}
                elevation={0}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "calc(100vh - 80px)",
                    justifyContent: "space-between",
                    maxWidth: "100vw",
                    backgroundColor:
                        theme.palette.mode === "dark"
                        ? "primary.backgroundPaperDark"
                        : "primary.four",
                    padding: "0",
                    paddingTop: "80px",
                    margin: "0px",

                    "@media (max-width: 900px)": {
                        paddingTop: "92px",
                    },
                }}
            >
                <Header/>
                <Box component="main">{children}</Box>
                <Footer />
            </Paper>
            )}
        </>
    );
};

export default Layout;
