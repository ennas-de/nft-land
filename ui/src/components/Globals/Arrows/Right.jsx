import React from 'react';
import { SvgIcon } from '@mui/material';
  
const RightArrowIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 20 20" style={{ width: "20px", height: "25px" }}>
    <path
      d="M5 10H15M12 7L15 10L12 13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </SvgIcon>
);

export default RightArrowIcon