import React, { Component } from 'react';
import PaypalButton from './PayPalExpressCheckout';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* Client and environment configuration */
const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'sandbox';
const CLIENT = {
    sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX,
    production: process.env.REACT_APP_PAYPAL_CLIENT_ID_PRODUCTION
}

class Order extends Component {

    render() {

        if(!this.props.isUserLoggedIn){
            this.props.history.push('/auth/signin')
        }

        const onSuccess = (payment) => {
            console.log("Your payment was succeeded!", payment);
        }
        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup! 
            console.log('You have cancelled the payment!', data);
        }
        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script! 
            console.log("Error!", err);
            // Since the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js" 
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear			 
        }
        let currency = 'USD'; // or you can set this value from your props or state   
        let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout 
        return (
            <PaypalButton
                env={ENV}
                client={CLIENT}
                currency={currency}
                total={total}
                onError={onError}
                onSuccess={onSuccess}
                onCancel={onCancel}
            />
        );
    }
}

const mapStateToProps = ({ isUserLoggedIn }) => ({
    isUserLoggedIn: isUserLoggedIn.currentUser.isAuthenticated,
    user: isUserLoggedIn.currentUser.user
});

export default connect(mapStateToProps)(withRouter(Order));