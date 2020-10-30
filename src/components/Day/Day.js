import React, { useState } from 'react'
import './style.css'
import Hours from './Hours'

const Day = ({ selectedDate, events, addEvent }) => {
  const todaysEvents = events.filter(event => {
    return event.from.format('DDMMYY') === selectedDate.format('DDMMYY');
  })
 
  return (
    <div className="dayDiv">
      <div className="DayDate">
        <span>{selectedDate.format('ddd DD')}</span>
      </div>
      <Hours selectedDate={selectedDate} events={todaysEvents} addEvent={addEvent} />
    </div>
  )
}

export default Day
