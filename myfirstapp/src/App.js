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
  const [employee, setEmployee] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null); // State to track the selected slot

  // Sample employee list
  const employees = [
    'Alice',
    'Bob',
    'Charlie',
    'Diana',
    'Edward',
    'Fiona',
  ];

  const handleSelect = ({ start, end }) => {
    setStart(start);
    setEnd(end);
    setTitle(''); // Clear the title when selecting a time slot
    setEmployee(''); // Clear the employee selection
    setSelectedSlot({ start, end }); // Set the selected slot
  };

  const handleAddEvent = () => {
    if (!title || !employee || !selectedSlot) return; // Prevent adding empty events or missing employee
    const newEvent = {
      start: selectedSlot.start,
      end: selectedSlot.end,
      title,
      employee, // Add the selected employee
    };
    setEvents([...events, newEvent]);
    setTitle(''); // Clear title after adding event
    setEmployee(''); // Clear employee selection after adding event
    setSelectedSlot(null); // Reset selected slot after adding event
  };

  const handleDeleteEvent = (eventToDelete) => {
    const newEvents = events.filter(event => event !== eventToDelete);
    setEvents(newEvents);
  };

  const isSlotSelected = (slotStart, slotEnd) => {
    return selectedSlot && selectedSlot.start.getTime() === slotStart.getTime() && selectedSlot.end.getTime() === slotEnd.getTime();
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
        dayPropGetter={(date) => {
          return {
            className: isSlotSelected(start, end) ? 'highlight' : '',
          };
        }}
      />
      <div>
        <h3>Add Shift</h3>
        <input
          type="text"
          placeholder="Shift Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
        >
          <option value="" disabled>Select Employee</option>
          {employees.map((emp, index) => (
            <option key={index} value={emp}>{emp}</option>
          ))}
        </select>
        <button onClick={handleAddEvent}>Add Shift</button>
      </div>
      <h2>Scheduled Shifts</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {event.title} - {event.employee} - {moment(event.start).format('MMM D, YYYY h:mm A')} to {moment(event.end).format('h:mm A')}
            <button onClick={() => handleDeleteEvent(event)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
