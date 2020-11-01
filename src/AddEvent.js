import React, { useState, useEffect } from 'react';

const AddEvent = ({ className, hide, time, addEvent, deleteEvent, existingTitle }) => {
  const [title, setTitle] = useState(existingTitle);

  useEffect(() => {
    setTitle(existingTitle);
  }, [existingTitle])

  const reset = () => {
    setTitle('');
    hide();
  }

  const handleAddEvent = (e) => {
    e.preventDefault();
    addEvent({
      title,
      from: time
    });

    reset();
  }

  const handleDeleteEvent = (e) => {
    e.preventDefault();
    deleteEvent(time)

    reset();
  }
  return (
    <div className={`eventDiv ${className}`}>
      <div className="innerDiv">
        <button className="buttonClose" onClick={hide}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <form onSubmit={handleAddEvent}>
          <div className="form">
            <input className="event" autocomplete="off" id="event" type="text" placeholder="Add event title" value={title} onChange={e => setTitle(e.target.value)} />
            <table className="inputDiv">
              <tr>
                <td>Date: </td>
                <td className="table-content">{time?.format('MMM D, YYYY')}</td>
              </tr>
              <tr>
                <td>Time: </td>
                <td className="table-content">{time?.format('h:mm A')} - {time?.hour(time.hour() + 1).format('h:mm A')}</td>
              </tr>
            </table>
            <div className="event-button">
              {existingTitle ? <button className="delete-button" type="button" onClick={handleDeleteEvent}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </button> : null}
              <button className="save-button" type="submit">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEvent;
