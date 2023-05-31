import React from "react";

const Skeleton = ({ width, height, borderRadius = 0 }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
      }}
    ></div>
  );
};

export default Skeleton;
