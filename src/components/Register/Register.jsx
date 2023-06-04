import React, { useEffect, useState } from "react";
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from "react-router-dom";

export default function Register() {
    let [user, setUser] = useState({
        first_name: "",
        last_name: "",
        age: 0,
        email: "",
        password: ""
    })
    let [validationError, setValidationError] = useState([]);
    let [apiError, setApiError] = useState(null);
    let [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();


    function getUserData(e) {
        let currentUser = { ...user };
        currentUser[e.target.name] = e.target.value;
        setUser(currentUser)
    }

    useEffect(() => {
        console.log(user)
    }, [user]);

    async function register(e) {
        e.preventDefault();

        if (validateUser()) {
            setIsLoading(true);
            let { data } = await axios.post('https://route-movies-api.vercel.app/signup', user);
            console.log(data);
            if(data.message == "success"){
                navigate('/login');
                setIsLoading(false);
                setApiError(null);
            }else{
                setApiError(data.message);
                setIsLoading(false);
            }
        }
    }

    function validateUser() {
        let schema = Joi.object({
            first_name: Joi.string().min(3).max(10).required().messages({
                "string.empty": "first name is required",
                "string.min": "you have to enter more than 3 characters"
            }),
            last_name: Joi.string().min(3).max(10).required().messages({
                "string.empty": "last name is required",
                "string.min": "you have to enter more than 3 characters"
            }),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).messages({
                "string.empty":"email is required"
            }),
            password: Joi.string().pattern(new RegExp(/^[A-Za-z0-9]{3,8}$/)).messages({
                "string.empty":"password is required",
                "string.pattern.base": "password must contain more than 3 characters or numbers "
            }),
            age: Joi.number().min(16).max(35).required().messages({
                "number.min":"age must be greater than or equal to 16"
            })
        });

        let validations = schema.validate(user, { abortEarly: false });
        console.log(validations);
        if (validations.error) {
            setValidationError(validations.error.details);
            return false
        } else {
            return true
        }
    }
    return (
        <>
            <div className="mx-3 mx-md-0">
                <div className="container pt-3 pb-5 bg-login">
                    <div className="mx-auto w-75">
                        <h2 className="mt-5 mb-4">Registration form</h2>
                        {apiError && <div className="alert alert-danger">{apiError}</div>}

                        <form onSubmit={(e) => register(e)}>
                            <div className="form-group mb-3">
                                <label htmlFor="first_name">First Name</label>
                                <input onChange={(e) => getUserData(e)} type="text" id="first_name" className= {validationError.filter(ele => ele.context.label == "first_name")[0]?.message? "form-control is-invalid ":"form-control"} name="first_name" />
                                <div className="text-danger">
                                {validationError.filter(ele => ele.context.label == "first_name")[0]?.message}
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="last_name">Last Name</label>
                                <input type="text" id="last_name" onChange={(e) => getUserData(e)} className= {validationError.filter(ele => ele.context.label == "last_name")[0]?.message? "form-control is-invalid ":"form-control"} name="last_name" />
                                <div className="text-danger">
                                {validationError.filter(ele => ele.context.label == "last_name")[0]?.message}
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" onChange={(e) => getUserData(e)} className= {validationError.filter(ele => ele.context.label == "email")[0]?.message? "form-control is-invalid ":"form-control"} name="email" />
                                <div className="text-danger">
                                {validationError.filter(ele => ele.context.label == "email")[0]?.message}
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" onChange={(e) => getUserData(e)} className= {validationError.filter(ele => ele.context.label == "password")[0]?.message? "form-control is-invalid ":"form-control"} name="password" />
                               <div className="text-danger">
                               {validationError.filter(ele => ele.context.label == "password")[0]?.message}
                               </div>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="age">Age</label>
                                <input type="number" id="age" onChange={(e) => getUserData(e)} className= {validationError.filter(ele => ele.context.label == "age")[0]?.message? "form-control is-invalid ":"form-control"} name="age" />
                               <div className="text-danger">
                               {validationError.filter(ele => ele.context.label == "age")[0]?.message}
                               </div>
                            </div>
                            <button className="btn btn-info d-flex ms-auto  btn-bg ">
                                {isLoading?<i className="fa fa-spinner fa-spin"></i>:"Sign Up"}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}