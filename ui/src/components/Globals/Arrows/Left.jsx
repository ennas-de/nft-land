import React from 'react';
import { SvgIcon } from '@mui/material';

const LeftArrowIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 20 20" style={{ width: "20px", height: "25px" }}>
    <path
      d="M15 10H5M8 13L5 10L8 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </SvgIcon>
);

export default LeftArrowIcon;