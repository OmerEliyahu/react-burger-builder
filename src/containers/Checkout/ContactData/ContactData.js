import React, {Component} from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withRouter} from 'react-router-dom';

class ContactData extends Component {
    state = {
        name: '',
        email:'',
        address : {
            street: '',
            zipCode: ''
        },
        loading:false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true});
        //alert('You Continuted');
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer : {
                name: 'Omer Eliyahu',
                addres: {
                    street: 'testStreet 1',
                    zipCode: '20692',
                    country: 'Israel'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fast delivery'
        }
        axios.post('/orders.json',order)
            .then (response => {
            console.log(response);
            this.setState({loading:false});
            this.props.history.push('/');
        }).catch(error => {
            console.log(error);
            this.setState({loading:false});
        });
        
    }

    render() {
        let form = (
            <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your name" />
            <input className={classes.Input} type="text" name="email" placeholder="Your email" />
            <input className={classes.Input} type="text" name="street" placeholder="street" />
            <input className={classes.Input} type="text" name="zipCode" placeholder="zipCode" />
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>

        </form>
        );

        if(this.state.loading)
        {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
               {form}
            </div>
        );
    }
}

export default withRouter(ContactData);