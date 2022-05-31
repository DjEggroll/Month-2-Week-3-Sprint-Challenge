import React from 'react';
import {Route, Link, Switch} from 'react-router-dom';


export default function HomePage() {
    return(
        <div>
            <nav>
                <Link to="/pizza" id="order-pizza">Order</Link>
            </nav>
        </div>
    )
}