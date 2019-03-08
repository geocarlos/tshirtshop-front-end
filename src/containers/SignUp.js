import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../actions';
import { urls } from '../constants/constants';
import { Link } from 'react-router-dom';

class SignUp extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.password != this.state.confirmPassword) {
            console.log('Password confirmation does not pass');
            return;
        }
        for (const item in this.state) {
            if (this.state[item] === '') {
                console.log('All fields are required');
                return;
            }
        }

        this.props.dispatch(signUp(urls.URL_SIGNUP, this.state));

    }

    render() {
        return (
            <div className='sign-up'>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name: </label>
                    <input id="name" type="text" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} required />
                    <label htmlFor="email">Email: </label>
                    <input id="email" type="email" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} required />
                    <label htmlFor="password">Password: </label>
                    <input id="password" type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} required />
                    <label htmlFor="confirm-password">Confirm password: </label>
                    <input id="confirm-password" type="password" value={this.state.confirmPassword} onChange={(event) => this.setState({ confirmPassword: event.target.value })} required />
                    <input type="submit" id="submit" value="Sign up" />
                    <Link to='/auth/signin'>Sign-in</Link>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({ signUp }) => ({
    isPending: signUp.isPending,
    error: signUp.error,
    user: signUp.user
})

export default connect(mapStateToProps)(SignUp);