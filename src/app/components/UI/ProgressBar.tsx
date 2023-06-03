import React, { MutableRefObject } from "react";

interface AudioPlayerProps {
  progressBarRef: MutableRefObject<any>;
  audioRef: MutableRefObject<any>;
  timeProgress: number;
  duration: number;
}

function ProgressBar({
  progressBarRef,
  audioRef,
  timeProgress,
  duration,
}: AudioPlayerProps) {
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  return (
    <>
      <div className="audio__progress--wrapper">
        <div className="audio__time">{formatTime(timeProgress)}</div>
        <input
          type="range"
          className="audio__progress--bar"
          ref={progressBarRef}
          onChange={handleProgressChange}
        />
        <div className="audio__time">{formatTime(duration)}</div>
      </div>
    </>
  );
}

export default ProgressBar;
