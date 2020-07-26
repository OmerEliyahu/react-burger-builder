import React from 'react';
import calsses from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = () => (
    <ul className={calsses.NavigationItems}>
        <NavigationItem link="/" active={true}>Burger Builder</NavigationItem>
        <NavigationItem link="/">Checkout</NavigationItem>

    </ul>
);

export default navigationItems;