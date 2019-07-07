import React, { Component, Fragment } from 'react';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import PageHeader from '../components/shared/PageHeader'
import Footer from '../components/shared/Footer'
import AddEditRoomModal from '../components/modals/AddEditRoom'
import AddEditBookingModal from '../components/modals/AddEditBooking'
import { appUrl } from '../constants/api';
import Swal from 'sweetalert2';

class Rooms extends Component {
  state = {
    activeRoom: {},
    activeBooking: {},
    activeRoomId: '',
    isRoomModalOpen: false,
    isBookingModalOpen: false,
    rooms: [],
    isImageModalOpen: false,
    user: {},
    errors: {}
  }

  componentDidMount = async () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    // console.log(user, 'LOGGED IN USER');

    await this.setState({
      user
    })

    const { data } = await axios.get(`${appUrl}public/rooms`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });

    this.setState({ rooms: data })
  }

  openImageModal = () => {
    this.setState({
      isImageModalOpen: true
    })
  }

  closeImageModal = () => {
    this.setState({
      isImageModalOpen: false
    })
  }

  openRoomModal = () => {
    this.setState({
      isRoomModalOpen: true
    })
  }

  openBookingModal = (id) => {
    const user = JSON.parse(window.localStorage.getItem('user'));

    if (!Object.entries(user).length) {
      console.log(this.props, 'PROPPPPS')
      this.props.history.push('/login')
    }
    
    this.setState({
      isBookingModalOpen: true,
      activeRoomId: id
    })
  }

  closeRoomModal = () => {
    this.setState({
      isRoomModalOpen: false,
      activeRoom: {},
      errors: {}
    })
  }

  closeBookingModal = () => {
    this.setState({
      isBookingModalOpen: false,
      activeBooking: {},
      errors: {}
    })
  }

  renderEditDeleteButton = (room) => {
    let user = JSON.parse(window.localStorage.getItem('user'));

    if (!Object.entries(user).length) {
      // console.log('HEY')
      user = {
        user: {
          role: ''
        }
      }
    }
   return (user.user.role === 'admin') ? (
      <span className="float-right">
        <button onClick={ () => this.editRoom(room) } className="btn btn-success mr-1" data-toggle="tooltip" title="Edit"><i className="fas fa-pencil-alt" ></i></button>
        <button onClick={ () => this.deleteRoom(room._id) } className="btn btn-warning" data-toggle="tooltip" title="Delete"><i className="fas fa-trash"></i></button>
      </span>
      
    ) : ''
  }

  renderAddButton = () => {
    let user = JSON.parse(window.localStorage.getItem('user'));
    // console.log(user, 'USER')

    if (!Object.entries(user).length) {
      // console.log('HEY')
      user = {
        user: {
          role: ''
        }
      }
    }

    return (user.user.role === 'admin') ? (<button className="btn float-right add-button-admin-room mt-3 btn-outline-danger" onClick={() => this.addRoom()} data-toggle="tooltip" title="Add Room"><i className="fas fa-plus"></i></button>)
    :
    ''
  }

  renderBookButton = (room) => {
    let user = JSON.parse(window.localStorage.getItem('user'));
    if (!Object.entries(user).length) {
      // console.log('HEY')
      user = {
        user: {
          role: ''
        }
      }
    }
    return (user.user.role === 'admin') ? 
    '' :
    (<button onClick={ () => this.openBookingModal(room._id) } className="btn btn-crimson btn-block">Book Now</button>)
  }

  addRoom = () => {
    this.openRoomModal()
  }

  editRoom = (room) => {
    console.log(room, 'ROOM');
    this.setState({
      activeRoom: room
    }, () => {
      this.openRoomModal()
    })
  }

  deleteRoom = async(id) => {
    
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    // console.log(!!result.value);

    if (result.value) {
      const response = await axios.delete(`${appUrl}rooms/delete/${id}`,{
        headers: {
          Authorization: `Bearer ${this.state.user.token}`
        }
      })
  
      const rooms = this.state.rooms.filter((room) => {
        return room._id !== id
      })
  
      // console.log(rooms, 'AFTER FILTER')
      await this.setState({
        rooms
      }, () => {
        console.log(this.state.rooms, 'rooms')
      })
      
      console.log(response, 'RESPONSE')
      Swal.fire(
        'Deleted!',
        'Room has been deleted.',
        'success'
      )
    }
  }

  onRoomSubmit = async(form) => {
    await this.setState({
      errors: {}
    })
    // console.log(form, 'form')
    // console.log(form._id, 'formid')
    if (form._id) {
      try{
        const { data } = await axios.put(`${appUrl}rooms/edit/${form._id}`, form, {
          headers: {
            Authorization: `Bearer ${this.state.user.token}`
          }
        });
   
        const rooms = this.state.rooms.map((room) => {
          if (room._id === form._id) {
            return data
          }
          return room
        })
        await this.setState({
          rooms
        })
        this.closeRoomModal()
        Swal.fire({
          type: 'success',
          title: 'Hurray',
          text: 'Edited Room'
        })
        return
      } catch(err) {
        console.log(err.response.data.errors, 'ERROR')
        this.setState({
          errors: err.response.data.errors
        })
        return
      }
    }

    try {
      const { data } = await axios.post(`${appUrl}rooms/create`, form, {
        headers: {
          Authorization: `Bearer ${this.state.user.token}`
        }
      });
      const rooms = this.state.rooms
  
      rooms.push(data)
      // console.log(data, promos, 'YUP')
      await this.setState({
        rooms
      })
      this.closeRoomModal()
      Swal.fire({
        type: 'success',
        title: 'Hurray',
        text: 'Added Room'
      })
    } catch(err) {
      console.log(err.response.data.errors, 'ERROR')
      this.setState({
        errors: err.response.data.errors
      })
      return
    }
  }

   
  onBookingSubmit = async(form) => {
    await this.setState({
      errors: {}
    })
    console.log('submitinn')
    const user = JSON.parse(window.localStorage.getItem('user'));
    const id = this.state.activeRoomId
    const rooms = this.state.rooms

    if(!form.bookingEnd || !form.bookingStart) {
      Swal.fire({
        type: 'error',
        title: 'Ooopps!',
        text: 'Date input is required'
      })
      return
    }

    if(form.bookingEnd < form.bookingStart) {
      Swal.fire({
        type: 'error',
        title: 'Ooopps!',
        text: 'End date cant be lesser that start date'
      })
      return
    }
    try {
      const { data } = await axios.post(`${appUrl}bookings/create/${id}/${user.user._id}`, form, {
        headers: {
          Authorization: `Bearer ${this.state.user.token}`
        }
      });

      rooms.push(data)
    } catch (err) {
      console.log(err.response.data.errors, 'ERROR')
      this.setState({
        errors: err.response.data.errors
      })
      return
    }
    
    // const rooms = this.state.rooms

    // rooms.push(data)
    // console.log(data, promos, 'YUP')
    await this.setState({
      rooms
    })
    this.closeBookingModal()
    Swal.fire({
      type: 'success',
      title: 'Hurray',
      text: 'Booking Successful'
    })
  }

  renderRooms = () => {
    const { rooms } = this.state;

    return rooms.map((room) => {
      return (
          <div key={uuidv4()} className="container">
            <div className="row">
              <div className="col-md-11 mx-auto">
                <div className="card my-4 bg-gray shadow room-cards">
                  <div className="card-body">
                    <div className="row" >
                      {/* <div className="col-md-5">
                        <img src="https://makitweb.com/demo/broken_image/images/noimage.png" height="280" width="400" alt="noImage"/>
                      </div> */}
                      <div className="col-md-9 mx-auto">
                        <h3 className="text-uppercase text-crimson font-weight-bold text-center">{room.name}
                        {this.renderEditDeleteButton(room)}
                        </h3>
                        <hr />
                        <p>{room.description}</p>
                        <p className="mb-0">Floor: {room.floor}</p>
                        <p>Capacity: {room.capacity} guests</p>
                        <p>Price: <span className="text-crimson font-weight-bold">&#8369;${room.price}</span> / night</p>
                        { this.renderBookButton(room) }
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
    const { isRoomModalOpen, isBookingModalOpen, activeRoom } = this.state
    return (
      <Fragment>
        <PageHeader title="Rooms"/>
        <AddEditRoomModal
          isOpen={isRoomModalOpen}
          closeModal={this.closeRoomModal}
          activeRoom = {activeRoom}
          onSubmit = {this.onRoomSubmit}
          errors = { this.state.errors }
        />
        <AddEditBookingModal
          isOpen={isBookingModalOpen}
          closeModal={this.closeBookingModal}
          activeRoomId = {this.state.activeRoomId}
          activeBooking = { {
            guest: "",
            bookingStart: '',
            bookingEnd: ''
          } }
          onSubmit = {this.onBookingSubmit}
          errors = { this.state.errors }
        />
        <div className="container">
          <div className="row">
            <div className="col-md-11 mx-auto">
              { this.renderAddButton() }
            </div>
          </div>
        </div>
        {this.renderRooms()}
        <Footer />
      </Fragment>
    )
  }
}

export default Rooms;