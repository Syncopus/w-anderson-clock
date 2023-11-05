import { useState, useEffect, useRef } from 'react';
import './App.css';
import { BsFillFileArrowUpFill, BsFillFileArrowDownFill } from 'react-icons/bs';
import { FaPlay, FaPause, FaBroom } from 'react-icons/fa';
import { useTimer } from 'react-timer-hook';

const App = () => {
  const [breakLength, setBreakLength] = useState(300);
  const [sessionLength, setSessionLength] = useState(3600);
  const [isBreak, setIsBreak] = useState(false);
  const audioRef = useRef(null);

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + sessionLength); // 25 minutes timer by default

  const {
    seconds,
    minutes,
    isRunning,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, autoStart: false, onExpire: () => handleNextCountDown()});

  useEffect(() => {
    if (isBreak) {
      const time = new Date();
      time.setSeconds(time.getSeconds() + breakLength);
      restart(time);
      console.log('(BREAK) restarting with breakLength:', breakLength);
    } else {
      const time = new Date();
      time.setSeconds(time.getSeconds() + sessionLength);
      restart(time);
      console.log('(SESSION) restarting with sessionLength:', sessionLength);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBreak])

  const handleNextCountDown = () => {
    const isNewBreak = !isBreak;
    setIsBreak(isNewBreak);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.error("Playback was prevented. Error:", error);
      });
    }
  }

  const handleReset = () => {

    setBreakLength(300);
    setSessionLength(1500);
    const time = new Date();
    time.setSeconds(time.getSeconds() + 1500);
    restart(time);
    pause();
  }

  const handleRestart = (newDuration) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + newDuration);
    restart(time);
    pause();
  }

  const handleStartStop = () => {
    if (isRunning) {
      pause();
      return;
    }
    resume();
  }

  const handleTimeConfiguration = (configurationType, timeModification) => {
    if (isRunning) {
      return;
    }
    switch (configurationType) {
      case 'breakLength':
        const newBreakLength = breakLength + timeModification;
        if (newBreakLength < 0 || newBreakLength > 3600) {
          break;
        }
        setBreakLength(newBreakLength);
        if (isBreak) {
          handleRestart(newBreakLength);
        }
        break;
      case 'sessionLength':
        const newSessionLength = sessionLength + timeModification;
        if (newSessionLength < 0 || newSessionLength > 3600) {
          return;
        }
        setSessionLength(newSessionLength);
        if (!isBreak) {
          handleRestart(newSessionLength);
        }
        break;
      default:
        break;
    }
  }

  const formatTimeLeft = (minutes, seconds) => {
    if (seconds < 10) {
      return `${minutes}:0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  return (
    <div className="App">
      <div className="ClockContainer">
        <section className="ClockTitle"><h1>25 + 5 Clock</h1></section>
        <section className="ClockConfig">
          <div className='BreakLength'>
            <h4 id='break-label' className='BreakTitle'>Break length</h4>
            <div className='Adjustments'>
              <div className='ArrowButton'><BsFillFileArrowUpFill id='break-increment' className='ArrowIcon' onClick={() => handleTimeConfiguration('breakLength', 60)}/></div>
              <h4 id='break-length' className='Length'>{breakLength/60}</h4>
              <div className='ArrowButton'><BsFillFileArrowDownFill id='break-decrement' className='ArrowIcon' onClick={() => handleTimeConfiguration('breakLength', -60)}/></div>
            </div>
          </div>
          <div className='SessionLength'>
            <h4 id='session-label' className='SessionTitle'>Session length</h4>
            <div className='Adjustments'>
              <div className='ArrowButton'><BsFillFileArrowUpFill id='session-increment' className='ArrowIcon' onClick={() => handleTimeConfiguration('sessionLength', 60)}/></div>
              <h4 id='session-length' className='Length'>{sessionLength/60}</h4>
              <div className='ArrowButton'><BsFillFileArrowDownFill id='session-decrement' className='ArrowIcon' onClick={() => handleTimeConfiguration('sessionLength', -60)}/></div>
            </div>
          </div>
        </section>
        <section className="ClockTimer">
          <h4 id='timer-label' className='ClockTimerTitle'>{isBreak ? 'Break' : 'Session'}</h4>
          <h1 id='time-left' className='ClockTimerTime'>{formatTimeLeft(minutes, seconds)}</h1>
        </section>
        <section className="ClockActions">
          <div className="ClockActionsContainer">
            <span className='StartStopButton' onClick={handleStartStop}>
              <FaPlay id='start_stop' className='ActionIcon'/>
              <FaPause className='ActionIcon'/>
            </span>
            <span id='reset' className='ResetButton' onClick={handleReset}>
              <FaBroom className='ActionIcon'/>
            </span>
          </div>
        </section>
      </div>
      <audio id="beep" ref={audioRef} src='/beep.wav'/>
    </div>
  );
}

export default App;
