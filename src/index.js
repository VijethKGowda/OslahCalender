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

  const handleAddEvent = (time, title = '') => {
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
      </div>
    </>
  )
}

ReactDom.render(<App />, document.querySelector('#root'))