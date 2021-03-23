import './App.css'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import Day from './components/Day'
import Switch from 'react-switch'

const sundayFirst = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const mondayFirst = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

function getCurrentMonth() {
  return moment().format('MMMM')
}

function getCurrentYear() {
  return moment().format('Y')
}

//returns total number of days for the current month
function getNumDaysOfCurrentMonth() {
  console.log('num of days this month:')
  console.log(moment().endOf('month').format('D'))
  return parseInt(moment().endOf('month').format('D'))
}

function getTodaysDate() {
  return parseInt(moment().format('D'))
}

//returns 0 for Sunday, 1 for Monday, etc...
function getFirstDayOfCurrentMonth() {
  return parseInt(moment().startOf('month').format('d'))
}

export default function App() {
  const [dates, setDates] = useState([]) //date array to loop over for everyday of month
  const [days, setDays] = useState(sundayFirst) // sun-sat or mon-sun
  const [currentMonth, setCurrentMonth] = useState('')
  const [today, setToday] = useState('')
  const [startFiller, setStartFiller] = useState([])
  const [endFiller, setEndFiller] = useState([])

  const [msFiller, setmsFiller] = useState(0) //mon-sun filler offset
  const [meFiller, setmeFiller] = useState(0) // ""
  const [monFirst, setMonFirst] = useState(false)

  const [extraRow, setExtraRow] = useState(false) //some months requires 6 grid rows instead of 5

  const [displayedCal, setDisplayedCal] = useState({}) //the current Calendar on screen. ex: March 2021
  //{month: "March",year: "2021"}

  useEffect(() => {
    setDisplayedCal({ month: getCurrentMonth(), year: getCurrentYear() })
  }, [])

  useEffect(() => {
    let tempDates = []
    let numOfDays = getNumDaysOfCurrentMonth() + 1
    for (let i = 1; i < numOfDays; i++) {
      tempDates.push(uuidv4())
    }

    let filler = getFirstDayOfCurrentMonth()
    let tempStartFiller = []
    for (let i = 0; i < filler + msFiller; i++) {
      tempStartFiller.push(uuidv4())
    }

    let fillAmt = getFirstDayOfCurrentMonth()
    let daysUsed = tempDates.length + fillAmt

    if (daysUsed < 35) {
      fillAmt = 35 - daysUsed
      setExtraRow(false)
    } else if (daysUsed < 42) {
      fillAmt = 42 - daysUsed
      // calendarElement.style.gridTemplateRows = 'repeat(6,1fr)'
      setExtraRow(true)
    }

    let tempEndFiller = []
    for (let i = 0; i < fillAmt + meFiller; i++) {
      tempEndFiller.push(uuidv4())
    }

    setCurrentMonth(getCurrentMonth())

    setStartFiller(tempStartFiller)
    setDates(tempDates)
    setEndFiller(tempEndFiller)

    setToday(getTodaysDate())
  }, [meFiller, msFiller])

  const weekdayToggle = () => {
    if (monFirst === true) {
      setmsFiller(0)
      setmeFiller(0)
      setDays(sundayFirst)
      setMonFirst(false)
      return
    }
    // -1 sunday add 6 msfiller
    // +1 sunday sub 6 mefiller
    if (getFirstDayOfCurrentMonth() === 0) {
      setmeFiller(-6)
      setmsFiller(6)
    } else {
      setmeFiller(1)
      setmsFiller(-1)
    }
    setDays(mondayFirst)
    setMonFirst(true)
  }

  console.log(displayedCal)

  return (
    <div className="container">
      <div className="monthName">{currentMonth}</div>
      <div className="weekdays">
        {days.map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>
      <div className={`month ${extraRow ? 'extra-row' : ''}`}>
        {startFiller.map((day) => (
          <div key={day} className="fillerday"></div>
        ))}
        {dates.map((num, index) => (
          <Day
            current={displayedCal}
            key={num}
            date={index + 1}
            today={today}
          />
        ))}
        {endFiller.map((day) => (
          <div key={day} className="fillerday"></div>
        ))}
      </div>
      <div className="monday-switch">
        <span>Monday first</span>
        <Switch
          onChange={weekdayToggle}
          checked={monFirst}
          className="react-switch"
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={25}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
        />
      </div>
    </div>
  )
}
