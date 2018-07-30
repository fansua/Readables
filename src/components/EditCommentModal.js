
import React, { Component } from 'react'
import serializeForm from 'form-serialize'

class EditCommentModal extends Component{

  state ={
    commentTimestamp: Date.now(),
    commentContent: this.props.editCommentInfo.body,
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
      timestamp: Date.now(),
      body: editData.body
    }

  if(this.props.onUpdateCommentDetails)
  this.props.onUpdateCommentDetails(this.props.editCommentInfo.id,editDetails)
  }

  cancelModal = () => {
  if(this.props.onCancelModal)
  this.props.onCancelModal()
  }

  render(){
    return(
      <div >
        <h1>Edit Comment</h1>
        <form onSubmit={this.handleEditSubmit} className="">

            <div className='input-container'>

                Content: <br />
                <textarea
                  name='body'
                  defaultValue={this.state.commentContent}
                  onChange={this.handleInputChange}
                  required='required'
                />
            </div>
            <button  onClick={() => this.cancelModal()}>Cancel</button>
            <button type="submit" className="">Edit Comment</button>
        </form>
      </div>
  )
  }
}
export default EditCommentModal
