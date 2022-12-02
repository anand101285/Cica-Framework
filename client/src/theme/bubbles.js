import { makeStyles } from '@mui/styles';

// export const getBubbleRandomColor = () => {
//   const hex = Math.floor(Math.random() * 0xffffff);
//   const hash = '#';
//   const color = hash + hex.toString(16);
//   return color;
// };

export const angle = Math.floor(Math.random() * 360);

export const useStyles = makeStyles(() => ({
  myBubbleUI: {
    width: '100%',
    maxWidth: '1000px',
    height: '500px',
    borderRadius: '50px'
  },

  child: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    boxShadow: '5px 5px 3px #6f6969',
    border: '1px solid #6f6969'
  },

  data: {
    color: 'white',
    marginTop: '42%',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: 'pointer'
  }
}));
