import { useState } from 'react';
import axios from 'axios';

export default function useForm({ initialValues }) {
    const [values, setValues] = useState(initialValues || {});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
//track form values
const handle_change = event => {
    const value = event.target.value;
    const name = event.target.name;
       setValues({
          ...values,
          [name]: value
        });
     };
//submit form when submit button is clicked
const handle_submit = event => {
     event.preventDefault();
     submitData({ values });
};
//send data to database
const submitData = async (formValues) => {
     // console.log(formValues.values)
     // const url = 'http://localhost:3001';
     const url = 'https://houseapi1.herokuapp.com';
     const dataObject = formValues.values;
     const { firstname, lastname, houseId, email, gender } = dataObject;
     try {
     await axios ({
     method: 'POST',
     url: `${url}/applicant/add`,
     data: {
     firstname: firstname,
     lastname: lastname,
     houseId: houseId,
     email: email,
     gender: gender
     },
     headers: new Headers({ 'Content-Type': 'application/json' })
     }).then(res => {
          setSuccess(res.data.message);
     })
     }
     catch(err) {
          setError(err.response.data);
     }
};
return {
   handle_change,
   values,
   handle_submit,
   error,
   success
}}