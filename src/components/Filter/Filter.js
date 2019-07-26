import React, { Component } from 'react';
import {connect} from 'react-redux';

import filterValues from '../../constants/filterValues';
import {changeFilter} from '../../actions/actions';

import './Filter.css';

class Filter extends Component {
    changeHandler = (e) => {
        this.props.changeFilter(e.target.value);
    }

    render() {
        return (
            <div style={{overflow: "hidden"}}>
            <select className="filterDropdown" onChange={this.changeHandler}>
                <option value={filterValues.SHOW_ALL}>SHOW ALL</option>
                <option value={filterValues.SHOW_COMPLETED}>SHOW COMPLETED</option>
                <option value={filterValues.SHOW_PENDING}>SHOW PENDING</option>
            </select>
            </div>
        )
    }
}

export default connect(null, {changeFilter} )(Filter);
