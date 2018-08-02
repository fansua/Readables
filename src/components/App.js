import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppLogo from '../images/AppLogo.png'
import {getPosts, getPostComments,getCategories } from '../actions'
import '../App.css'
import * as api from '../utils/ReadablesAPI'
import { withRouter,Route, Switch  } from 'react-router-dom'
import AppHome from './AppHome'
import PostForm from './PostForm'
import CommentForm from './CommentForm'
import PostDetails from './PostDetails'
import NotFound from './NotFound'

class App extends Component {


 componentDidMount() {

    api.getCategories().then(defaultCategories => {
      this.props.loadDefaultCategories(defaultCategories)
    api.getPosts().then( defaultPost => {
      this.props.loadDefaultPosts(defaultPost)
      defaultPost.forEach(obj => {
          api.getPostComments(obj.id).then(defaultComments =>{
            this.props.loadDefaultComments(defaultComments)
    }
          )
      })
    })
    })

    }
  render() {

     if(this.props.match.isExact === false && this.props.location.key === undefined)
     {
       return <NotFound />
     }
    return (
      <div className="App">
        <header className="App-header">
        <nav>
            <img src={AppLogo} className="App-logo" alt="App-logo" />
            <h1 className="App-title">Readables</h1>
        </nav>
        </header>
          <Switch>
           <Route exact path='/' component={AppHome} />
           <Route exact path='/create' component={PostForm}  />
           <Route exact path='/:category' component={AppHome} />
           <Route exact path='/:category/:post_id' component={PostDetails} />
           <Route exact path='/:category/:post_id/comment' component={CommentForm} />
           <Route  component={NotFound} />
          </Switch>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadDefaultCategories: (defaultData) => dispatch(getCategories(defaultData)),
    loadDefaultPosts: (defaultData) => dispatch(getPosts(defaultData)),
    loadDefaultComments: (defaultData) => dispatch(getPostComments(defaultData))
  }
}

export default withRouter (connect(null,mapDispatchToProps)(App))
