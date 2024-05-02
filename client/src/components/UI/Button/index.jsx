import { Box, ButtonBase, CircularProgress } from "@mui/material";
import clsx from "clsx";
import { forwardRef } from "react";

import styles from "./styles.module.css";

const Button = forwardRef(
  (
    {
      children,
      className,
      size = "small",
      color = "primary",
      startIcon,
      endIcon,
      fullWidth,
      loading,
      disabled,
      badgeContent,
      ...restProps
    },
    ref
  ) => (
    <ButtonBase
      className={clsx(
        styles.button,
        styles[`button_${color}`],
        styles[`button_${size}`],
        loading && styles.button_loading,
        fullWidth && styles.button_fullWidth,
        className
      )}
      ref={ref}
      disabled={loading || disabled}
      {...restProps}
    >
      {startIcon && (
        <Box
          component="span"
          className={clsx(
            styles.iconContainer,
            !!children && styles.iconContainer_left
          )}
          aria-hidden
        >
          {startIcon}
        </Box>
      )}
      {loading ? <CircularProgress color="inherit" size={24} /> : children}
      {endIcon && (
        <Box
          component="span"
          className={clsx(
            styles.iconContainer,
            !!children && styles.iconContainer_right
          )}
          aria-hidden
        >
          {endIcon}
        </Box>
      )}
      {!!badgeContent && (
        <Box className={styles.badge} component="span" aria-hidden>
          {badgeContent}
        </Box>
      )}
    </ButtonBase>
  )
);

export default Button;
