export const externalTheme = {
    palette: {
      primary: {
        dark: "#5933a0",
        main: "#8142F6",
        light: "#9879EC",
        third: "#2f2f2f",
        four: "#F6F6F6",
        fifth: "#121212",
        yellow: "#EDF67D",
        antiYellow: "#8142f6",
        backgroundPaperDark: "#0F0F15",
        searchbg: "#282828",
        searchbgHover: "#3b3b3b",
      },
    },
    typography: {
      fontFamily: ["Roboto Condensed", "sans-serif"].join(","),
    },
    components: {
      MuiCard: {
        variants: [
          {
            props: { variant: "gameCategory" },
            style: ({ theme }) => ({
              width: "130px",
              "@media (max-width: 1200px)": {
                width: "32%",
              },
              "@media (max-width: 800px)": {
                width: "48%",
              },
              // ...(theme.palette.mode === 'light' && {
              //     backgroundColor: '#f5f5f5',
              //     border: '2px solid #d1d1d1',
              // }),
              // ...(theme.palette.mode === 'dark' && {
              //     backgroundColor: '#333333',
              //     border: '2px solid #858585',
              // }),
            }),
          },
          {
            props: { variant: "customBackgroundCard" },
            style: ({ theme }) => ({
              boxShadow:
                "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
              ...(theme.palette.mode === "dark" && {
                backgroundColor: "#2b2b2b",
              }),
            }),
          },
          {
            props: { variant: "paymentMethod" },
            style: ({ theme }) => ({
              boxSizing: "border-box",
              borderRadius: "10px",
              width: "23%",
              height: "85px",
              boxShadow:
                "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
              ...(theme.palette.mode === "dark" && {
                backgroundColor: "#1e1e1e",
              }),
              ...(theme.palette.mode === "light" && {
                backgroundColor: "white",
                border: "1px solid primary.main",
              }),
              "@media (max-width: 700px)": {
                width: "48%",
              },
              "@media (max-width: 380px)": {
                width: "100%",
              },
            }),
          },
        ],
      },
      MuiSvgIcon: {
        variants: [
          {
            props: { variant: "largeScreenHeaderLogo" },
            style: ({ theme }) => ({
              ...(theme.palette.mode === "dark" && {
                color: "primary",
              }),
              ...(theme.palette.mode === "light" && {
                color: "rgba(0, 0, 0, 0.87)",
              }),
            }),
          },
        ],
      },
      MuiInputAdornment: {
        variants: [
          {
            props: { variant: "userSearchIcon" },
            style: ({ theme }) => ({
              cursor: "pointer",
              transition: "color 0.3s ease-out",
              ...(theme.palette.mode === "dark" && {
                "&:hover": {
                  color: "primary.main",
                },
              }),
              ...(theme.palette.mode === "light" && {
                "&:hover": {
                  color: "rgba(0, 0, 0, 0.87)",
                },
              }),
            }),
          },
        ],
      },
      MuiTypography: {
        variants: [
          {
            props: { variant: "sectionHeading" },
            style: ({ theme }) => ({
              fontFamily: "Roboto Condensed, sans-serif",
              fontSize: "1.15rem",
              fontWeight: "bold",
              letterSpacing: "0.00938em",
              opacity: "0.4",
              marginBottom: "0.5rem",
  
              ...(theme.palette.mode === "dark" && {
                color: "#fff",
              }),
              ...(theme.palette.mode === "light" && {
                color: "rgba(0, 0, 0, 0.87)",
              }),
            }),
          },
          {
            props: { variant: "addProductModalHeading" },
            style: ({ theme }) => ({
              fontFamily: "Roboto Condensed, sans-serif",
              color: `${theme.palette.text.primary}`,
            }),
          },
          {
            props: { variant: "withdrawModalHeading" },
            style: ({ theme }) => ({
              fontFamily: "Roboto Condensed, sans-serif",
              color: `${theme.palette.text.primary}`,
            }),
          },
          {
            props: { variant: "notificationModalText" },
            style: ({ theme }) => ({
              fontFamily: "Roboto Condensed, sans-serif",
              color: `${theme.palette.text.primary}`,
            }),
          },
          {
            props: { variant: "feedbackModalText" },
            style: ({ theme }) => ({
              fontFamily: "Roboto Condensed, sans-serif",
              color: `${theme.palette.text.primary}`,
            }),
          },
          {
            props: { variant: "contactSellerModalText" },
            style: ({ theme }) => ({
              fontFamily: "Roboto Condensed, sans-serif",
              color: `${theme.palette.text.primary}`,
            }),
          },
        ],
      },
      MuiButton: {
        variants: [
          {
            props: { variant: "subcategoryButton" },
            variant: "text",
            style: ({ theme }) => ({
              ...(theme.palette.mode === "dark" && {
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.main",
                },
              }),
            }),
          },
          {
            props: { variant: "vendorAddProductPicture" },
            variant: "contained",
            style: ({ theme }) => ({
              borderRadius: "10px",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "end",
              textTransform: "none",
              ...(theme.palette.mode === "dark" && {
                backgroundColor: "#8f8f8f",
                "&:hover": {
                  backgroundColor: "#8f8f8f",
                },
              }),
              ...(theme.palette.mode === "light" && {
                backgroundColor: "#bfbfbf",
                "&:hover": {
                  backgroundColor: "#a3a3a3",
                },
              }),
            }),
          },
        ],
      },
    },
};
  