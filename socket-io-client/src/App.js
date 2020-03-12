import React, { Component } from "react";
import socketIOClient from "socket.io-client";

import Listings from './Listings';
import Entry from './Entry';
import ListingViewer from './ListingViewer';


import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'

var socket;

class App extends React.Component {
  constructor(props) {
    super(props);
 
  this.state = {
    listings:[],
    selectedIndex:0,
    seller : 1,
    endpoint: "localhost:4001"
  }
  this.switchMode = this.switchMode.bind(this);
  this.updateSelectedListing = this.updateSelectedListing.bind(this);
  this.sendEntryToServer = this.sendEntryToServer.bind(this);
}

    componentDidMount(){
      socket = socketIOClient(this.state.endpoint);
      
      socket.on('test', (data) => {
        this.setState({listings:data})
    
      });
    }

    switchMode(){
      var currentState = this.state.seller;

      if(currentState == 0){
        this.setState({seller:1})
      }else{
        this.setState({seller:0})
      }
    }

    sendReportToServer(data){
      console.log("REPORT SENT")
      socket.emit("report received",data);
    }

    sendEntryToServer(data){
      data.selectedIndex = this.state.selectedIndex

      console.log(data);

      socket.emit('sendEntry',data);
      console.log("entry sent");
    }

    updateSelectedListing(data){
      this.setState({selectedIndex:data})
    }

  
  render() {
  
    const { listings } = this.state;
    const { seller } = this.state;
    const {selectedIndex} = this.state;


    return (
      <div>
       <div className="jumbotron">
          <h1 className="display-3">Group Buying</h1>

          <Form>
            <Form.Check 
              type="switch"
              id="custssom-switch"
              label="Buyer Mode"
              onChange = {this.switchMode}
            />    
          </Form>
         
        </div>
      
     
        <Container className="mainArea">
          <Row>
            <Col xs={5}>
              <Listings update={this.updateSelectedListing} listings={listings}/>
              </Col>
            <Col xm={7}>
              {seller == 1?<Entry onClick={this.sendEntryToServer}/>:
              <ListingViewer report={this.sendReportToServer} default={0} listing={listings[selectedIndex]}/>}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;