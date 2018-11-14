import React, { Component } from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import MapContainer from './Components/mainmap';
import MapNavBar from './Components/menu';
import * as fsAPI from './Components/fsapi'
import ItemModal from './Components/itemModal'
import SearchModal from './Components/searchModal'
import { Fa, Button,ToastContainer, toast,Badge } from 'mdbreact';
import * as db from './Components/database'

class App extends Component {
    state = {
        places : [],
        itemModal:false,
        searchModal:false,
        query: '',
        openItem: {
            photos:[],
            details: {},
            address:[""],
            category:"",
            name:"",
            id:""
        }
    }
    componentDidMount() {
        db.openDB().then(() =>
        {
            let type = this.props.match.params.type ? this.props.match.params.type : 'Food';
            this.getPlacesFromType(type);
        })
        setTimeout(() =>
        {
            let main = document.getElementsByTagName("MAIN")[0];
            console.log(main)
            if (main.innerHTML.toLowerCase().includes("loading")) {
                toast.error("There was a problem loading the map,wait a few seconds if it does not load please check your internet connection")
            }
        },1000)    
        
        
    }
    onSearchEntered = (e) =>
    {
        clearTimeout(this.timer);
        let query = e.target.value.trim();
        this.setState({query:e.target.value});
        this.timer = setTimeout(() => {
            let type = this.props.match.params.type ? this.props.match.params.type : 'Food';
            if (query === "") {
               
                this.getPlacesFromType(type);
                return;
            }
            this.searchPlaces(query,type).then(places =>
            {
                this.setState({places});
            },500)
        })
        
    }
    searchPlaces(query,type)
        {
            return db.getData(type.toLocaleLowerCase(), "places").then(cachedPlaces =>
            {
                if (!cachedPlaces) {
                    fsAPI.getPlaces((type)).then(places =>
                    {
                        if (!places) {
                            toast.error('Could not connect to API. Please try again later.');
                            return;
                        }
                        return places.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
                    });
                }
                return cachedPlaces.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
            })
        }
    getPlacesFromType(type) {
        db.getData(type.toLocaleLowerCase(), "places").then(cachedPlaces =>
        {
            if (cachedPlaces)  this.setState( { places:cachedPlaces });
            fsAPI.getPlaces((type)).then(places =>
            {
                if (!places) {
                    toast.error('Could not connect to API. Please try again later.');
                    return;
                }
                db.setData(type.toLocaleLowerCase(), "places", places);
                this.setState( { places });
            });
        })
    }
    onChangeLocationType = (type) =>
    {
        this.getPlacesFromType(type);
    }
    isSelected = (id) =>
    {
        return this.state.openItem.id===id
    }
    toggleItem=()=> {
        this.setState({
            itemModal: !this.state.itemModal
        });
    }
    toggleSearch=()=> {
        this.setState({
            searchModal: !this.state.searchModal
        });
    }
    loadBasicData(item) {
        let selected = this.state.places.filter(element => element.id === item);
        this.setState({ itemModal: true, openItem: { photos: [], details: {}, address: selected[0].address, category: selected[0].category, name: selected[0].name,id:item } });

    }
    loadFromAPI(item,type) {
        fsAPI.getPhotos(item).then(photos =>
        {
            let details = [];
            if (!photos) {
                this.loadBasicData(item);
                return;
            }
            fsAPI.getDetails(item).then(iDetails =>
            {
                if (!iDetails) {
                    this.loadBasicData(item);
                    return;
                }
                let selected = this.state.places.filter(element => element.id === item);
                details.push( { photos, details:iDetails, address: selected[0].address, category: selected[0].category, name: selected[0].name,id:item })
                db.setData(type.toLocaleLowerCase(), "details",details);
                this.setState({ itemModal: true, openItem: { photos, details:iDetails, address: selected[0].address, category: selected[0].category, name: selected[0].name,id:item } });
            })
        })
    }
    onItemClicked = (item) =>
    {
        let type = this.props.match.params.type ? this.props.match.params.type : 'Food';
        db.getData(type.toLocaleLowerCase(), "details").then(cachedDetails =>
        {
            let details = [];
            if (cachedDetails) {
                details = cachedDetails;
            }
            let selectedIndex = details.findIndex(x => x.id === item);
            if (selectedIndex !== -1) {
                let selected = details[selectedIndex];
                this.setState({ itemModal: true, openItem: selected });
                return;
            }
            this.loadFromAPI(item,type);
        });
        
    }
    clearFilter=()=> {
        let type = this.props.match.params.type ? this.props.match.params.type : 'Food';
        this.getPlacesFromType(type);
        this.setState({ query: "" });
    }
  render() {
    return (
      <div className="App">
          <div className="d-flex p-0 m-0 ">
              <div className="col p-0 m-0">
                  <header>
                        <MapNavBar   changeLocation={this.onChangeLocationType} openSearch={this.toggleSearch} />
                  </header>
                  <main className="col h-100 p-0 m-0">
                        <MapContainer places={this.state.places} itemClicked={this.onItemClicked} isSelected={this.isSelected} item={this.state.openItem}/>
                  </main>
              </div>
              <SearchModal toggle={this.toggleSearch} isOpen={this.state.searchModal} places={this.state.places} handleInput={this.onSearchEntered} query={this.state.query} itemClicked={this.onItemClicked}/>
          </div>
          <ItemModal toggle={this.toggleItem} isOpen={this.state.itemModal}  item={this.state.openItem}/>
          
          <ToastContainer
          hideProgressBar={false}
          newestOnTop={true}
          autoClose={15000}
          />
              
            <Badge className="filter" color="indigo" pill>Filter: {this.state.query} <Button onClick= {this.clearFilter} color="info" className="p-1 pl-2 pr-2 rounded-circle m-0 ml-2"><Fa  icon="close" aria-hidden="false"/></Button></Badge>
              
              
         
      </div>

    );
  }
}

export default App;
