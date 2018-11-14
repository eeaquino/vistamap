const ClientID = 'AL5UNPG2TZW4QDUN4SQQGPWLJD0CZSO3MRFVI5U43NWIXXBD';
const Secret = '3ABGAVGKWYEECVJHDDQXCBPURYATENBBUBJUOBFCWL5BY1F2';
const url = 'https://api.foursquare.com/v2/venues';
const location = '33.2015337,-117.251165';
const version = '20180323';
export const getPlaces = (query) => 
    fetch(`${url}/explore?client_id=${ClientID}&client_secret=${Secret}&limit=50&radius=5000&v=${version}&ll=${location}&query=${query}`)
        .then(res =>
        {
            return res.json().then(val =>
            {
                if (val && val.meta.code === 200) { 
                    return val.response.groups[0].items.map(venue =>
                        {
                            let v = venue.venue;
                            return {
                                id: v.id,
                                location: { lat: v.location.lat, lng: v.location.lng },
                                name: v.name,
                                address: v.location.formattedAddress,
                                category: (v.categories.length > 0 ? v.categories[0].name : "")
                            }
                        }
                    );
                }
                return false;
            });
        
        })
        .catch(function() {
            return false;
        });
export const getPhotos = (id)=>
    fetch(`${url}/${id}/photos?client_id=${ClientID}&client_secret=${Secret}&v=${version}&limit=2`)
        .then(res =>
        {
            return res.json().then(val =>
            {
                if (val && val.meta.code === 200) {
                    return val.response.photos.items.map(photo =>
                    {
                        return  `${photo.prefix}height300${photo.suffix}`
                    })
                }
                return false;
            });
        }).catch(function() {
            return false;
        })
export const getDetails = (id)=>
    fetch(`${url}/${id}?client_id=${ClientID}&client_secret=${Secret}&v=${version}&limit=2`)
    .then(res =>
    {
        return res.json().then(val =>
        {
            if (val && val.meta.code === 200) {
                return val.response.venue;
            }
            return false;
        });
    }).catch(function() {
        return false;
    })