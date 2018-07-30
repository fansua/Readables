import React, { Component } from 'react'
import { connect } from 'react-redux'
import {addPost } from '../actions'
import {Link} from 'react-router-dom'
import * as api from '../utils/ReadablesAPI'
import serializeForm from 'form-serialize'
import uniqid from 'uniqid'

class PostForm extends Component{


  state = {
    addingPost: false,
  }

  handleSubmit = (event) => {
    event.preventDefault()
     const inputData = serializeForm(event.target, { hash: true })
    const inputPostDetails = {
      id:uniqid(),
      timestamp:Date.now(),
      title: inputData.title,
      body: inputData.body,
      author: inputData.author,
      category: inputData.category
    }

    this.syncNewPost(inputPostDetails)
    this.props.history.push('/')

  };

  syncNewPost = (postDetails) => {
    this.setState(() => ({addingPost:true }))

  api.addPost(postDetails).then( postDetails => {

    this.props.uploadPostToStore(postDetails)

  });
  this.setState(() => ({addingPost:false }))

  }



  render(){


    const { categories } = this.props

    return(
      <div >
        <h1>Create New Post</h1>
        <form onSubmit={this.handleSubmit} className="PostForm">
          <div className='input-container'>

                Title:<br />
                <input
                  type='text'
                  name='title'
                  required='required'
                />

            </div>
            <div className='input-container'>
                Author: <br />
                <input
                  type='text'
                  name='author'
                  required='required'
                />
            </div>
            <div className='input-container'>

                Category:<br />
                <select
                name='category'
                  required='required'
                >
                {categories &&
                 categories.map((category) => (
                  <option key={category.path}>{category.name}</option>
                ))}
                </select>
            </div>
            <div className='input-container'>

                Content: <br />
                <textarea
                  name='body'
                  required='required'
                />
            </div>
            <button><Link className="" to="/">Cancel</Link></button>
            <button type="submit" className="">Add Post</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({categories,post,comment}){
  return{categories}
}

function mapDispatchToProps (dispatch) {
  return {
    uploadPostToStore: (postDetails) => dispatch(addPost(postDetails))
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (PostForm)
