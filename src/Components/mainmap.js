import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import equal from 'fast-deep-equal'
import MyMarker from './markerWraper'

class MapContainer extends Component {
    shouldComponentUpdate(nextProp) {
        return !equal(nextProp,this.props);
    }
    
    render() {
        const style = {
            width: '100%', 
            height: '100%', 
            position: 'relative'
        }
        return (
            <div className="map-container" role="application">
                <Map google={this.props.google} 
                
                style={style}
                className={'map'} 
                initialCenter={{
                    lat: 33.2015337,
                    lng: -117.251165
                }}
                 disableDefaultUI={true}
                zoom={14}>
                    {this.props.places.map(v =>
                        (<MyMarker  key={v.id}
                                title={v.name}
                                name={v.name}
                                icon={(this.props.isSelected(v.id)?'/img/marker.png':'/img/regular.png')}
                                position={{lat:v.location.lat, lng: v.location.lng}}
                                onClick = {()=>this.props.itemClicked(v.id)}/>
                        ))
                    }
                </Map>
            </div>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCQnPVlSaGpgrIVWpRm-W4q-HasgAdV58w'
    //Load error handeling in App.js
})(MapContainer)