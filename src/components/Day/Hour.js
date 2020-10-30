import React from 'react';

const Hour = ({ hour, addEvent }) => {
  const handleAddEvent = () => {
    addEvent(hour.time, hour.title);
  };

  return (
    <ul>
      <li className="liHours">{("0" + hour.time.hour()).slice(-2)}:00</li>
      <li
        className="liEvent"
        role="button"
        onClick={handleAddEvent}
      >
        { hour.title ? <button>{hour.title}</button> : null }
      </li>
    </ul>
  );
};

export default Hour;
