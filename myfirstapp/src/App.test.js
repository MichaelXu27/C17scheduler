import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';

// Set up the localizer by providing the moment Object to the correct localizer.
const localizer = momentLocalizer(moment);

const App = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const handleSelect = ({ start, end }) => {
    setStart(start);
    setEnd(end);
    setTitle('');
  };

  const handleAddEvent = () => {
    const newEvent = {
      start,
      end,
      title,
    };
    setEvents([...events, newEvent]);
    setTitle('');
  };

  const handleDeleteEvent = (eventToDelete) => {
    const newEvents = events.filter(event => event !== eventToDelete);
    setEvents(newEvents);
  };

  return (
    <div className="App">
      <h1>Shift Scheduler</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, margin: '50px' }}
        selectable
        onSelectSlot={handleSelect}
      />
      <div>
        <h3>Add Event</h3>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleAddEvent}>Add Shift</button>
      </div>
      <h2>Scheduled Shifts</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {event.title} - {moment(event.start).format('MMM D, YYYY h:mm A')} to {moment(event.end).format('h:mm A')}
            <button onClick={() => handleDeleteEvent(event)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
