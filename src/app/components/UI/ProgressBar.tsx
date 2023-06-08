import React, { MutableRefObject, useEffect } from "react";

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
  const handleProgressChange = (e: any) => {
    audioRef.current.currentTime = e.target.value;
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

  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.max = duration;
    }
  }, [progressBarRef, duration]);

  return (
    <>
      <div className="audio__progress--wrapper">
        <div className="audio__time">{formatTime(timeProgress)}</div>
        <input
          type="range"
          min="0"
          className="audio__progress--bar"
          ref={progressBarRef}
          onChange={handleProgressChange}
          value={timeProgress ? timeProgress : "0"}
        />
        <div className="audio__time">{formatTime(duration)}</div>
      </div>
    </>
  );
}

export default ProgressBar;
