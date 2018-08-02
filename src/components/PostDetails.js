import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Comment from './Comment'
import * as api from '../utils/ReadablesAPI'
import {updatePostVote,deletePost,editPost } from '../actions'
import Modal from 'react-modal'
import * as utils from '../utils/helpers'
import EditPostModal from './EditPostModal'
import NotFound from './NotFound'

Modal.setAppElement('#root')

class PostDetails extends Component{

  state ={
     votingOnPost:false,
     removingPost: false,
     postModalOpen:false,
     editPostInfo:null,
  }
    handlePostVote = (id,voteOption) => {

      const voteDetails = {
        option:voteOption,

      }
      this.setState(() => ({votingOnPost:true }))
      api.updatePostVote(id,voteDetails).then( results => {

        this.props.uploadVoteToStore(results.id,results.voteScore)
          this.setState(() => ({votingOnPost:false }))
      });
    }
    removePost = (id) => {

      this.setState(() => ({removingPost:true }))
      api.deletePost(id).then( removedPost => {
        api.getPostComments(removedPost.id).then( removedPostComments => {
          this.props.uploadDeletedPostInfoToStore(id)
        })
      });
    this.setState(() => ({removingPost:false }))
    this.props.history.push('/')
    }

    openEditPostModal = (editPostInfo) => {
    this.setState(() => ({
      postModalOpen: true,
      editPostInfo,
    }))
  }
  closeEditPostModal = () => {
    this.setState(() => ({
      postModalOpen: false,
    }))
  }

  updateEdittedPost = (id,editDetails) => {
    api.updatePost(id,editDetails).then( editDetails => {
     this.props.uploadPostEditToStore(id,editDetails)

    });
  }

  render(){
    const {postModalOpen,editPostInfo} =this.state
    const {match, post} = this.props
    const filteredPosts = (post.length >0 && match.params.post_id !==null ) ? post.filter(p => p.id === match.params.post_id) :""
    const postId = match.params.post_id

    if(filteredPosts.length === 0){
      return <NotFound />
    }
  
    return(
      <div>
        <Link className='PostDetails-close' to='/'>Previous</Link><br />
        <div className="PostDetails-Container">
          {filteredPosts && filteredPosts.map((post) => (
            <section className="PostDetails-Section" key={post.id}>
              <header className="PostDetails-Header">
                  <h2 className="PostDetails-Title">{post.title}</h2>
                  <h6 className="PostDetails-Info">
                    Posted By: <span className="PostDetails-Author">{post.author}</span>
                     <p to={`${post.category}`} className="post-e-category">{utils.capitalize(post.category)}</p>
                    on {utils.formatDate(post.timestamp)}
                    </h6><br />
              </header>
              <div className="post-body">
                <p>{post.body}</p>
              </div><br/>
              <div>

              <div className="icon-container" >{post.commentCount}<i className="icon VoteScore" title="PostDetails-VoteScore"/>
                <div className="icon-desc">Comments</div>
              </div>

              <div className="icon-container" >{post.voteScore}<i className="icon CommentCount" title="PostDetails-CommentCount"/>
                <div className="icon-desc">Votes</div>
              </div>

              <div className="icon-container" onClick={() => this.handlePostVote(post.id, "upVote")}><i className="icon Thumbs-Up" title="UpVote"/>
                <div className="icon-desc">UpVote</div>
              </div>
              <div className="icon-container" onClick={() => this.handlePostVote(post.id, "downVote")}><i className="icon Thumbs-Down" title="DownVote"/>
                 <div className="icon-desc">DownVote</div>
              </div>
              <div className="icon-container" onClick={() => this.removePost(post.id)}>
                 <i className="icon Delete-Post" title="Delete this Post"/>
                 <div className="icon-desc">Delete</div>
              </div>
              <div className="icon-container" onClick={() => this.openEditPostModal(post)}>
                 <i className="icon Edit-Post" title="edit Post"/>
                 <div className="icon-desc">Edit</div>
              </div>

              <div className="icon-container">
              <Link to={`${match.url}/comment`} className="" >
                 <i className="icon Edit-Post" title="edit Post"/>
                 <div className="icon-desc">comment</div>
                 </Link>
              </div>

            </div>
          </section>

          ))}
        </div>
          <Comment  postId={postId}/>

          <Modal
            className='modal'
            overlayClassName='overlay'
            isOpen={postModalOpen}
            onRequestClose={this.closeEditPostModal}
            contentLabel='Modal'
            >
            {postModalOpen &&
              <div>
              <EditPostModal
                editPostInfo={editPostInfo}
                onUpdatePostDetails ={(id,editDetails) => {
                  this.updateEdittedPost(id,editDetails)
                  this.closeEditPostModal()
                }}
              onCancelModal ={ ()=> {this.closeEditPostModal()}}
              />


              </div>}
        </Modal>

      </div>
    )
  }
}

function mapStateToProps({categories, post,comment}){
  return{categories,post, comment}
}

function mapDispatchToProps (dispatch) {
  return {
    uploadVoteToStore: (id,voteScore) => dispatch(updatePostVote(id,voteScore)),
    uploadDeletedPostInfoToStore: (id) => dispatch(deletePost(id)),
    uploadPostEditToStore: (id,editDetails) => dispatch(editPost(id,editDetails))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(PostDetails)
