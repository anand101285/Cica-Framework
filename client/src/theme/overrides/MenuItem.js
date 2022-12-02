// ----------------------------------------------------------------------

export default function Lists() {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#092f4c !important'
          },
          '&.Mui-selected': {
            backgroundColor: '#11aad3 !important'
          }
        }
      }
    }
  };
}
