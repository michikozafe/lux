import React, { useState, Fragment } from 'react';
import Footer from '../components/shared/Footer'
import Swal from 'sweetalert2'
import axios from 'axios'
import { Link } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import { appUrl } from '../constants/api';


function Register(props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [ errors, setErrors ] = useState({})
  const [ backErrors, setBackErrors ] = useState({})
  let validator = new SimpleReactValidator({locale: 'en'});

  const handleFormChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    const newForm = { ...form }
    newForm[name] = value
    setForm(newForm)
  }
 
  const submit = async(e) => {
    e.preventDefault();
    if (!form.password || !form.confirmPassword || !form.name || !form.email) {
      Swal.fire({
        type: 'error',
        title: 'Ooops!',
        text: 'Please Complete All Fields!'
      })
      return
    }

    if(!form.email.includes('@')) {
      Swal.fire({
        type: 'error',
        title: 'Ooops!',
        text: 'Please Enter a valid email!'
      })
      return
    }
    
    
    if (form.password !== form.confirmPassword) {
      Swal.fire({
        type: 'error',
        title: 'Ooops!',
        text: 'Password dont match!'
      })
      return
    } 
    setBackErrors({})
    setErrors({})
    try {
      const response = await axios.post(`${appUrl}users`, form)

      console.log(response.data.success, 'RESPONSE');

      props.history.push('/login')

      Swal.fire({
        type: 'success',
        title: 'Yehey!',
        text: 'Successfully Registered!'
      })
    } catch(err) {
      console.log(err.response.data.errors, 'ERR')
      setBackErrors(err.response.data.errors)
    }
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
      <div id="register">
        <div className="darker-overlay">
          <div className="container text-white">
            <div className="row">
              <div className="col-md-6 mx-auto text-center">
                <h1 className="text-uppercase font-weight-bold my-4">Register</h1>
                <h4 className="mb-4"><i className="fas fa-user"></i> Create an account.</h4>
                <div>
                  { renderErrors() }
                </div>
                <form action="#">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <div className="input-group-text"><i className="fas fa-user"></i></div>
                    </div>
                    <input
                      value={form.name}
                      onChange={ (e) => handleFormChange(e) }
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Name"
                      required/>
                      {validator.message('name', form.name, 'required')}  
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <div className="input-group-text"><i className="fas fa-envelope"></i></div>
                    </div>
                    <input onChange={ (e) => handleFormChange(e) }
                    value={form.email}
                    name="email"
                    type="email" className="form-control" id="email" placeholder="Email Address" required/>
                    {validator.message('email', form.email, 'required|email')}  
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <div className="input-group-text"><i className="fas fa-key"></i></div>
                    </div>
                    <input onChange={ (e) => handleFormChange(e) }
                    name="password"
                    type="password" className="form-control" id="password" placeholder="Password" required/>
                    {validator.message('password', form.password, 'required')}
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <div className="input-group-text"><i className="fas fa-key"></i></div>
                    </div>
                    <input
                    onChange={ (e) => handleFormChange(e) }
                    value={form.confirmPassword}
                    type="password" className="form-control" id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password" required/>
                    {validator.message('password', form.confirmPassword, `required`)}
                  </div>
                  <button onClick = {(e) => submit(e)} className="btn btn-crimson btn-block mb-3">Register</button>
                </form>
                <p className="lead">
                  Already have an account?
                  <Link to="/login" className="text-crimson">Log In.</Link>
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

export default Register;