import React, { Component } from 'react';
import Modal from 'react-modal';
import 'react-day-picker/lib/style.css';
import SimpleReactValidator from 'simple-react-validator';

const customStyles = {
  content : {
    top : '50%',
    left : '50%',
    right : 'auto',
    bottom : 'auto',
    marginRight : '-50%',
    width: '60%',
    height: '80%',
    transform : 'translate(-50%, -50%)'
  }
};

class AddEditRoom extends Component {
  state = {
    form: {
      name: '',
      floor: '',
      price: '',
      capacity: '',
      description: '',
      image: '',
      selectedFile: null,
    },
    errors: {}
  }

  validator = new SimpleReactValidator({locale: 'en'});

  componentDidMount() {
    this.validator = new SimpleReactValidator();
  }

  onCloseModal = () => {
    this.setState({
      form: {
        name: '',
        floor: '',
        price: '',
        capacity: '',
        description: '',
        image: ''
      }
    }, () => {
      this.props.closeModal()
    })
  }

  afterOpenModal = () => {
    this.setState({
      form: this.props.activeRoom
    })
  }

  handleFormChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    const form = { ...this.state.form }
    if (name === 'image') {
      form[name] = e.target.files[0]
      this.setState({
        form
      })
      return
    }
    form[name] = value

    this.setState({
      form
    })
  }

  submit = async(e) => {
    if (!this.validator.allValid()) {
      console.log(this.validator.getErrorMessages(), 'this.validator.getErrorMessages()')
      await this.setState({
        errors: this.validator.getErrorMessages()
      })
      return
    }
    e.preventDefault()

    this.props.onSubmit(this.state.form)
  }

  renderErrors = () => {
    // console.log(errors, 'ERRORS')
    if (this.state.errors === {} && this.props.errors) {
      // console.log('NO ERROR')
      return ''
    }
    // console.log(this.props.errors, 'backend errors')
    // console.log('WITH ERROR')
    let mappedErrors = Object.entries(this.state.errors);

    if (!this.state.errors.length) {
      mappedErrors = Object.entries(this.props.errors);
    }
    // console.log(mappedErrors, 'MAPPED')
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

  render() {
    const { isOpen } = this.props;
    const { form } = this.state

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={this.onCloseModal}
        onAfterOpen={this.afterOpenModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <h1 className="text-uppercase font-weight-bold mt-2 text-center text-crimson">Room</h1>
        <div>{ this.renderErrors() }</div>
        <form className="mt-4" encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="title">Name</label>
            <input
              value={ form.name }
              onChange = { (e) => this.handleFormChange(e) }
              type="text"
              name="name"
              id="name"
              className="form-control"
              required />
              {this.validator.message('name', form.name, 'required')}
          </div>
          <div className="form-group">
            <label htmlFor="title">Floor</label>
            <input
              value={ form.floor }
              onChange = { (e) => this.handleFormChange(e) }
              type="number"
              name="floor"
              id="floor"
              min="1"
              className="form-control"
              required />
              {this.validator.message('floor', form.floor, 'required')}
          </div>
          <div className="form-group">
            <label htmlFor="title">Price</label>
            <input
              value={ form.price }
              onChange = { (e) => this.handleFormChange(e) }
              type="number"
              name="price"
              min="1"
              id="price"
              className="form-control"
              required />
              {this.validator.message('price', form.price, 'required')}
          </div>
          <div className="form-group">
            <label htmlFor="title">Capacity</label>
            <input
              value={ form.capacity }
              onChange = { (e) => this.handleFormChange(e) }
              type="number"
              name="capacity"
              min="1"
              id="capacity"
              className="form-control"
              required />
              {this.validator.message('capacity', form.capacity, 'required')}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              value={form.description}
              type="text"
              name="description"
              id="description" className="form-control"
              onChange = { (e) => this.handleFormChange(e) }
              required />
              {this.validator.message('description', form.description, 'required')}
          </div>
          <button onClick={(e) => this.submit(e)} className="btn btn-main btn-block btn-crimson mt-4" type="submit">Submit</button>
        </form>
      </Modal>
    )
  }
}

export default AddEditRoom;