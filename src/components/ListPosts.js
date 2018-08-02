import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as utils from '../utils/helpers'
import * as api from '../utils/ReadablesAPI'
import {updatePostVote,deletePost, editPost} from '../actions'
import {Link} from 'react-router-dom'
import EditPostModal from './EditPostModal'
import Modal from 'react-modal'

Modal.setAppElement('#root')

class ListPosts extends Component{

state ={
   votingOnPost:false,
   removingPost: false,
   postModalOpen:false,
   editPostInfo:null,
 }
handleVote = (id,voteOption) => {

    const voteDetails = {
      option:voteOption,
    }
    this.setState(() => ({votingOnPost:true }))
    api.updatePostVote(id,voteDetails).then( results => {

      this.props.uploadVoteToStore(results.id,results.voteScore)

    });
    this.setState(() => ({votingOnPost:false }))
  }

removePost = (id) => {

    this.setState(() => ({removingPost:true }))
    api.deletePost(id).then( removedPost => {
      api.getPostComments(removedPost.id).then( removedPostComments => {
        this.props.uploadDeletedPostInfoToStore(id)
      })

    });

  this.setState(() => ({removingPost:false }))

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
    const { post, listCategory,sortBy } = this.props
    const filteredPosts = (post.length >0 && listCategory !==null && listCategory !== "all") ? post.filter(p =>
      p.category === listCategory && p.deleted === false) : post.filter(p => p.deleted ===false )
  if(filteredPosts.length >=2){
     filteredPosts.sort((a,b) =>{
          switch(sortBy){
            case 'Votes: highest first':
              return b.voteScore - a.voteScore
            case 'Votes: lowest first':
              return a.voteScore - b.voteScore
            case 'Date: oldest first':
              return a.timestamp - b.timestamp
            default:
              return b.timestamp - a.timestamp
          }

        }) }
    return(
      <div className="ListPosts-Container">
        { filteredPosts.length > 0 &&filteredPosts.map((p) => (
          <section className="ListPosts-Section" key={p.id}>
            <header className="ListPosts-Header">
                <h2 className="ListPosts-Title">{p.title}</h2>
                <p className="ListPosts-Info">
                  Posted By <span className="ListPosts-author">{p.author}</span>
                    <i className="ListPosts-Link">{utils.capitalize(p.category)}</i>
                  on {utils.formatDate(p.timestamp)}
                  </p>
            </header><br />
            <div className="ListPosts-body">
              <p>{p.body}

                  <Link to={`${p.category}/${p.id}`}className="icon ListPosts-Read-More"></Link>

              </p>
            </div>
            <br />
            <div>

              <div className="icon-container" >{p.commentCount}<i className="icon VoteScore" title="ListPosts-VoteScore"/>
                <div className="icon-desc">Comments</div>
              </div>

              <div className="icon-container" >{p.voteScore}<i className="icon CommentCount" title="ListPosts-CommentCount"/>
                <div className="icon-desc">Votes</div>
              </div>

              <div className="icon-container" onClick={() => this.handleVote(p.id,"upVote")}><i className="icon Thumbs-Up" title="UpVote"/>
                <div className="icon-desc">UpVote</div>
              </div>
              <div className="icon-container" onClick={() => this.handleVote(p.id, "downVote")}><i className="icon Thumbs-Down" title="DownVote"/>
                 <div className="icon-desc">DownVote</div>
              </div>
              <div className="icon-container" onClick={() => this.removePost(p.id)}>
                 <i className="icon Delete-Post" title=" remove Post"/>
                 <div className="icon-desc">Delete</div>
              </div>
              <div className="icon-container" onClick={() => this.openEditPostModal(p)}>
                 <i className="icon Edit-Post" title="edit Post"/>
                 <div className="icon-desc">Edit</div>
              </div>
          </div>
        </section>
        ))}

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
                onUpdateCommentDetails ={ ()=> {this.closeEditCommentModal()}}
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
export default connect(mapStateToProps,mapDispatchToProps)(ListPosts)
