import React, { Component } from 'react'

import './Filter.css';

class Filter extends Component {
    changeHandler = (e) => {
        this.props.changeFilter(e.target.value);
    }

    render() {
        return (
            <div style={{overflow: "hidden"}}>
            <select className="filterDropdown" onChange={this.changeHandler}>
                <option value={this.props.filterValues.SHOW_ALL}>SHOW ALL</option>
                <option value={this.props.filterValues.SHOW_COMPLETED}>SHOW COMPLETED</option>
                <option value={this.props.filterValues.SHOW_PENDING}>SHOW PENDING</option>
            </select>
            </div>
        )
    }
}

export default Filter
