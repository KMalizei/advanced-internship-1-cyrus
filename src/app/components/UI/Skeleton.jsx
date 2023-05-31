import React from "react";

function Skeleton({ width, height }) {
    return (
        <div
            className="skeleton-box"
            style={{
                width,
                height
            }}
        ></div>
    );
}

export default Skeleton;