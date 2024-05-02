import { 
  createTheme, 
  ThemeProvider 
} from "@mui/material/styles";
import React from "react";

import { AppRouter } from "./router";

import { externalTheme } from "./lib/theme";

function App() {

  const mode = "dark"

  // Create + Wrap theme
  const theme = React.useMemo(() =>
    createTheme(
      {
        palette: { mode, primary: externalTheme.palette.primary },
        typography: externalTheme.typography,
        components: externalTheme.components,
      },
      [mode]
    )
  );

  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
