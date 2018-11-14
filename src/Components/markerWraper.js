import React from 'react';
import {Marker} from 'google-maps-react';

class MyMarker extends Marker  {
    shouldComponentUpdate(nextProp) {
        return nextProp.icon!==this.props.icon;
    }
	render() {
	    return (
	    <Marker
	    title={this.props.title}
	    name={this.props.name}
	    icon={this.props.icon}
	    position={this.props.position} />);
	}
}
export default MyMarker;