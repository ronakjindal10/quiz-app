import React from "react";

const Option = ({ option, handleClick }) => {
  return (
    <div>
      <button className="option-button" value={option} onClick={handleClick}>
        {option}
      </button>
    </div>
  );
};

export default Option;
