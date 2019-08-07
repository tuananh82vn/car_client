import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditCar extends Component{
    constructor(props){
        super(props);

        this.state = {snackbaropen: false, snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    snackbarClose = (event) =>{
      this.setState({snackbaropen:false});
    };

    handleSubmit(event){
        event.preventDefault();
        fetch('https://localhost:5001/api/car',{
          method:'PUT',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            Id: event.target.Id.value,
            Make: event.target.Make.value,
            Model: event.target.Model.value,
            Engine: event.target.Engine.value,
            Color: event.target.Color.value,
            Doors: event.target.Doors.value,
            Wheels: event.target.Wheels.value,
            BodyType: event.target.BodyType.value,
            VehicleType: 'Car'
          })
        })
        .then(res=> res.json())
        .then((result)=>
        {
          if(result.isSuccess){
            var first = result.info[0];
            this.setState({snackbaropen:true, snackbarmsg:first.message});
          }
          else
          {
            var first = result.errors[0];
            this.setState({snackbaropen:true, snackbarmsg:first.errorMessage});
          }
        },
        (error)=>{
          alert('Failed');
          this.setState({snackbaropen:true, snackbarmsg:'failed'});
        }
        )
    }


    render(){
        return(
          <div className="container">

          <Snackbar 
          anchorOrigin={{vertical:'bottom',horizontal:'center'}}
          open = {this.state.snackbaropen}
          autoHideDuration = {3000}
          onClose={this.snackbarClose}

          message = {<span id="message-id">{this.state.snackbarmsg}</span>}
          action={[
          <IconButton
          key="close"
          arial-label="Close"
          color="inherit"
          onClick={this.snackbarClose}
          >
            x
          </IconButton>
          ]}
          />


          <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Car
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
            <Row>
                <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>

                <Form.Group controlId="Id">
                <Form.Label>Id</Form.Label>
                <Form.Control
                  type="int"
                  name="Id"
                  required
                  disabled
                  defaultValue = {this.props.carid}
                  placeholder="Id"
                />
                </Form.Group>

                <Form.Group controlId="Make">
                <Form.Label>Make</Form.Label>
                <Form.Control
                  type="text"
                  name="Make"
                  required
                  placeholder="Make"
                  defaultValue = {this.props.carMake}
                />
                </Form.Group>

                <Form.Group controlId="Model">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  type="text"
                  name="Model"
                  required
                  placeholder="Model"
                  defaultValue = {this.props.carModel}
                />
                </Form.Group>

                <Form.Group controlId="Color">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  type="text"
                  name="Color"
                  required
                  placeholder="Color"
                  defaultValue = {this.props.carColor}
                />
                </Form.Group>

               
                <Form.Group controlId="Engine">
                <Form.Label>Engine</Form.Label>
                <Form.Control
                  type="text"
                  name="Engine"
                  placeholder="Engine"
                  defaultValue = {this.props.carEngine}

                />
                </Form.Group>

                <Form.Group controlId="Doors">
                <Form.Label>Doors</Form.Label>
                <Form.Control
                  type="int"
                  name="Doors"
                  placeholder="Doors"
                  defaultValue = {this.props.carDoors}
                />
                </Form.Group>

                
                <Form.Group controlId="Wheels">
                <Form.Label>Wheels</Form.Label>
                <Form.Control
                  type="int"
                  name="Wheels"
                  placeholder="Wheels"
                  defaultValue = {this.props.carWheels}
                />
                </Form.Group>

                <Form.Group controlId="BodyType">
                <Form.Label>BodyType</Form.Label>
                <Form.Control
                  type="text"
                  name="BodyType"
                  placeholder="BodyType"
                  defaultValue = {this.props.carBodyType}

                />
                </Form.Group>



                <Form.Group>
                    <Button variant="primary" type="submit">
                    Update Car
                    </Button>
                </Form.Group>
                </Form>
                </Col>
            </Row>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div>
        );
    }

}