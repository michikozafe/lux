import React, { Component } from 'react';
import Modal from 'react-modal';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import SimpleReactValidator from 'simple-react-validator';

const customStyles = {
  content : {
    top : '45%',
    left : '50%',
    right : 'auto',
    bottom : 'auto',
    marginRight : '-50%',
    width: '60%',
    transform : 'translate(-50%, -50%)'
  }
};

class AddEditPromo extends Component {
  state = {
    form: {
      title: '',
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
        title: '',
        description: ''
      }
    }, () => {
      this.props.closeModal()
    })
  }

  afterOpenModal = () => {
    this.setState({
      form: this.props.activePromo
    })
  }

  handleFormChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    const form = { ...this.state.form }
    form[name] = value

    this.setState({
      form
    })
  }

  handleDayChange = (selectedDate) => {
    this.setState({
      form : {
          ...this.state.form,
          validUntil: selectedDate
      }
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
    this.props.onSubmit(this.state.form);
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
    const filteredErrors = mappedErrors.filter((error)=> {
      return error[1] != null
    })
    return filteredErrors.map((error, index) => {
      // console.log(error)
      return (
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
        <h1 className="text-uppercase font-weight-bold mt-2 text-center text-crimson">Promo</h1>
        { this.renderErrors() }
        <form className="mt-4">
          <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                value={ form.title }
                onChange = { (e) => this.handleFormChange(e) }
                type="text"
                name="title"
                id="title"
                className="form-control"
                required />
                {this.validator.message('name', form.title, 'required')}

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
          <div className="form-group">
            <label htmlFor="validUntil">Valid Until: </label>
            <DayPickerInput
              // disabledDays={{ after: today }}
              placeholder="YYYY/MM/DD"
              format="YYYY/MM/DD"
              onDayChange={this.handleDayChange}
              dayPickerProps={{
                modifiers: {
                  disabled: [
                    {
                      before: new Date()
                    }
                  ]
                }
              }}
            />
          </div>
          <button onClick={(e) => this.submit(e)} className="btn btn-main btn-block btn-crimson mt-4" type="submit">Submit</button>
        </form>
      </Modal>
    )
  }
}

export default AddEditPromo;