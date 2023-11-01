import './App.css';
import { BsFillFileArrowUpFill, BsFillFileArrowDownFill } from 'react-icons/bs';
import { FaPlay, FaPause, FaBroom } from 'react-icons/fa';

function App() {
  return (
    <div className="App">
      <div className="ClockContainer">
        <section className="ClockTitle"><h1>25 + 5 Clock</h1></section>
        <section className="ClockConfig">
          <div className='BreakLength'>
            <h4 className='BreakTitle'>Break length</h4>
            <div className='Adjustments'>
              <div className='ArrowButton'><BsFillFileArrowUpFill className='ArrowIcon'/></div>
              <h4 className='Length'>X</h4>
              <div className='ArrowButton'><BsFillFileArrowDownFill className='ArrowIcon'/></div>
            </div>
          </div>
          <div className='SessionLength'>
            <h4 className='SessionTitle'>Session length</h4>
            <div className='Adjustments'>
              <div className='ArrowButton'><BsFillFileArrowUpFill className='ArrowIcon'/></div>
              <h4 className='Length'>X</h4>
              <div className='ArrowButton'><BsFillFileArrowDownFill className='ArrowIcon'/></div>
            </div>
          </div>
        </section>
        <section className="ClockTimer">
          <h4 className='ClockTimerTitle'>Session</h4>
          <h1 className='ClockTimerTime'>XX:XX</h1>
        </section>
        <section className="ClockActions">
          <div className="ClockActionsContainer">
            <FaPlay className='ActionIcon'/>
            <FaPause className='ActionIcon'/>
            <FaBroom className='ActionIcon'/>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
