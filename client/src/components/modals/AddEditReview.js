import React, { Component } from 'react';
import Modal from 'react-modal';
import SimpleReactValidator from 'simple-react-validator';

const customStyles = {
  content : {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "60%",
    transform: "translate(-50%, -50%)"
  }
};

class AddEditReview extends Component {
  state = {
    form: {
      rating: '',
      description: ''
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
        rating: '',
        description: ''
      }
    }, () => {
      this.props.closeModal()
    })
  }

  // afterOpenModal = () => {
  //   this.setState({
  //     form: this.props.activeReview
  //   })
  // }

  handleFormChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    const form = { ...this.state.form }
    form[name] = value

    this.setState({
      form
    })
  }

  afterOpenModal = () => {
    this.setState({
      form: this.props.activeReview
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
    this.props.onSubmit(this.state.form, this.props.activeBookingId);
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
    } else {

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
    // console.log(form, 'Review Form');

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={this.onCloseModal}
        onAfterOpen={this.afterOpenModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <h1 className="text-uppercase font-weight-bold mt-2 text-center text-crimson">Review</h1>
        { this.renderErrors() }
        <form className="mt-4">
          <div className="form-group">
              <label htmlFor="title">Rating</label>
              <input
                value={ form.rating }
                onChange = { (e) => this.handleFormChange(e) }
                type="number"
                name="rating"
                id="rating"
                min="1"
                max="5"
                className="form-control"
                required />
                {this.validator.message('rating', form.rating, 'required')}

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

export default AddEditReview;