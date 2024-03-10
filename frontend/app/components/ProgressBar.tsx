import React, { useState, useEffect } from 'react';
import * as Progress from '@radix-ui/react-progress';
import styled from 'styled-components';

const ProgressRoot = styled(Progress.Root)`
  position: relative;
  overflow: hidden;
  background: #8080806b;
  border-radius: 99999px;
  width: 350px;
  height: 15px;
  transform: translateZ(0);
`;

const ProgressIndicator = styled(Progress.Indicator)`
  background-color: ${props => props.color};
  width: 100%;
  height: 100%;
  transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1);
`;

const ProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProgressNumber = styled.span`
  margin-right: 1px;
`;

// const getColor = (value) => {
//   if (value < 20) {
//     return 'red';
//   } else if (value > 80) {
//     return '#0ce90c';
//   } else {
//     return 'orange';
//   }
// };

const getColor = (value) => {
  const percent = value / 100;
  const highColor = Math.floor(255 * Math.max(0, Math.min(2 * percent, 1))).toString(16).padStart(2, '0');
  const lowColor = Math.floor(255 * Math.max(0, Math.min(2 - 2 * percent, 1))).toString(16).padStart(2, '0');
  const barColor = `#${lowColor}${highColor}00`;

  return barColor;
};


const ProgressBar = ({ initialValue, finalValue }) => {
  const [progress, setProgress] = useState(initialValue);
  const color = getColor(finalValue);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(finalValue), 500);
    return () => clearTimeout(timer);
  }, [finalValue]);

  return (
    <ProgressContainer>
      <ProgressRoot value={progress}>
        <ProgressIndicator color={color} style={{ transform: `translateX(-${100 - progress}%)` }} />
      </ProgressRoot>
      <ProgressNumber>{`${finalValue}%`}</ProgressNumber>
    </ProgressContainer>
  );
};

export default ProgressBar;