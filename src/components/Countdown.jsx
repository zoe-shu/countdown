import React from 'react';

/*
- Pick an area of improvement to implement.
 -Removed the part that calculating the difference of year, because it is not necessary

- What would happen to the current code if the date were changed, the page layout was changed or the format was changed?
 -The Birthday can be changed on /src/countdownConfig.json
 -If the date format not correct as YYYY-MM-DD, it will set as 2023-01-01
 -Display birthday message and animation if today is matched with the birthday
 -If today is the day after birthday, will countdown to next year's birthday

- How would you make this countdown more aesthetically pleasing?
 -Based on time limitation, layout referenced from https://codepen.io/ManajitPal/pen/pxEGVo and made some changes on animation.

- Trust your design instincts, and explain how your design choices impact the user experience
 -Using responsive layout, users can browse it on different devices.
 -Using light color and animation, make the website more attractive and have the vibe of celebrating the user's birthday.
*/

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      isBirthday: false,
    }
  }

  componentDidMount() {
    // update every second
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(new Date(this.props.date));
      date ? this.setState(date) : this.stop();
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  calculateCountdown(endDate) {
    endDate = new Date(endDate);
    endDate.setYear(new Date().getFullYear());

    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

    if(diff <= 0 && diff >= -86400 ){
      //the exact day of birthday
      this.setState({isBirthday : true});
    }else if(diff < 0 && diff <= -86401 ){
      //the day after birthday, countdown to next year's birthday
      endDate.setYear(new Date().getFullYear()+1);
      diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;
      this.setState({isBirthday : false});
    }
    
    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    };
    
    // calculate time difference between now and expected date
      //removed not neccesary calaulation of year difference
    if (diff >= 86400) { // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
  }

  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  }

  render() {
    const countDown = this.state;

    return (
      <div className="countdown">
        {/* show birthday animation & text all day */}
      { !countDown.isBirthday ?
        null
      :
        <div className="birthday-wrap">
          <div className="pyro">
            <div className="before"></div>
            <div className="after"></div>
          </div>
          <div className="birthday-text">Happy Birthday!</div>
        </div>
      }
        <div className="countdown-date-wrap">
          <div className="date-container countdown-col">
            <strong>{this.addLeadingZeros(countDown.days)}</strong>
            <span>{countDown.days === 1 ? 'Day' : 'Days'}</span>
          </div>
          
          <div className="date-container countdown-col">
            <strong>{this.addLeadingZeros(countDown.hours)}</strong>
            <span>Hours</span>
          </div>

          <div className="date-container countdown-col">
            <strong>{this.addLeadingZeros(countDown.min)}</strong>
            <span>Min</span>
          </div>

          {/* hide second countdown on birthday, to advoid showing negative number  */}
          { countDown.isBirthday ?
            null
          :
            <div className="date-container countdown-col">
              <strong>{this.addLeadingZeros(countDown.sec)}</strong>
              <span>Sec</span>
            </div>
          }
        </div>

      </div>
    );
  }
}

export default Countdown;
