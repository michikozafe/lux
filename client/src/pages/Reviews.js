import React, { Component, Fragment } from 'react';
import Footer from '../components/shared/Footer'
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import { appUrl } from '../constants/api';
import AddEditReviewModal from '../components/modals/AddEditReview'
import Swal from 'sweetalert2';
import ReactStars from 'react-stars'

class Reviews extends Component {
  state = {
    activeReview: {},
    reviewId: '',
    isModalOpen: false,
    reviews: [],
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
    // console.log(user, 'LOGGED IN USER');

    await this.setState({
      user
    })
    console.log(user.user._id);
    const { data } = await axios.get(`${appUrl}reviews/${user.user._id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
    console.log(data.errors, "reviewData")
    this.setState({ reviews: data })
  }

  openModal = () => {
    this.setState({
      isModalOpen: true
    })
  }

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      activeReview: {}
    })
  }

  editReview = (id, review) => {
    console.log(review, 'review');
    console.log(id, 'id');
    this.setState({
      activeReview: review,
      reviewId: id
    }, () => {
      this.openModal()
    })
  }

  deleteReview = async(id) => {
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
      const response = await axios.delete(`${appUrl}reviews/delete/${id}`,{
        headers: {
          Authorization: `Bearer ${this.state.user.token}`
        }
      })
  
      const reviews = this.state.reviews.filter((review) => {
        return review._id !== id
      })
  
      // console.log(promos, 'AFTER FILTER')
      await this.setState({
        reviews
      }, () => {
        console.log(this.state.reviews, 'PROMOS')
      })
      
      console.log(response, 'RESPONSE')
      Swal.fire(
        'Deleted!',
        'Review has been deleted.',
        'success'
      )
    }
  }

  onSubmit = async(form) => {
    await this.setState({
      errors: {}
    })
    // console.log(form, 'form')
    // console.log(this.state.reviewId, 'reviewid')
    try {
      console.log(form, 'form')
      console.log(form.rating, 'form')
      if (form.rating > 5 || form.rating < 1) {
        Swal.fire({
          type: 'error',
          title: 'Ooops!',
          text: 'Enter a no between 1-5'
        })
        return
      }

      const { data } = await axios.put(`${appUrl}reviews/edit/${this.state.reviewId}`, form, {
        headers: {
          Authorization: `Bearer ${this.state.user.token}`
        }
      });
      const reviews = this.state.reviews.map((review) => {
        if (review._id === this.state.reviewId) {
          return data
        }
        // console.log(review);
        // console.log(data);
        return review
      })
      // console.log(reviews);
      await this.setState({
        reviews
      })
      this.closeModal()
      Swal.fire({
        type: 'success',
        title: 'Hurray',
        text: 'Edited Review'
      })
      return
    } catch(err) {
      // console.log(err.response.data.errors, 'ERROR')
      // this.setState({
      //   errors: err.response.data.errors
      // })
    }
  }

  ratingChanged = (newRating) => {
    console.log(newRating)
  }

  renderReviews = () => {
    const { reviews } = this.state;

    return reviews.map((review) => {
      const reviewDate = new Date(review.date).toLocaleDateString("en-US")      


      return (
        <div key={uuidv4()} className="container mb-3" id="reviews">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="card shadow review-cards">
                <div className="card-header">
                  <h3 className="text-crimson text-center">{review.rating}/5
                    <span className="float-left">
                    <ReactStars 
                      count={review.rating}
                      edit={false}
                      // onChange={this.ratingChanged}
                      size={24}
                      color1={'#FFD700'}
                      color2={'#ffd700'}
                    />
                    </span>
                    <span className="float-right">
                      <button onClick={ () => this.editReview(review._id, review) }className="btn btn-success mr-1" data-toggle="tooltip" title="Edit"><i className="fas fa-pencil-alt" ></i></button>
                      <button onClick={ () => this.deleteReview(review._id) } className="btn btn-warning" data-toggle="tooltip" title="Delete"><i className="fas fa-trash"></i></button>
                    </span>
                  </h3>
                </div>
                <div className="card-body">
                  <p className="card-text">{review.description}</p>
                  <div className="row">
                    <div className="col-md-6">
                      <small className="mb-0"><i className="fas fa-bed mr-1" data-toggle="tooltip" title="Room"></i> {review.roomName}</small>
                    </div>
                    <div className="col-md-6">
                      <small><i className="fas fa-calendar mr-1" data-toggle="tooltip" title="Room"></i>{reviewDate}</small>
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
    const { isModalOpen, activeReview } = this.state

    return (
      <Fragment>
        <AddEditReviewModal
          isOpen={isModalOpen}
          closeModal={this.closeModal}
          activeReview = {activeReview}
          onSubmit = { this.onSubmit }
          errors = { this.state.errors }
        />
        <div className="container mb-5">
          <h1 className="text-center my-4 text-uppercase font-weight-bold text-crimson">Reviews</h1>
            { this.renderReviews() }
        </div>
        <Footer />
      </Fragment>
    )
  }
}

export default Reviews;