import React, { Component } from "react";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";



class Entry extends React.Component { 

    constructor(props) {
        super(props);

        this.state = {
          trustedSeller: false
        }
    
    
        // This binding is necessary to make `this` work in the callback
        this.submitEntry = this.submitEntry.bind(this);
        this.toggleTrustedSeller = this.toggleTrustedSeller.bind(this);

      }
    
    submitEntry(){

        var entry = {title: this.title.value,
                     desc:  this.desc.value,
                    trustedSeller: this.state.trustedSeller}
                     
        this.props.onClick(entry);
    }

    toggleTrustedSeller(e){
      e.preventDefault();
      const currentTrust = this.state.trustedSeller;

      if(currentTrust == false){
        this.setState({trustedSeller:true})
      }else{
        this.setState({trustedSeller:false})

      }
      
    }

  render() {

    const {trustedSeller} = this.state;


    return (
        <div>

            <Form>

            <Row>
                <Col xs={10}>
                <Form.Control type="email" placeholder="Title" ref={(c) => this.title = c} />

                </Col>
                <Col xs={2}>

                <button onClick={this.toggleTrustedSeller} className={trustedSeller == true ?"clickedSeller trustSellerButton":"trustSellerButton"}><FontAwesomeIcon icon={faStar}/></button>
                </Col>
                <Col xs={12}>
                <Form.Control as="textarea" rows="10" placeholder="Description" ref={(c) => this.desc = c} />

                </Col>


                <Col>
            
            <Button 
            onClick={this.submitEntry}
            variant="primary" >
                Submit
            </Button>
           
            
            </Col>

                </Row>
            

            </Form>

       
      </div>
    );
  }



}


export default Entry;