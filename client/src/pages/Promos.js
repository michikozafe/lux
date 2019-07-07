import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { appUrl } from '../constants/api';
import uuidv4 from 'uuid/v4';
import Swal from 'sweetalert2';
import PageHeader from '../components/shared/PageHeader';
import Footer from '../components/shared/Footer';
import AddEditPromoModal from '../components/modals/AddEditPromo'

class Promos extends Component {
  state = {
    activePromo: {
      title: '',
      description: ''
    },
    isModalOpen: false,
    promos: [],
    user: {},
    errors: {}
  }

  componentDidMount = async () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    // console.log(user, 'LOGGED IN USER');
    
    await this.setState({
      user
    })

    const { data } = await axios.get(`${appUrl}public/promos`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });

    this.setState({ promos: data })
  }

  openModal = () => {
    this.setState({
      isModalOpen: true
    })
  }

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      activePromo: {}
    })
  }

  addPromo = () => {
    this.openModal()
  }

  editPromo = (promo) => {
    // console.log(promo, 'PROMO');
    this.setState({
      activePromo: promo
    }, () => {
      this.openModal()
    })
  }

  deletePromo = async(id) => {
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
      const response = await axios.delete(`${appUrl}promotions/delete/${id}`,{
        headers: {
          Authorization: `Bearer ${this.state.user.token}`
        }
      })
      console.log(response);
      const promos = this.state.promos.filter((promo) => {
        return promo._id !== id
      })
  
      // console.log(promos, 'AFTER FILTER')
      await this.setState({
        promos
      }, () => {
        // console.log(this.state.promos, 'PROMOS')
      })
      
      // console.log(response, 'RESPONSE')
      Swal.fire(
        'Deleted!',
        'Promo has been deleted.',
        'success'
      )
    }
  }

  renderEditDeleteButton = (promo) => {
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
      <button onClick={ () => this.editPromo(promo) } className="btn btn-success mr-1" data-toggle="tooltip" title="Edit"><i className="fas fa-pencil-alt" ></i></button>
      <button onClick={ () => this.deletePromo(promo._id) } className="btn btn-warning" data-toggle="tooltip" title="Delete"><i className="fas fa-trash"></i></button>
    </span>
       
     ) : ''
   }
 
   renderAddButton = () => {
    let user = JSON.parse(window.localStorage.getItem('user'));
    if (!Object.entries(user).length) {
      // console.log('HEY')
      user = {
        user: {
          role: ''
        }
      }
    }
     return (user.user.role === 'admin') ? <button className="float-right btn btn-outline-danger add-button-admin-promo mt-3" onClick={() => this.addPromo()} data-toggle="tooltip" title="Add Promo"><i className="fas fa-plus"></i></button>
     :
     ''
   }

  onSubmit = async(form) => {
    await this.setState({
      errors: {}
    })

    if(!form.validUntil ) {
      Swal.fire({
        type: 'error',
        title: 'Ooopps!',
        text: 'Valid Until is required'
      })
      return
    }
    
    console.log(form, 'form')
    if (form._id) {
      try {
        const { data } = await axios.put(`${appUrl}promotions/edit/${form._id}`, form, {
          headers: {
            Authorization: `Bearer ${this.state.user.token}`
          }
        });
        const promos = this.state.promos.map((promo) => {
          if (promo._id === form._id) {
            return data
          }
          return promo
        })
        await this.setState({
          promos
        })
        this.closeModal()
        Swal.fire({
          type: 'success',
          title: 'Hurray',
          text: 'Edited Promo'
        })
        return
      } catch(err) {
        this.setState({
          errors: err.response.data.errors
        })  
      }
    }

    try {
      const { data } = await axios.post(`${appUrl}promotions/create`, form, {
        headers: {
          Authorization: `Bearer ${this.state.user.token}`
        }
      });

      const promos = this.state.promos

      promos.push(data)
      // console.log(data, promos, 'YUP')
      await this.setState({
        promos
      })
      this.closeModal()
      Swal.fire({
        type: 'success',
        title: 'Hurray',
        text: 'Added Promo'
      })
    } catch(err) {
      console.log(err, 'ERR')
      this.setState({
        errors: err.response.data.errors
      })  
    }
      
    
    
  }

  renderPromos = () => {
    const { promos } = this.state;

    return promos.map((promo) => {
      const validUntil = new Date(promo.validUntil).toLocaleDateString("en-US")

      return (
        <div key={uuidv4()} className="container">
          <div className="row">
            <div className="col-md-10 mx-auto">
              <div className="card my-3 bg-gray shadow room-cards">
                <div className="card-body">
                  <div className="row" >
                    <div className="col-md-9 mx-auto">
                      <h3 className="text-uppercase text-crimson font-weight-bold text-center">{promo.title}
                        { this.renderEditDeleteButton(promo) }
                      </h3>
                      <hr />
                      <p>{promo.description}</p>
                      <p className="text-crimson font-weight-bold">Valid Until: {validUntil}</p>
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
    const { isModalOpen, activePromo } = this.state
    return (
      <Fragment>
        <PageHeader title="Promos"/>
        <AddEditPromoModal
          isOpen={isModalOpen}
          closeModal={this.closeModal}
          activePromo = {activePromo}
          onSubmit = { this.onSubmit }
          errors = { this.state.errors }
        />
        <div className="container">
          <div className="row">
            <div className="col-md-10 mx-auto">
              { this.renderAddButton() }
            </div>
          </div>
        </div>
        {this.renderPromos()}
        <Footer />
      </Fragment>
    )
  }
}

export default Promos;