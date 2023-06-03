import React, { useRef } from "react";
import DisplayTrack from "../UI/DisplayTrack";
import AudioControls from "./AudioControls";
import ProgressBar from "./ProgressBar";

const AudioPlayer = ({ book }: { book: any }) => {
  const [timeProgress, setTimeProgress] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const audioRef = useRef();
  const progressBarRef = useRef();

  return (
    <>
      <DisplayTrack {...{ book, audioRef, setDuration, progressBarRef }} />
      <AudioControls
        {...{ audioRef, progressBarRef, duration, setTimeProgress }}
      />
      <ProgressBar {...{ progressBarRef, audioRef, timeProgress, duration }} />
    </>
  );
};

export default AudioPlayer;
