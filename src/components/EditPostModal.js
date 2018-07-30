import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'

class EditPostModal extends Component{

  state ={
    postTitle: this.props.editPostInfo.title,
    postContent: this.props.editPostInfo.body,
  }

  handleInputChange = event => {
    const value = event.target.value
    const name = event.target.name

    this.setState({[name]: value})
  }


  handleEditSubmit = (event) => {
    event.preventDefault()
     const editData = serializeForm(event.target, { hash: true })
    const editDetails = {
      title: editData.title,
      body: editData.body
    }

    if(this.props.onUpdatePostDetails)
      this.props.onUpdatePostDetails(this.props.editPostInfo.id,editDetails)
}

cancelModal = () => {
  if(this.props.onCancelModal)
    this.props.onCancelModal()
}



  render(){
    return(
      <div >
        <h1>Edit Post</h1>
        <form onSubmit={this.handleEditSubmit} className="">
          <div className='input-container'>

                Title:<br />
                <input
                  type='text'
                  name='title'
               defaultValue={this.state.postTitle}
                  onChange={this.handleInputChange}
                  required='required'
                />

            </div>
            <div className='input-container'>

                Content: <br />
                <textarea
                  name='body'
                  defaultValue={this.state.postContent}
                  onChange={this.handleInputChange}
                  required='required'
                />
            </div>
          <button  onClick={() => this.cancelModal()}>Cancel</button>
            <button type="submit" className="">Edit Post</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({categories, post,comment}){
  return{categories}
}

export default connect (mapStateToProps,null)(EditPostModal)
