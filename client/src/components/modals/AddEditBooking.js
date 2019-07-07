import React, { Component } from "react";
import Modal from "react-modal";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import SimpleReactValidator from "simple-react-validator";
import Swal from 'sweetalert2'

const customStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "60%",
    transform: "translate(-50%, -50%)"
  }
};

class AddEditBooking extends Component {
  state = {
    form: {
      guest: "",
      bookingStart: '',
      bookingEnd: ''
    },
    errors: {}
  };

  validator = new SimpleReactValidator({locale: 'en'});

  componentDidMount() {
    this.validator = new SimpleReactValidator();
  }

  handleFormChange = e => {
    const value = e.target.value;
    const name = e.target.name;

    const form = { ...this.state.form };
    form[name] = value;

    this.setState({
      form
    });
  };

  onBookingStartChange = bookingStart => {
    if(this.state.form.bookingEnd) {
      if(this.state.form.bookingEnd < bookingStart) {
        Swal.fire({
          type: 'error',
          title: 'Ooopps!',
          text: 'End date cant be lesser that start date'
        })
  
        this.setState({
          form: {
            ...this.state.form,
            bookingEnd: this.state.form.bookingStart
          }
        });
  
        return
      }
    }

    this.setState({
      form: {
        ...this.state.form,
        bookingStart: bookingStart
      }
    });
  };

  onBookingEndChange = bookingEnd => {
    if(this.state.form.bookingStart) {
      if(this.state.form.bookingStart < this.state.form.bookingEnd) {
        Swal.fire({
          type: 'error',
          title: 'Ooopps!',
          text: 'End date cant be lesser that start date'
        })
  
        this.setState({
          form: {
            ...this.state.form,
            bookingStart: this.state.form.bookingEnd
          }
        });
  
        return
      }
    }
    
    this.setState({
      form: {
        ...this.state.form,
        bookingEnd: bookingEnd
      }
    });
  };

  onCloseModal = () => {
    this.setState({
      form: {
        guest: "",
        bookingStart: '',
        bookingEnd: ''
      },
      errors: {}

    }, () => {
      this.props.closeModal()
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

    e.preventDefault();
    this.props.onSubmit(this.state.form, this.props.activeRoomId);
  };

  afterOpenModal = () => {
    this.setState({
      form: this.props.activeBooking
    })
  }

  renderErrors = () => {
    // console.log(errors, 'ERRORS')
    if (this.state.errors === {} && this.props.errors) {
      // console.log('NO ERROR')
      return ''
    }
    // console.log(this.props.errors, 'backend errors')
    let mappedErrors = Object.entries(this.state.errors);

    if (!this.state.errors.length) {
      mappedErrors = Object.entries(this.props.errors);
    }
    // console.log(mappedErrors, 'MAPPED')
    const filteredErrors = mappedErrors.filter((error)=> {
      return error[1] != null
    })
    // console.log(filteredErrors, 'filteredErrors');
    return filteredErrors.map((error, index) => {
      // console.log(error, 'error');
      return (
        // console.log(error[1])
        <li className="list-unstyled alert alert-danger" key={index}>{error[1]}</li>
      )
    })
  }

  render() {
    const { isOpen } = this.props;
    const { form } = this.state;
    // console.log(form, 'FORM');
    return (
      <Modal isOpen={isOpen} onRequestClose={this.onCloseModal} onAfterOpen={this.afterOpenModal} style={customStyles} ariaHideApp={false}>
        <h1 className="text-uppercase font-weight-bold mt-2 text-center text-crimson">Booking</h1>
        <div>{ this.renderErrors() }</div>
        <form className="mt-4">
          <div className="form-group">
            <label htmlFor="bookingStart">Start Date: </label>
            <DayPickerInput
              placeholder="YYYY-MM-DD"
              format="YYYY-MM-DD"
              // value={this.state.form.bookingStart}
              onDayChange={this.onBookingStartChange}
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
          <div className="form-group">
            <label htmlFor="bookingEnd">End Date: </label>
            <DayPickerInput
              placeholder="YYYY/MM/DD"
              // value={this.state.form.bookingEnd}
              format="YYYY/MM/DD"
              // formatDate={this.state.formatDate}
              onDayChange={this.onBookingEndChange}
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
          <div className="form-group">
            <label htmlFor="guest">Guest</label>
            <input value={form.guest} type="number" name="guest" min="1" id="guest" className="form-control" onChange={e => this.handleFormChange(e)} required />
            {this.validator.message('guest', form.guest, 'required')}
          </div>
          <button onClick={e => this.submit(e)} className="btn btn-main btn-block btn-crimson mt-4" type="submit">
            Submit
          </button>
        </form>
      </Modal> 
    );
  }
}

export default AddEditBooking;
