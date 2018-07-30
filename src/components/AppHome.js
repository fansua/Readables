import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ListPosts from './ListPosts'


class AppHome extends Component{

  state ={
    sortValue:'Date: newest first'
  }

  sortPostBy = (sortValue) => {
    this.setState({sortValue})
  }


  render() {

      const {categories,match} = this.props
      const{ sortValue} = this.state

       const listCategory = match.params.category || "all"
       const sortOptions = ['Date: newest first','Date: oldest first','Votes: highest first','Votes: lowest first']
       return (
        <div className="AppHome-header">
          <nav>
            <ul>
              <li className="AppHome-Addpost">
                <Link to="/create" className="">Post</Link>
              </li>
            </ul>
          </nav>
          <nav>
          <h5>Sort by</h5>
            <select className=""  onChange= {(event) => this.sortPostBy(event.target.value)}>
              {sortOptions.map( (opt) => (
                <option key={opt} value= {opt}>{opt}</option>
              ))}
            </select>
          </nav>
          <nav className="AppHome-Category">
          <h5>Categories</h5>
            <ul className="AppHome-CategoryList">
            <li><Link to='/'>All</Link></li>
              {categories && categories.map((category) => (
                <li  key={category.path}>
                  <Link to={`${category.path}`}>
                    <b>{category.name}</b>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ListPosts listCategory={listCategory}
          sortBy={sortValue} match={match}/>
        </div>
      );
    }
  }

function mapStateToProps({categories, post,comment}){
  return{categories,post, comment}
}

export default connect(mapStateToProps,null)(AppHome)
