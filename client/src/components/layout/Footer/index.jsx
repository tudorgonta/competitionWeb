import {
    Box,
    Container,
    Typography,
    useTheme,
  } from "@mui/material";
  
  import styles from "./styles.module.css";
  import { LogoNew } from "../../logo/LogoNew";
  import { Link } from "react-router-dom";
  import FOOTER_LINKS from "./constants";
  
  const Footer = () => {
  
    const theme = useTheme();
  
    const { main } = FOOTER_LINKS;
  
    return (
      <Box
        data-mui-color-scheme={theme.palette.mode}
        className={styles.footer}
        component="footer"
      >
        <Container className={styles.footerContainer}>
          <Box
            className={styles.logoBlock}
            component={Link}
            to={"/"}
            aria-label="Homepage"
          >
            <LogoNew />
            <Box>
              <Typography variant="h1" className={styles.heading}>
                WinsComp
              </Typography>
              <Typography className={styles.subheading}>
                Buy tickets and Win prizes
              </Typography>
            </Box>
          </Box>
          <Box className={styles.linksBlock}>
            {main.map(({ label, path }) => (
              <Box
                key={label}
                className={styles.link}
                component={Link}
                to={path}
                aria-label={label}
              >
                {label}
              </Box>
            ))}
          </Box>

        </Container>
      </Box>
    );
  };
  
  export default Footer;
  