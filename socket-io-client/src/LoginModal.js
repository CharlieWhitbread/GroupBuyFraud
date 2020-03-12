import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

class LoginModal extends React.PureComponent {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);  
      this.state = {
        show: true,
        validated:false
      };
    }
  
    handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {

          event.preventDefault();
          event.stopPropagation();
        }
        else{
            event.preventDefault();
            this.setState({ show: false });


            var values = [form.elements.myName.value,form.elements.compName.value]

            this.props.updateParent(values);

            

        }
      }
    
  
    handleShow() {
      this.setState({ show: true });
    }
  
    render() {
        const {validated} = this.state;
        
      return (
          <Modal size='lg' show={this.state.show} backdrop='static' onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Who are you?</Modal.Title>
            </Modal.Header>



            <Form
            noValidate
            validated={validated}
            onSubmit={e => this.handleSubmit(e)}
            >
            <Modal.Body>

                <Form.Group controlId="formBasicName">
                    <Form.Label>Your name.</Form.Label>
                    <Form.Control name="myName" required placeholder="Showard Hultz" />
                    <Form.Text className="text-muted">
  
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicCompName">
                    <Form.Label>Company Name.</Form.Label>
                    <Form.Control name="compName" required placeholder="Barstucks" />
                </Form.Group>
                <Form.Group controlId="formBasicColour">

                <Form.Label>Choose Colour</Form.Label>


                <ButtonToolbar>
                    <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                    <ToggleButton variant="primary" className="chooseColorButton" value={1}></ToggleButton>
                    <ToggleButton variant="success" className="chooseColorButton" value={2}></ToggleButton>
                    <ToggleButton variant="warning" className="chooseColorButton" value={3}></ToggleButton>
                    <ToggleButton variant="danger" className="chooseColorButton" value={4}></ToggleButton>
                    <ToggleButton variant="secondary" className="chooseColorButton" value={5}></ToggleButton>
                    <ToggleButton variant="info" className="chooseColorButton" value={6}></ToggleButton>
                    <ToggleButton variant="dark" className="chooseColorButton" value={7}></ToggleButton>

                    </ToggleButtonGroup>
                </ButtonToolbar>
                </Form.Group>
            </Modal.Body>
               
                

            <Modal.Footer>
              <Button type="submit" variant="success">
                Lets Go!
              </Button>
            </Modal.Footer>
            
            </Form>
          </Modal>
      );
    }
  }

export default LoginModal;
