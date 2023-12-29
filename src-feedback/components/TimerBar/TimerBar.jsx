/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { Button, ButtonGroup, Card } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const TimerBar = ({ stopTimer, onFinish, onTimeElapsed }) => {
  const [time, setTime] = useState({ seconds: 0, minutes: 0, hours: 0 });
  const { seconds, minutes, hours, start, pause, reset } = useStopwatch({
    autoStart: true,
  });
  const isTimerStopped = useRef(false);

  useEffect(() => {
    setTime({ seconds, minutes, hours });
  }, [seconds, minutes, hours]);

  useEffect(() => {
    if (stopTimer && !isTimerStopped.current) {
      isTimerStopped.current = true;
      pause();
      onFinish(time.hours * 3600 + time.minutes * 60 + time.seconds);
      onTimeElapsed({ hours, minutes, seconds });
    }
  }, [
    stopTimer,
    onFinish,
    pause,
    onTimeElapsed,
    time.hours,
    time.minutes,
    time.seconds,
  ]);

  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <Card className="text-white bg-grey w-28 text-xl p-1 mb-4 text-center">
        <span>{time.hours}h</span>:<span>{time.minutes}m</span>:
        <span>{time.seconds}s</span>
      </Card>

      <Card className="bg-black">
        <ButtonGroup
          variant="outlined"
          aria-label="outlined button group"
          color="error"
        >
          <Button onClick={start} className="w-10">
            <PlayArrowIcon />
          </Button>
          <Button onClick={pause} className="w-10">
            <PauseIcon />
          </Button>
          <Button onClick={reset} className="w-10">
            <RestartAltIcon />
          </Button>
        </ButtonGroup>
      </Card>
    </div>
  );
};

export default TimerBar;
