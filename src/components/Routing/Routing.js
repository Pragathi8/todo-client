import React, { Component } from 'react'
import {connect} from 'react-redux';

import Login from '../Login/Login';
import Header from '../Header/Header';
import Filter from '../Filter/Filter';
import Card from '../Card/Card';

export class Routing extends Component {
    
    render() {
        return (
            <div className="App">
                {
                    this.props.isLoggedIn ?
                        (<>
                            <Header />
                            <Filter />
                            <Card />
                        </>)
                        : <Login />
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.authInfo.isLoggedIn,
})

export default connect(mapStateToProps)(Routing);
