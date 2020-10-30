import React, { useEffect, useState } from 'react'
import classNames from 'classnames';

import './style.css'
import dayjs from 'dayjs';

const Monthly = ({ showDate, selectedDate, events }) => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const dates__clone = [];
    const dow = selectedDate.clone().date(1).day();

    for (let i = 1; i <= dow; i++) dates__clone.push({}); // Adds blank days before the first day
    for (let i = 1; i <= selectedDate.daysInMonth(); i++) {
      let dayjsDate = selectedDate.clone();
      let date = { day: dayjsDate.date(i) };
      if (
        selectedDate.format('MMYY') === dayjs().format('MMYY')
        && dayjs().date() === i
      ) {
        date.today = true;
      }
      dates__clone.push(date);
    }

    setDates(dates__clone);

  }, [selectedDate.format('DDMMYY')]);

  return (
    <div className="main">
      <div className="day">
        {
          ['Sun', 'Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat']
            .map((day) => <div key={day}>{day}</div>)
        }
      </div>

      <div className="date">
        {
          dates.map((item, index) => {
            return (
              <>
                {
                  item.day ?
                    <div
                      key={index}
                      role="button"
                      onClick={() => {
                        showDate(item.day);
                      }}
                      className={classNames('dateBox', {
                        'disabled': !Boolean(item.day)
                      })}
                    >
                      <div className="dateNumber">
                        {
                          item.today ?
                            <div className="today">
                              {item.day?.date()}
                            </div> : (item.day?.date())
                        }
                      </div>
                      {
                        events.map((eve) => {
                          return (
                            <div className="eventBox" key={eve.from}>{
                              eve.from?.date() == item.day?.date() &&
                                eve.from?.month() == item.day?.month() &&
                                eve.from?.year() == item.day?.year() ?
                                <button className="eventTitle">
                                  {eve.title}
                                </button> : null
                            }</div>
                          )
                        })
                      }
                    </div>
                    :
                    <div key={index} className={classNames('dateBox', { 'disabled': !Boolean(item.day) })}></div>
                }
              </>
            )
          })
        }
      </div>

    </div>
  )
}

export default Monthly