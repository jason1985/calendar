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

function getTodaysDate() {
  return parseInt(moment().format('D'))
}

export default function App() {
  const [dates, setDates] = useState([]) //date array to loop over for everyday of month
  const [days, setDays] = useState(sundayFirst) // sun-sat or mon-sun
  const [today, setToday] = useState('')
  const [startFiller, setStartFiller] = useState([])
  const [endFiller, setEndFiller] = useState([])

  const [msFiller, setmsFiller] = useState(0) //mon-sun filler offset
  const [meFiller, setmeFiller] = useState(0) // ""
  const [monFirst, setMonFirst] = useState(false)

  const [extraRow, setExtraRow] = useState(false) //some months requires 6 grid rows instead of 5

  const [displayedCal, setDisplayedCal] = useState({}) //the current Calendar on screen. ex: March 2021
  const [calOffset, setCalOffset] = useState(0)

  //set displayedCal to current month & year
  useEffect(() => {
    getMonth(calOffset)
  }, [calOffset])

  useEffect(() => {
    ///////////////

    if (monFirst === false) {
      setmsFiller(0)
      setmeFiller(0)
      setDays(sundayFirst)
    }
    if (monFirst === true) {
      setDays(mondayFirst)
      // -1 sunday add 6 msfiller
      // +1 sunday sub 6 mefiller
      if (displayedCal.firstDay === 0) {
        setmsFiller(6)
        setmeFiller(-6)
      } else {
        setmsFiller(-1)
        setmeFiller(1)
      }
    }

    //dates filler
    let tempDates = []
    for (let i = 1; i < displayedCal.totalDays + 1; i++) {
      tempDates.push(uuidv4())
    }

    //start filler
    let filler = displayedCal.firstDay + msFiller
    let tempStartFiller = []
    for (let i = 0; i < filler; i++) {
      tempStartFiller.push(uuidv4())
    }

    //end filler
    let fillAmt // = displayedCal.firstDay + meFiller
    let daysUsed = tempDates.length + tempStartFiller.length

    if (daysUsed <= 35) {
      fillAmt = 35 - daysUsed
      setExtraRow(false)
    } else if (daysUsed <= 42) {
      fillAmt = 42 - daysUsed
      // calendarElement.style.gridTemplateRows = 'repeat(6,1fr)'
      setExtraRow(true)
    }

    if (fillAmt === 7) fillAmt = 0 //edge case if feb only needs 4 rows for 28 days

    let tempEndFiller = []
    for (let i = 0; i < fillAmt; i++) {
      tempEndFiller.push(uuidv4())
    }

    setStartFiller(tempStartFiller)
    setDates(tempDates)
    setEndFiller(tempEndFiller)

    setToday(getTodaysDate())
  }, [monFirst, meFiller, msFiller, displayedCal])

  function getMonth(offset) {
    // setmsFiller(0)
    // setmeFiller(0)
    setDisplayedCal({
      month: moment().add(offset, 'month').format('MMMM'),
      year: moment().add(offset, 'month').format('y'),
      firstDay: parseInt(
        moment().add(offset, 'month').startOf('month').format('d')
      ),
      totalDays: parseInt(
        moment().add(offset, 'month').endOf('month').format('D')
      ),
    })
  }

  return (
    <div className="container">
      <div className="monthName">
        {displayedCal.month} {displayedCal.year}
      </div>
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
      <div>
        <button onClick={() => setCalOffset(calOffset - 1)}>prev</button>
        <button onClick={() => setCalOffset(0)}>current</button>
        <button onClick={() => setCalOffset(calOffset + 1)}>next</button>
      </div>
      <div className="monday-switch">
        <span>Monday first</span>
        <Switch
          onChange={() => setMonFirst(!monFirst)}
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
