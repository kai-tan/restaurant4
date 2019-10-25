import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { AddAdminAsync } from '../../redux/orders/orders.actions'
import { selectIsFetching, selectAdminAdded } from '../../redux/orders/orders.selectors'


class AddAdminInput extends Component {
    
    state = {
        email: ''
    }

    handleChange = (e) => {
        const email = e.target.value;
        this.setState({email: email}, () => {
            console.log(this.state.email)
        }); 
    }

    handleSubmit = (e) => {
        e.preventDefault(); 
        console.log(this.state.email);
        this.props.AddAdminAsync(this.state.email); 
        
    }
    
    render() {

        const { selectAdminAdded } = this.props

        return (
            <form onSubmit={this.handleSubmit} style={{margin: '0 auto'}}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" onChange={this.handleChange} value={this.state.email} aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">Enter the email of the user that you want to make an admin.</small>
                </div>
                <button type="submit" className="btn btn-info">Make admin</button>
                <p>{selectAdminAdded === false ? '' : 'Admin has been added successfully!'}</p>
            </form>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    selectIsFetching: selectIsFetching,
    selectAdminAdded: selectAdminAdded
})

const mapDispatchToProps = dispatch => ({
    AddAdminAsync: (email) => dispatch(AddAdminAsync(email))
})


export default connect(mapStateToProps, mapDispatchToProps)(AddAdminInput);