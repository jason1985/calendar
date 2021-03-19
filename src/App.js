import './App.css'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Day from './components/Day'

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
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  let date = new Date()
  let todaysMonth = new Date(date.getFullYear(), date.getMonth(), 1)

  return months[todaysMonth.getMonth()]
}

//returns total number of days for the current month
function getNumDaysOfCurrentMonth() {
  let todaysDate = new Date()
  let totalDays = new Date(
    todaysDate.getFullYear(),
    todaysDate.getMonth() + 1,
    0
  )
  return totalDays.getDate()
}

function getTodaysDate() {
  let todaysDate = new Date()
  return todaysDate.getDate()
}

//returns 0 for Sunday, 1 for Monday, etc...
function getFirstDayOfCurrentMonth() {
  let todaysDate = new Date()
  let firstDay = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), 1)

  return firstDay.getDay()
}

export default function App() {
  const [dates, setDates] = useState([])
  const [days, setDays] = useState(sundayFirst)
  const [currentMonth, setCurrentMonth] = useState('')
  const [today, setToday] = useState('')
  const [startFiller, setStartFiller] = useState([])
  const [endFiller, setEndFiller] = useState([])

  const [msFiller, setmsFiller] = useState(0)
  const [meFiller, setmeFiller] = useState(0)
  const [monFirst, setMonFirst] = useState(false)

  const [calendarInfo, setCalendarInfo] = useState({})

  useEffect(() => {
    //if calendarInfo is in storage update our cal
    //if not then create it
    if (localStorage.getItem('calendarInfo') === null) {
      localStorage.setItem('calendarInfo', JSON.stringify(calendarInfo))
      console.log('created calendarInfo in local storage')
    } else {
      let info = JSON.parse(localStorage.getItem('calendarInfo'))
      setCalendarInfo(info)
      // console.log('got calendarInfo from local storage')
      // console.log(info)
    }
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
    } else if (daysUsed < 42) {
      fillAmt = 42 - daysUsed
      // calendarElement.style.gridTemplateRows = 'repeat(6,1fr)'
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
      <div className="month">
        {startFiller.map((day) => (
          <div key={day} className="fillerday"></div>
        ))}
        {dates.map((num, index) => (
          <Day
            calendarinfo={calendarInfo}
            key={num}
            date={index + 1}
            today={today}
          />
        ))}
        {endFiller.map((day) => (
          <div key={day} className="fillerday"></div>
        ))}
      </div>
      <button onClick={weekdayToggle}>monday first toggle</button>
    </div>
  )
}
