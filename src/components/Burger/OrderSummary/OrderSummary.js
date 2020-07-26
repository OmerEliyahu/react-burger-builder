import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliry';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component
{
    componentDidUpdate(){
        console.log('[OrderSummary] will update');
    }

    render() {
    const ingredientSummary= Object.keys(this.props.ingredients)
        .map(igKey => {
        return <li key={igKey}>
            <span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li>
        });
    
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicous burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price:{this.props.price.toFixed(2)} $ </strong></p>
            <p>Continute for checkout</p>
            <Button btnType="Danger" clicked={this.props.purchaseCanceld}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )

}

}
export default OrderSummary;