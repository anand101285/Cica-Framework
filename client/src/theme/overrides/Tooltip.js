// ----------------------------------------------------------------------

export default function Tooltip(theme) {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.primary[800]
        },
        arrow: {
          color: theme.palette.primary[800]
        }
      }
    }
  };
}
