import React, { forwardRef } from 'react';
import TestPoint from "../../assets/images/testpoint.png";
import gotcha from "../../assets/images/gotcha.png";

const TestItem = forwardRef((props, ref) => {
  const options = [1, 2, 3, 4, 5, 6, 7];
  const { text, onSelect, selectedValue, isAnswered } = props;

  return (
    <div className={`columnContainer ${isAnswered ? 'answered' : ''}`} ref={ref}>
      <p className="normalText-test">{text}</p>
      <div className="mainContent">
        <div className="normalText-test2">Disagree</div>
        {options.map((value) => (
          <img
            key={value}
            className={`point_img ${isAnswered ? 'answered' : ''}`}
            src={selectedValue === value ? gotcha : TestPoint}
            style={{
              width: `${(value <= 4 ? (8 - value) : value) * 0.7}vw`,
            }}
            onClick={() => onSelect(value)}
            alt="Test Point"
          />
        ))}
        <div className="normalText-test2">Agree</div>
      </div>
    </div>
  );
});

export default TestItem;
