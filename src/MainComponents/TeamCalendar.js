import React from 'react';
import ReactDOM from 'react-dom';
import EventCalendar from 'react-event-calendar'

// const EventCalendar = require('react-event-calendar');

const events = [
    {
        start: '2020-06-18',
        end: '2015-06-20',
        eventClasses: 'optionalEvent',
        title: 'test event1',
        description: 'This is a test description of an event',
    },
    {
        start: '2020-06-01',
        end: '2020-06-01',
        title: 'test event2',
        description: 'This is a test description of an event',
        data: 'you can add what ever random data you may want to use later',
    },
];

const Payment=()=>(
    <div>
        <EventCalendar 
            month={6}
            year={2020}
            events={events} 
            onEventClick={(target, eventData, day) => console.log(eventData)}/>
    </div>
)

export default Payment
