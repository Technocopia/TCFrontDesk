import React from 'react';
import Table from 'react-bootstrap/Table';

import './style.css';

const preface = 'tcfd-slide-calendar-agenda';

const DATE_LOCALE = []; // 'en-US'
const DATE_OPTIONS = { weekday: 'long', month: 'long', day: 'numeric' };
const TIME_OPTIONS = { hour: '2-digit', minute: '2-digit' };
class CalendarAgenda extends React.Component {
  render = () => {
    const { events } = this.props;
    return (
      <div className={`${preface}`}>
        <h1 className={`${preface}-header`}>Upcoming Events</h1>
        <Table className={`${preface}-event-table`}>
          <tbody>
            {events && events.map((event, index) => (
              <tr key={index}>
                <td className={`${preface}-event-date`} align="right">
                  <div className="day">{new Date(event.start).toLocaleDateString(DATE_LOCALE, DATE_OPTIONS)}</div>
                  <div className="time">
                    {new Date(event.start).toLocaleTimeString(DATE_LOCALE, TIME_OPTIONS)}
                    {' '}
-
                    {' '}
                    {new Date(event.end).toLocaleTimeString(DATE_LOCALE, TIME_OPTIONS)}
                  </div>
                </td>
                <td className={`${preface}-title`}>{event.title}</td>
                <td align="left">
                  <div className={`${preface}-contact-name`}>{event.contactName}</div>
                  <div className={`${preface}-contact-email`}>{event.contactEmail}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
export default CalendarAgenda;
