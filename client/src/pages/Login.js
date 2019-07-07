import React, { useState, Fragment, useContext } from 'react';
import {AuthContext} from '../context/Auth'
import Footer from '../components/shared/Footer'
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { appUrl } from '../constants/api';


function Login(props) {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [ errors, setErrors ] = useState({})
  const [ backErrors, setBackErrors ] = useState({})
  let validator = new SimpleReactValidator({locale: 'en'});
  const { setUser } = useContext(AuthContext)

  const login = async() => {
    if (!validator.allValid()) {
      setErrors(validator.getErrorMessages())
      return
    }
    setBackErrors({})
    setErrors({})
    try {
      const response = await axios.post(`${appUrl}auth/login`, form)
      setUser({ user: response.data.data.user, token: response.data.data.token });

    
      Swal.fire({
        type: 'success',
        title: 'Yehey!',
        text: 'Successfully Login!'
      })
  
      if (response.data.data.user.role === 'admin') {
        props.history.push('/admin')
        return
      }
  
      props.history.push('/user')
    }catch(err) {
      console.log(err.response.data.errors, 'ERR')
      setBackErrors(err.response.data.errors)
    }
    // console.log(response, 'ERROR')

  }

  const handleFormChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    const newForm = { ...form }
    newForm[name] = value
    setForm(newForm)
  }

  const renderErrors = () => {
    // console.log(errors, 'ERRORS')
    if (errors === {} && backErrors === {}) {
      // console.log('NO ERROR')
      return ''
    }
    // console.log('WITH ERROR')
    let mappedErrors = Object.entries(errors);
    // console.log(mappedErrors, 'MAPPED')

    if (!errors.length) {
      mappedErrors = Object.entries(backErrors);
    }

    const filteredErrors = mappedErrors.filter((error)=> {
      return error[1] != null
    })
    return filteredErrors.map((error, index) => {
      return (
        // console.log(error[1])
        <li className="list-unstyled alert alert-danger" key={index}>{error[1]}</li>
      )
    })
  }
  return (
    <Fragment>
      <div id="login">
        <div className="darker-overlay">
          <div className="container text-white">
            <div className="row">
              <div className="col-md-6 mx-auto text-center">
                <h1 className="text-uppercase font-weight-bold my-5">Log In</h1>
                <h4 className="mb-4"><i className="fas fa-user"></i> Sign into your account.</h4>
                <div>
                  { renderErrors() }
                </div>
                <form>
                  <div className="input-group mb-4">
                    <div className="input-group-prepend">
                      <div className="input-group-text"><i className="fas fa-envelope"></i></div>
                    </div>
                    <input
                    onChange={(e) => handleFormChange(e)}
                    value={form.email}
                    type="email"
                    name="email"
                    className="form-control" id="email" placeholder="Email Address" required/>
                      {validator.message('email', form.email, 'required|email')}  
                  </div>
                  <div className="input-group mb-4">
                    <div className="input-group-prepend">
                      <div className="input-group-text"><i className="fas fa-key"></i></div>
                    </div>
                    <input
                    value={form.password}
                    onChange={(e) => handleFormChange(e)}
                    type="password" className="form-control" id="password"
                    name="password"
                    placeholder="Password" required/>
                     {validator.message('password', form.password, 'required')}

                  </div>
                </form>
                <button 
                  id="loginBtn"
                  className="btn btn-crimson btn-block mb-3"
                  onClick={()=> login()}>
                  Log In
                </button>
                <p className="lead">
                  Don't have an account?
                  <Link to="/register" className="text-crimson">Sign Up.</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default Login;