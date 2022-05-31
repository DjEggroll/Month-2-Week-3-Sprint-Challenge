import React, { useState } from 'react';
import * as yup from 'yup';
import formSchema from "./validation/formSchema.js";

export default function Pizza() {

    //INITIAL STATES
    const initialFormValues = {
        name: '',
        size: '',
        pepperoni: false,
        mushroom: false,
        bacon: false,
        sausage: false,
        special: '',
    }

    //STATES
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState('');


    //HELPERS

    const validate = (name, value) => {
        yup.reach(formSchema, name).validate(value)
            .then(() => setFormErrors(''))
            .catch(() => setFormErrors('name must be at least 2 characters'))
    }

    const submit = () => {
        
    }


    return(
        <div>
            <form id="pizza-form">
                <label>
                    Name:
                    <input type="text" name="name" id="name-input" />
                </label>

                <label>
                    Size:
                    <select id="size-dropdown" name="size">
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </label>

                <label>
                    Toppings:
                    <input type="checkbox" name="pepperoni">Pepperoni</input>
                    <input type="checkbox" name="mushroom">Mushroom</input>
                    <input type="checkbox" name="bacon">Bacon</input>
                    <input type="checkbox" name="sausage">Sausage</input>
                </label>

                <label>
                    Special Instructions:
                    <input type="text" name="special" id="special-text" />
                </label>

                <button id="order-button" onsubmit={submit}>Order</button>
            </form>
        </div>
    )
}