import React, {Component} from 'react';
import { Input, Button, ListGroup ,ListGroupItem} from 'mdbreact';
import '../CSS/searchmodal.css';

class SearchModal extends Component {
  render() {
      const active = this.props.isOpen ? "rightpanel active" : "rightpanel";
      const tab =  this.props.isOpen ? false: -1;
    return (
        //<Modal isOpen={this.props.isOpen} toggle={() => this.props.toggle()} fullHeight position="right">
        //  <ModalBody>
        //    <form>
        //         <Input label="Search - type here" icon="search" onChange={this.props.handleInput} value={this.props.query}/>
        //    </form>
        //    <ListGroup className="fixedList">
        //            {this.props.places.map(item => (<ListGroupItem key={item.id} href="#" hover  onClick = {()=>this.props.itemClicked(item.id)}>{item.name}</ListGroupItem>))}
        //    </ListGroup>
        //  </ModalBody>
        //  <ModalFooter>
        //    <Button color="secondary" onClick={() => this.props.toggle()}>Close</Button>
        //  </ModalFooter>
        //</Modal>
        <div className={active}>
          <form>
                   <Input  tabindex={tab} className="searchinput" label="Search - type here" icon="search" onChange={this.props.handleInput} value={this.props.query}/>
              </form>
             <ListGroup className="fixedList">
                      {this.props.places.map(item => (<ListGroupItem  tabindex={tab} key={item.id} href="#" hover  onClick = {()=>this.props.itemClicked(item.id)}>{item.name}</ListGroupItem>))}
              </ListGroup>
            <Button  tabindex={tab} color="secondary" onClick={() => this.props.toggle()}>Close</Button>
        </div>
        
    );
  }
}

export default SearchModal;