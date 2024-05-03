import HeroSlider from "../../components/HeroSlider";
import HomeCompsList from "../../components/HomeCompsList";
import styles from "./styles.module.css";

import { Box, Container } from "@mui/material";

const Home = () => {

    return (
        <Container className={styles.homeContainer}>
            <Box sx={{
                maxWidth: '100vw',
            }}>
                <HeroSlider />
            </Box>
            <HomeCompsList />
        </Container>
    );
}

export default Home;