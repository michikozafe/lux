import React, { Component, Fragment } from 'react';
import Footer from '../components/shared/Footer'
import axios from 'axios';
import { appUrl } from '../constants/api';
import uuidv4 from 'uuid/v4';
import Swal from 'sweetalert2';
import AddEditBookingModal from '../components/modals/AddEditBooking'
import AddEditReviewModal from '../components/modals/AddEditReview'

class Bookings extends Component {
  state = {
    activeBooking: {},
    isModalOpen: false,
    activeBookingId: '',
    bookings: [],
    isBookingModalOpen: false,
    user: {},
    errors: {}
  }

  componentDidMount = async () => {
    let user = JSON.parse(window.localStorage.getItem('user'));
    // console.log(user, 'LOGGED IN USER');

    if (!Object.entries(user).length) {
      this.props.history.push('/')
      user = {
        user: {
          role: ''
        }
      }
    }

    if (user.user.role !== 'user') {
      Swal.fire({
        type: 'error',
        title: 'Ooopps!',
        text: 'Unauthorized Access'
      })
      this.props.history.push('/')
    }

    await this.setState({
      user
    })

    const { data } = await axios.get(`${appUrl}bookings/${user.user._id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });

    this.setState({ bookings: data })
  }

  openBookingModal = () => {
    // console.log('openmodal');
    this.setState({
      isBookingModalOpen: true
    })
  }

  openReviewModal = (id) => {
    // console.log(id, "openreviewmodal")
    this.setState({
      isReviewModalOpen: true,
      activeBookingId: id
    })
  }

  closeBookingModal = () => {
    this.setState({
      isBookingModalOpen: false,
      activeBooking: {}
    })
  }

  closeReviewModal = () => {
    this.setState({
      isReviewModalOpen: false,
      activeReview: {}
    })
  }

  addReview = () => {
    this.openReviewModal()
  }

  editBooking = (booking) => {
    // console.log(booking, 'booking');
    this.setState({
      activeBooking: booking
    }, () => {
      this.openBookingModal()
    })
  }

  deleteBooking = async(id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    if (result.value) {
      const response = await axios.delete(`${appUrl}bookings/delete/${id}`,{
        headers: {
          Authorization: `Bearer ${this.state.user.token}`
        }
      })
  
      const bookings = this.state.bookings.filter((booking) => {
        return booking._id !== id
      })
  
      // console.log(bookings, 'AFTER FILTER')
      await this.setState({
        bookings
      }, () => {
        // console.log(this.state.bookings, 'bookings')
      })
      
      // console.log(response, 'RESPONSE')
      Swal.fire(
        'Deleted!',
        'Booking has been deleted.',
        'success'
      )
    }
  }

  onBookingSubmit = async(form) => {
    await this.setState({
      errors: {}
    })
    const bookingId = this.state.activeBooking._id

    if (bookingId) {
      try {

        const { data } = await axios.put(`${appUrl}bookings/edit/${bookingId}`, form, {
          headers: {
            Authorization: `Bearer ${this.state.user.token}`
          }
        });
        const bookings = this.state.bookings.map((booking) => {
          if (booking._id === bookingId) {
            return data
          }
          return booking
        })
        await this.setState({
          bookings
        })
        this.closeBookingModal()
        Swal.fire({
          type: 'success',
          title: 'Hurray',
          text: 'Edited Booking'
        })
        return
      }catch(err) {
        // console.log(err.response.data.errors, 'ERROR')
        // this.setState({
        //   errors: err.response.data.errors
        // })
      }
    }
  }

  onReviewSubmit = async(form) => {
    await this.setState({
      errors: {}
    })
    const user = JSON.parse(window.localStorage.getItem('user'));
    // console.log(form, 'form')
    // console.log(this.state.activeBookingId, 'bookingId')
    const id = this.state.activeBookingId
    // console.log(user.user._id);
    try {
      axios.post(`${appUrl}reviews/create/${id}/${user.user._id}`, form, {
        headers: {
          Authorization: `Bearer ${this.state.user.token}`
        }
      }).then(async({data}) => {
        const reviews = this.state.reviews
        // console.log(reviews);
        // console.log(data);
        // reviews.push(data)
        await this.setState({
          reviews
        })
        this.closeReviewModal()
        Swal.fire({
          type: 'success',
          title: 'Hurray',
          text: 'Review Submitted'
        })
        }).catch((err)=> {
          console.log(err, 'ERROR')
        })
    } catch(err) {
      // console.log(err.response.data.errors, 'ERROR')
      this.setState({
        errors: err.response.data.errors
      })
    }
  }

  renderBookings = () => {
    const { bookings } = this.state;

    return bookings.map((booking) => {
      const bookingDate = new Date(booking.date).toLocaleDateString("en-US")
      const bookingStart = new Date(booking.bookingStart).toLocaleDateString("en-US")
      const bookingEnd = new Date(booking.bookingEnd).toLocaleDateString("en-US")

      return (
        <div key={uuidv4()} className="container" id="bookings">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="card shadow booking-cards my-3">
                <div className="card-header">
                  <h3 className="text-tomato text-uppercase font-weight-bold">{booking._id}
                    <span className="float-right">
                      <button className="btn btn-primary" onClick={ () => this.openReviewModal(booking._id) } data-toggle="tooltip" title="Rate Now"><i className="fas fa-thumbs-up"></i></button>
                      <button className="btn btn-success mx-1" onClick={ () => this.editBooking(booking) } data-toggle="tooltip" title="Edit"><i className="fas fa-pencil-alt" ></i></button>
                      <button className="btn btn-warning" onClick={ () => this.deleteBooking(booking._id) }data-toggle="tooltip" title="Cancel"><i className="fas fa-trash"></i></button>
                    </span>
                  </h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <p className="card-title mb-0"><i className="fas fa-bed mr-2 text-crimson" data-toggle="tooltip" title="Room"></i>{booking.roomName} </p>
                      <p className="card-text mb-0"><i className="fas fa-luggage-cart mr-2 text-crimson" data-toggle="tooltip" title="Booking Date"></i>{bookingStart} - {bookingEnd} </p>
                    </div>
                    <div className="col-md-6">
                      <p className="card-text mb-0"><i className="fas fa-users mr-2 text-crimson" data-toggle="tooltip" title="Guest"></i>{booking.guest}</p>
                      <p><i className="fas fa-calendar mr-2 text-crimson" data-toggle="tooltip" title="Created On"></i>{bookingDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
     const { isBookingModalOpen, isReviewModalOpen, activeBooking, } = this.state

    return (
      <Fragment>
        <AddEditBookingModal
          isOpen={isBookingModalOpen}
          closeModal={this.closeBookingModal}
          activeBooking = {activeBooking}
          onSubmit = { this.onBookingSubmit }
          errors = { this.state.errors }
        />
        <AddEditReviewModal
          isOpen={isReviewModalOpen}
          closeModal={this.closeReviewModal}
          activeRoomId = {this.state.activeBookingId}
          onSubmit = {this.onReviewSubmit}
          activeReview = { {
            rating: '',
            description: ''
          } }
          errors = { this.state.errors }
        />
        <div className="container mb-5">
          <h1 className="text-center my-4 text-uppercase font-weight-bold text-crimson">Bookings</h1>
          {this.renderBookings()}
        </div>
        <Footer />
      </Fragment>
    )
  }
}

export default Bookings;