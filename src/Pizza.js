import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import formSchema from "./validation/formSchema.js";
import axios from "axios";

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

    const initialOrders = [];

    //STATES
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState('');
    const [orders, setOrders] = useState(initialOrders);
    const [disabled, setDisabled] = useState(true);


    //HELPERS

    const validate = (name, value) => {
        yup.reach(formSchema, name).validate(value)
            .then(() => setFormErrors(''))
            .catch(() => setFormErrors('name must be at least 2 characters'))
    }

    const inputChange = e => {
        const {name, value, checked, type } = e.target;
        const valueToUse = type === "checkbox" ? checked : value;
        validate(name, valueToUse);
        setFormValues({...formValues, [name]: valueToUse});
    }

    const submit = (e) => {

        e.preventDefault();

        const newOrder = {
            name: formValues.name.trim(),
            size: formValues.size,
            special: formValues.special.trim(),
            toppings: ["pepperoni", "mushroom", "bacon", "sausage"].filter(top => formValues[top])
        }

        axios.post("https://reqres.in/api/orders", newOrder)
            .then(res => {
                setOrders([...orders, res.data]);
            })
            .catch(err => console.error(err))
            .finally(() => setFormValues(initialFormValues))
        }
    

    //SIDE EFFECTS

    useEffect(() => {
        formSchema.isValid(formValues).then(valid => setDisabled(!valid))
    }, [formValues]);

    return(
        <div>
            <div>
                <h1>{formErrors}</h1>
            </div>
            <form id="pizza-form" onSubmit={submit}>
                <label>
                    Name:
                    <input type="text" name="name" id="name-input" value={formValues.name} onChange={inputChange}/>
                </label>

                <label>
                    Size:
                    <select id="size-dropdown" name="size" value={formValues.size} onChange={inputChange}>
                        <option value=''>Select a Size</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </label>
                <div> Toppings: <br />
                    <label>
                        Pepperoni
                        <input type="checkbox" name="pepperoni" onChange={inputChange} checked={formValues.pepperoni}/>
                    </label>
                    <label>
                        Mushroom
                        <input type="checkbox" name="mushroom" onChange={inputChange}checked={formValues.mushroom}/>
                    </label>
                    <label>
                        Bacon
                        <input type="checkbox" name="bacon" onChange={inputChange} checked={formValues.bacon}/>
                    </label>
                    <label>
                        Sausage
                        <input type="checkbox" name="sausage" onChange={inputChange} checked={formValues.sausage}/>
                    </label>
                </div>

                <label>
                    Special Instructions:
                    <input type="text" name="special" id="special-text" value={formValues.special} onChange={inputChange}/>
                </label>

                <br />

                <button disabled={disabled} id="order-button">Order</button>
            </form>
        </div>
    )
}