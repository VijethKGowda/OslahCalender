import React, { useState } from 'react'
import ReactDom from 'react-dom'
import dayjs from 'dayjs';
import classNames from 'classnames';
import './style.css'

import Month from './components/Monthly/Monthly'
import Day from './components/Day/Day'
import AddEvent from './AddEvent';
import Header from './Header';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [viewType, setViewType] = useState('MONTH');
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [newEventTime, setNewEventTime] = useState(null);
  const [newEventTitle, setNewEventTitle] = useState('');

  const addEvent = (event) => {
    let existingEventIndex = events.findIndex(existingEvent => existingEvent.from.format() === event.from.format());
    
    if (existingEventIndex >= 0) {
      events[existingEventIndex] = event;
    } else {
      events.push(event);
    }
    setEvents([...events]);
    setNewEventTime(null);
    setNewEventTitle('');
  }

  const deleteEvent = (eventTime) => {
    let existingEventIndex = events.findIndex(existingEvent => existingEvent.from.format() === eventTime.format());
    if (existingEventIndex >= 0) {
      events.splice(existingEventIndex, 1);
      setEvents([...events]);
    }
    setNewEventTime(null);
    setNewEventTitle('');
  }

  const handleAddEvent = (time, title='') => {
    setNewEventTime(time);
    setNewEventTitle(title);
    setIsAddEventModalOpen(true);
  }

  const toggleViewType = (e, nextViewType = null) => {
    if (nextViewType) setViewType(nextViewType);
    else setViewType(viewType === 'MONTH' ? 'DAY' : 'MONTH');
  }

  const showDate = (date) => {
    setSelectedDate(date);
    toggleViewType(null, 'DAY');
  }
  return (
    <>
      <Header selectedDate={selectedDate} setSelectedDate={setSelectedDate} toggleViewType={toggleViewType} viewType={viewType} />
      <div className="main">
        {
          viewType === 'DAY'
            ? <Day selectedDate={selectedDate} addEvent={handleAddEvent} events={events} />
            : <Month showDate={showDate} selectedDate={selectedDate} events={events} />
        }
        
        <AddEvent
          className={classNames({
            'block': isAddEventModalOpen,
            'hidden': !isAddEventModalOpen
          })}
          hide={(e) => { setIsAddEventModalOpen(false) }}
          time={newEventTime}
          existingTitle={newEventTitle}
          addEvent={addEvent}
          deleteEvent={deleteEvent}
        />
{/* 
        <button className="addEvent" onClick={() => { setIsAddEventModalOpen(true) }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button> */}
      </div>
    </>
  )
}

ReactDom.render(<App />, document.querySelector('#root'))