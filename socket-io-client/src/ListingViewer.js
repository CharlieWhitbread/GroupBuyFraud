import React, { Component } from "react";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag } from '@fortawesome/free-solid-svg-icons'
class ListingViewer extends React.Component { 

    constructor(props) {
        super(props);

        this.state = {
            selectedView : 0
        }

    
    
        // This binding is necessary to make `this` work in the callback
        this.changeView = this.changeView.bind(this);        
        this.sendReport = this.sendReport.bind(this);

      }

      //reset state when props change
      componentDidUpdate(oldProps) {
        const newProps = this.props
        if(oldProps.listing !== newProps.listing) {
          this.setState({selectedView:0 })
        }
      }

      sendReport(){
          var currentOffer = this.props.listing.offer[this.state.selectedView]
          var data = {"title":currentOffer.title,"desc":currentOffer.desc}
          this.props.report(data);
      }


      changeView(e){
        console.log(e.target.value);

        // all offers
        for (let index = 0; index < this.props.listing.offer.length; index++) {
            if(e.target.value == this.props.listing.offer[index].title ){
                this.setState({selectedView:index})
            }
            
        }
      }
    

  render() {

    console.log(this.props.listing.offer.length);
    const {selectedView} = this.state;

    const options = this.props.listing.offer.map((offer,index) =>
    <option index={index}>{offer.title}</option>
    );

    

    return (
        
        <div className="listingView">
            {this.props.listing.offer.length < 1?<h5>No Offers</h5>:<div>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control onChange={this.changeView} as="select">
                    {options}
                </Form.Control>
            </Form.Group>
            <div className="listingDescView">{this.props.listing.offer[selectedView].desc}</div>
            <button onClick={this.sendReport}className="reportButton"><FontAwesomeIcon icon={faFlag}/> {this.props.users}</button>
            </div>}
      </div>
    );

}
}


export default ListingViewer;