import React from 'react';
import calsses from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = () => (
    <ul className={calsses.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>

    </ul>
);

export default navigationItems;