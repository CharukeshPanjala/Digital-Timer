import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    timerLimit: 25,
    timeInMinutes: 25,
    timeInSeconds: 25 * 60,
    isStarted: false,
    timerStarted: false,
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  incrementTimeElapsedInSeconds = () => {
    const {timeInSeconds} = this.state
    if (timeInSeconds > 0) {
      this.setState({
        timeInSeconds: timeInSeconds - 1,
        timeInMinutes: (timeInSeconds - 1) / 60,
      })
    } else {
      this.clearTimerInterval()
    }
  }

  onClickStartPause = () => {
    this.setState(prevState => ({
      isStarted: !prevState.isStarted,
      timeInSeconds: prevState.timeInMinutes * 60,
    }))
    this.setState({timerStarted: true})
    const {isStarted} = this.state
    if (!isStarted) {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    } else {
      this.clearTimerInterval()
    }
  }

  onClickMinus = () => {
    const {timerLimit} = this.state
    if (timerLimit > 1) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit - 1,
        timeInMinutes: prevState.timeInMinutes - 1,
        timeInSeconds: (prevState.timeInMinutes - 1) * 60,
      }))
    }
  }

  onClickPlus = () => {
    this.setState(prevState => ({
      timerLimit: prevState.timerLimit + 1,
      timeInMinutes: prevState.timeInMinutes + 1,
      timeInSeconds: (prevState.timeInMinutes + 1) * 60,
    }))
  }

  onClickReset = () => {
    this.clearTimerInterval()
    this.setState({
      timerLimit: 25,
      timeInSeconds: 25 * 60,
      timeInMinutes: 25,
      isStarted: false,
      timerStarted: false,
    })
  }

  getTimeFormat = () => {
    const {timeInSeconds} = this.state
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    const stringMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringMinutes}:${stringSeconds}`
  }

  render() {
    const {timerLimit, isStarted, timerStarted} = this.state
    const buttonUrl = isStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const altName = isStarted ? 'pause icon' : 'play icon'
    const isButtonsDisabled = timerStarted
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-start-stop-container">
          <div className="timer-container">
            <div className="timer">
              <h1 className="timer-text">{this.getTimeFormat()}</h1>
              <p className="running-paused-text">
                {isStarted ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="start-reset-setTimer-container">
            <div className="pause-reset-container">
              <button
                type="button"
                className="start-reset-button"
                onClick={this.onClickStartPause}
              >
                <img src={buttonUrl} alt={altName} className="icon" />
                <p className="button-text">{isStarted ? 'Pause' : 'Start'}</p>
              </button>
              <button
                type="button"
                className="start-reset-button"
                onClick={this.onClickReset}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icon"
                />
                <p className="button-text">Reset</p>
              </button>
            </div>
            <p className="set-timer-limit-text">Set Timer Limit</p>
            <div className="set-timer-container">
              <button
                type="button"
                disabled={isButtonsDisabled}
                className="plus-minus-button"
                onClick={this.onClickMinus}
              >
                -
              </button>
              <p className="set-timer-text">{timerLimit}</p>
              <button
                type="button"
                disabled={isButtonsDisabled}
                className="plus-minus-button"
                onClick={this.onClickPlus}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
