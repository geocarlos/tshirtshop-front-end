import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, isLoggedIn } from '../actions';
import { urls } from '../constants/constants';
import { withRouter, Link } from 'react-router-dom';

class SignIn extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        for (const item in this.state) {
            if (this.state[item] === '') {
                window.alert('All fields are required');
                return;
            }
        }
        this.props.dispatch(signIn(urls.URL_SIGNIN, this.state));
        this.props.dispatch(isLoggedIn(urls.URL_IS_LOGGED_IN));
        this.props.history.goBack();
    }


    render() {

        return (
            <div className='sign-in'>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email: </label>
                    <input id="email" type="email" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} required />
                    <label htmlFor="password">Password: </label>
                    <input id="password" type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} required />
                    <input type="submit" id="submit" value="Sign In" />
                </form>
                <div>Not registerd? <Link to='/auth/signup'>Sign-up</Link></div>
            </div>
        )
    }
}

const mapStateToProps = ({ signIn, history, isUserLoggedIn }) => ({
    history,
    isPending: signIn.isPending,
    error: signIn.error,
    result: signIn.result.signin,
    isUserLoggedIn: isUserLoggedIn.currentUser.isAuthenticated,
    loginError: isUserLoggedIn.error
})

export default connect(mapStateToProps)(withRouter(SignIn));