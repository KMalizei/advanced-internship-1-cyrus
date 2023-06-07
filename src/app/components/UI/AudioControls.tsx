import React, { MutableRefObject, useEffect } from "react";
import { useState, useRef, useCallback } from "react";
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from "react-icons/io5";

interface AudioPlayerProps {
  progressBarRef: MutableRefObject<any>;
  audioRef: MutableRefObject<any>;
  setTimeProgress: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
}

const AudioControls = ({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playAnimationRef = useRef<number | null>();

  const repeat = useCallback(() => {
    const currentTime: number = audioRef?.current?.currentTime;
    setTimeProgress(currentTime);
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  useEffect(() => {
    const endOfAudio = () => {
      setIsPlaying(false);
      setTimeProgress(0);
      progressBarRef.current.value = 0;
      progressBarRef.current.style.setProperty("--range-progress", `0%`);
    };
    audioRef.current.addEventListener("ended", endOfAudio);
  }, [audioRef, progressBarRef, setTimeProgress]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 5;
  };

  const skipForward = () => {
    audioRef.current.currentTime += 5;
  };

  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.value = setTimeProgress;
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(progressBarRef.current.value / duration) * 100}%`
      );
    }
  }, [setTimeProgress, duration, progressBarRef]);

  return (
    <div>
      <div className="audio__controls--wrapper">
        <div className="audio__controls">
          <button className="audio__controls--btn" onClick={skipBackward}>
            <IoPlayBackSharp />
          </button>
          <button
            className="audio__controls--btn audio__controls--btn-play"
            onClick={togglePlayPause}
          >
            {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
          </button>
          <button className="audio__controls--btn" onClick={skipForward}>
            <IoPlayForwardSharp />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioControls;