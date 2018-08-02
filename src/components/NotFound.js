import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import ErrorNotFound from '../images/404-error.png'

class NotFound extends Component {


    render() {
        return (
          <div>
               <Link className='PostDetails-close' to='/'>Previous</Link><br />
                <div className="AppHome-Category">
                    <img src={ErrorNotFound} alt="Not found" />
                </div>
          </div>

        )
    }
}

export default NotFound
