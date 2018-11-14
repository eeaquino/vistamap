import React, {Component} from 'react';
import { Badge,Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';


class ItemModal extends Component {
  render() {
    return (
      <Container>
        <Modal isOpen={this.props.isOpen} toggle={() => this.props.toggle()} size='lg'>
                <ModalHeader toggle={() => this.props.toggle()}>{this.props.item.name}</ModalHeader>
          <ModalBody>
            {
                        this.props.item.photos && this.props.item.photos[0] &&
                        <img 
                        className="mx-auto d-inline-block img-thumbnail" 
                        src={this.props.item.photos[0]} 
                        alt= {this.props.item.name} />
            }
                    <div> {this.props.item.address.map((el,i) => (<div key= {i} > { el } </div>))} </div>
          <Badge color="indigo" pill> {this.props.item.category} </Badge>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.props.toggle()}>Close</Button>
          </ModalFooter>
        </Modal>
        
      </Container>
    );
  }
}

export default ItemModal;