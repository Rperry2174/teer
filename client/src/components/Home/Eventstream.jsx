import React from 'react';
import ReactDOM from 'react-dom';
import Event from './Event.jsx';

class Eventstream extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render () {
		var events = this.props.events;

    return (
    	<div className="eventstream">
    		{events.map((eventItem,i)=>
    			<Event
                    key={i}
    				eventImage={eventItem.img_url}
    				eventTitle={eventItem.name}
    				date={eventItem.start_date_hr}
    				organisation={eventItem.org_name}
    				eventId={eventItem.id}
    			/>
    		)}
    	</div>
  	)
  }
}

export default Eventstream;