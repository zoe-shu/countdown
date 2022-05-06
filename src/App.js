import './App.css';
import './style/Countdown.css';
import Countdown from './components/Countdown';
import countdownConfig from './countdownConfig.json';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>Countdown</div>
      </header>
      <div className="content">
        <Countdown date={countdownConfig.BIRTHDAY_DATE} />
      </div>
    </div>
  );
}

export default App;
