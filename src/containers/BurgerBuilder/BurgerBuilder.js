import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliry';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat : 1.3,
    bacon : 0.7
}

class BurgerBuilder extends Component{

    state = {
        ingredients : null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    };

    componentDidMount() {
        axios.get('/ingredients.json')
        .then(response => {
            this.setState({ingredients : response.data});
        });
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    updatePurchaseState = (updatedIngredients) => {

        const sum = Object.keys(updatedIngredients)
            .map(igKey => {
                return updatedIngredients[igKey]
            })
            .reduce((sum,el) => {
                return sum+el;
            },0);

        this.setState({purchasable: sum>0});
    }

    addIngredientHandler = (type) => {
        const oldCount= this.state.ingredients[type];
        const updatedCount=oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type]= updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;

        this.setState({totalPrice : newPrice, ingredients : updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount= this.state.ingredients[type];
        if(oldCount===0)
        {
            return;
        }

        const updatedCount=oldCount-1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type]= updatedCount;
        const priceReduce = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice - priceReduce;

        this.setState({totalPrice : newPrice, ingredients : updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinuteHandler = () => {
        this.setState({loading:true});
        //alert('You Continuted');
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
            this.setState({loading:false, purchasing:false});
        }).catch(error => {
            console.log(error);
            this.setState({loading:false, purchasing:false});
        });

    }
    render(){

        let orderSummary = null;

        let burger = <Spinner/>

        if(this.state.ingredients != null)
        {
            
            orderSummary =  <OrderSummary ingredients={this.state.ingredients}
            purchaseCanceld={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinuteHandler}
            price={this.state.totalPrice} />;
             burger =<Aux>
                    <Burger ingredients={this.state.ingredients}/>
                        <BuildControls
                            ingredientAdded={this.addIngredientHandler}
                            ingredientRemoved={this.removeIngredientHandler}
                            price={this.state.totalPrice} 
                            purchasable={this.state.purchasable}
                            ordered = {this.purchaseHandler} />
                    </Aux>  
        }

        
        if(this.state.loading)
        {
            orderSummary = <Spinner/>;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                {orderSummary}
                </Modal>
                {burger}
               
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);