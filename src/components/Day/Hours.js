import React from 'react';
import Hour from './Hour'

const Hours = ({ selectedDate, events, addEvent }) => {
  const hours = []
  for (let i = 0; i < 24; i++) {
    hours.push({
      time:
        selectedDate
          .clone()
          .hour(i)
          .minute(0)
          .second(0)
    });
  }

  events.forEach(event => {
    hours[event.from.hour()].title = event.title;
  })

  return (
    <div className="hours">
      { hours.map((hour, index) => <Hour key={index} hour={hour} addEvent={addEvent} />)}
    </div>
  )
}

export default Hours;
