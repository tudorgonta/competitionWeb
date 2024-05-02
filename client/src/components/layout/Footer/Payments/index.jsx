import { Box, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FOOTER_LINKS from "../constants";

import styles from "./styles.module.css";

const Payments = () => {

  const navigate = useNavigate();

  return (
    <Box className={styles.container}>
      <Typography className={styles.text}>
        Payment Methods:
      </Typography>
      <Box className={styles.icons}>
        {FOOTER_LINKS.payments.map(({ path, icon }, index) => (
          <IconButton
            key={index}
            className={styles.button}
            onClick={() => navigate(path)}
          >
            {icon}
          </IconButton>
        ))}
      </Box>
    </Box>
  );
};

export default Payments;
