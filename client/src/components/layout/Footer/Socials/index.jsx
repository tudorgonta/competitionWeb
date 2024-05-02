import { Box, IconButton, Typography } from "@mui/material";

import styles from "./styles.module.css";
import FOOTER_LINKS from "../constants";
import { Link } from "react-router-dom";
import clsx from "clsx";

const Socials = ({ className }) => {

  return (
    <Box className={clsx(styles.container, className)}>
      <Typography className={styles.text}>
        Find out more:
      </Typography>
      <Box className={styles.icons}>
        {FOOTER_LINKS.socials.map(({ path, icon }, index) => (
          <IconButton
            key={index}
            className={styles.button}
            component={Link}
            to={path}
            target="_blank"
          >
            {icon}
          </IconButton>
        ))}
      </Box>
    </Box>
  );
};

export default Socials;
