import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios'

class AddImage extends Component {
  state = {
    selectedImage: null
  }

  onCloseModal = () => {
    this.setState({
      selectedImage: null
    }, () => {
      this.props.closeModal()
    })
  }

  handleFileChange = (e) => {
    this.setState({
      selectedFile:  e.target.files[0],
    })
  }


  submit = async(e) => {
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    await axios.post("http://localhost:5000/upload", data)
  }

  render() {
    const { isOpen } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={this.onCloseModal}
        ariaHideApp={false}
      >
        <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input onChange={(e) => this.handleFileChange(e)} type="file" name="image" id="image" className="form-control" />
          </div>
          <button onClick={() => this.submit()}>submit</button>
      </Modal>
    )
  }
}

export default AddImage;