import React, { useEffect, useState } from "react";
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Login({saveUser}) {
  
    let [user, setUser] = useState({
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
  
    }, [user]);

    async function login(e) {
        e.preventDefault();

        if (validateUser()) {
            setIsLoading(true);
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', user);
           console.log(data)
            if(data.message == "success"){
                localStorage.setItem('token',data.token)
                saveUser();
                navigate('/');
                
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
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).messages({
                "string.empty":"email is required"
            }),
            password: Joi.string().pattern(new RegExp(/^[A-Za-z0-9]{3,8}$/)).messages({
                "string.empty":"password is required",
                "string.pattern.base": "password must contain more than 3 characters or numbers "
            })
        });

        let validations = schema.validate(user, { abortEarly: false });

        if (validations.error) {
            setValidationError(validations.error.details);
            return false
        } else {
            return true
        }
    }
    return (
        <>
         <div className="background">
         <div className="content-login">
         <div className="mx-3 mx-md-0">
                <div className="container pt-3 pb-5 bg-login">
                    <div className="mx-auto w-75">
                        <h2 className="mt-5 mb-4 login-color">Login form</h2>
                        {apiError && <div className="alert alert-danger">{apiError}</div>}

                        <form onSubmit={(e) => login(e)}>
                            
                            <div className="form-group mb-3">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" onChange={(e) => getUserData(e)} className= {validationError.filter(ele => ele.context.label == "email")[0]?.message? "form-control is-invalid ":"form-control"} name="email" />
                                <div className="text-danger">
                                {validationError.filter(ele => ele.context.label == "email")[0]?.message}
                                </div>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" onChange={(e) => getUserData(e)} className= {validationError.filter(ele => ele.context.label == "password")[0]?.message? "form-control is-invalid ":"form-control"} name="password" />
                               <div className="text-danger">
                               {validationError.filter(ele => ele.context.label == "password")[0]?.message}
                               </div>
                            </div>
                            <div className="text text-center mb-2 d-flex me-auto">
                                <span className=" logo">Not a member yet?</span>
                                <Link  to="/register" className="text-decoration-none text-white fw-bold ms-2">Create Account</Link>
                                </div>
                            <button className="btn btn-danger d-flex ms-auto  btn-bg ">
                                {isLoading?<i className="fa fa-spinner fa-spin"></i>:"Login"}
                            </button>

                        </form>
                    </div>

                </div>
            </div>
         </div>
         </div>
        </>
    )
}