import PropTypes from 'prop-types';
import AnimatedNumbers from 'react-animated-numbers';
// material
import { Typography } from '@mui/material';
import './CustomCard.css';
// ----------------------------------------------------------------------

const CustomCard = ({ num, name, children }) => (
  <div className="cs-card">
    <div className="cs-card-child">{children}</div>
    <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
      {name}
    </Typography>
    <div className="animated-number">
      <AnimatedNumbers
        includeComma
        animateToNumber={num}
        fontStyle={{
          fontSize: 20,
          textAlign: 'end'
        }}
        configs={[
          { mass: 1, tension: 220, friction: 100 },
          { mass: 1, tension: 180, friction: 130 },
          { mass: 1, tension: 280, friction: 90 },
          { mass: 1, tension: 180, friction: 135 },
          { mass: 1, tension: 260, friction: 100 },
          { mass: 1, tension: 210, friction: 180 }
        ]}
      />
    </div>
  </div>
);

CustomCard.propTypes = {
  num: PropTypes.number,
  name: PropTypes.string,
  children: PropTypes.node
};

export default CustomCard;
