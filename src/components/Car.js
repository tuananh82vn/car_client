
import React,{Component} from 'react';

import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';

import {AddCar} from './AddCar';
import {EditCar} from './EditCar';



export class Car extends Component {
    
    constructor(probs){
        super(probs);

        this.state ={cars:[], addModalShow : false, editModalShow : false}

    };

    componentDidMount(){
        this.refreshList();
    }


    refreshList(){
       fetch('https://localhost:5001/api/car') 
       .then(response=> response.json())
       .then(data => {
        this.setState({cars:data});
       }
        );
    }

    deleteCar(carid)
    {
        if(window.confirm('Are you sure?'))
        {
            fetch('https://localhost:5001/api/car/'+carid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
          if (prevState.data !== this.state.data) {
            this.refreshList();
          }
    }


    render(){

        const {cars, carid, carMake, carModel, carColor , carEngine , carDoors, carWheels, carBodyType } = this.state;

        let addModalClose =() => this.setState({addModalShow:false});
        let editModalClose =() => this.setState({editModalShow:false});


        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Color</th>
                        <th>Engine</th>
                        <th>Doors</th>
                        <th>Wheels</th>
                        <th>BodyType</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map(car=>
                    <tr key ={car.id}> 
                        <td>{car.id}</td>
                        <td>{car.make}</td>
                        <td>{car.model}</td>
                        <td>{car.color}</td>
                        <td>{car.engine}</td>
                        <td>{car.doors}</td>
                        <td>{car.wheels}</td>
                        <td>{car.bodyType}</td>
                        <td>
<ButtonToolbar>
<Button
className="mr-2" variant="info"
onClick= {()=> this.setState({editModalShow:true, 
carid: car.id, 
carMake: car.make, 
carModel: car.model , 
carColor: car.color, 
carEngine: car.engine, 
carDoors: car.doors,
carWheels: car.wheels,
carBodyType: car.bodyType
})}
>
    Edit
</Button>

<Button className="mr-2" 
onClick={()=> this.deleteCar(car.id)} 
variant="danger"
>Delete</Button>

<EditCar
show = {this.state.editModalShow}
onHide={editModalClose}
carid = {carid}
carMake = {carMake}
carModel = {carModel}
carEngine = {carEngine}
carDoors = {carDoors}
carColor = {carColor}
carDoors = {carDoors}
carWheels = {carWheels}
carBodyType = {carBodyType}

/>


</ButtonToolbar>

                   </td>       
                    </tr>
                    )}
                </tbody>
                </Table>

                <ButtonToolbar>
                    <Button
                    variant='primary'
                    onClick={()=> this.setState({addModalShow: true})} 
                    >Add Car</Button>

                    <AddCar
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                    />

                </ButtonToolbar>
            </div>
        )
    }

}