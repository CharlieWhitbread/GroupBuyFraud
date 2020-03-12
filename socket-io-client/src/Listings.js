import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from "react-bootstrap/Row";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileSignature } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

class Listings extends React.Component { 
  constructor(props) {
    super(props);

      this.state = {
        clickedIndex: 0
      };

    // This binding is necessary to make `this` work in the callback
    this.clickListing = this.clickListing.bind(this);
  }


  clickListing(index){
    this.setState({clickedIndex:index})
    this.props.update(index)
  }
  

  render() {


    const {clickedIndex} = this.state;
    const listings = this.props.listings.map((listing,index) =>
    // Correct! Key should be specified inside the array.
    <Listing title={listing.title}
             desc={listing.desc}
             clicked={index == clickedIndex?true:false}
             value = {index}
             offer = {listing.offer}
             users = {listing.users}
             onClick = {this.clickListing}
             />

  );


    return (
        <div>
          {listings}
      </div>
    );
  }
}

class Listing extends React.Component { 
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.sendClick = this.sendClick.bind(this);
  }

  sendClick(){
    this.props.onClick(this.props.value)
  }

  render(){

    return(

    <Card 
    onClick={this.sendClick}
    className={this.props.clicked == true?"clickedListing listing":"listing"}>

      <Card.Body>

      <Card.Title>
        {this.props.title}
      </Card.Title>
      <Card.Text>
      {this.props.desc}
      </Card.Text>

      <Card.Footer className="text-muted">
        <Row>
          <Col>
          <FontAwesomeIcon icon={faUsers}/> {this.props.users}
          </Col>
          <Col className="offerCount">
          <FontAwesomeIcon icon={faFileSignature}/> {this.props.offer.length}
          </Col>
        </Row>
      </Card.Footer>
        
        
        
        </Card.Body>
      </Card>
    )
  }

}


export default Listings;