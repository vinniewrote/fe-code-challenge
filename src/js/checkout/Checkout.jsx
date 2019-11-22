import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import Confirmation from '../confirmation/Confirmation';
class Checkout extends React.Component {
    static propTypes = {
        backToSearch: PropTypes.func.isRequired,
        selectedSpot: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {
            spotId: this.props.selectedSpot.id,

            email: '',

            checkoutSuccess: false,
        };

        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();
        this.emailRef = React.createRef();
        this.phoneRef = React.createRef();
    }
    _onPurchaseSpot = event => {
        event.preventDefault();
        const user = {
            spotId: this.state.spotId,
            firstName: this.firstNameRef.current.value,
            lastName: this.lastNameRef.current.value,
            email: this.emailRef.current.value,
            phone: this.phoneRef.current.value,
        };
        axios
            .post('http://localhost:8000/api/reservations', { user })
            .then(res => {
                console.log(res);
            });

        this.setState({
            email: this.emailRef.current.value,
            checkoutSuccess: true,
        });
        event.currentTarget.reset();
    };

    render() {
        const { selectedSpot, backToSearch } = this.props;
        const selectedPrice = parseFloat(selectedSpot.price / 100).toFixed(2);

        return (
            <CSSTransition in appear classNames="fade" timeout={300}>
                <div className="Checkout">
                    <div className="checkout-backdrop">
                        {!this.state.checkoutSuccess && (
                            <div className="base-card checkout-card">
                                <nav>
                                    <button onClick={backToSearch}>
                                        {`< Back to Search`}
                                    </button>
                                </nav>
                                <div className="card">
                                    <div className="selected-details">
                                        <img
                                            src={selectedSpot.image}
                                            alt="your spot"
                                        />
                                        <div className="copy">
                                            <h2>{selectedSpot.title}</h2>
                                            <p>{selectedSpot.distance}</p>
                                        </div>
                                    </div>

                                    <form onSubmit={this._onPurchaseSpot}>
                                        First name
                                        <input
                                            ref={this.firstNameRef}
                                            type="text"
                                            name="firstname"
                                            required
                                        />
                                        Last name
                                        <input
                                            ref={this.lastNameRef}
                                            type="text"
                                            name="lastname"
                                            required
                                        />
                                        Email
                                        <input
                                            ref={this.emailRef}
                                            type="email"
                                            name="email"
                                            required
                                        />
                                        Phone
                                        <input
                                            ref={this.phoneRef}
                                            type="phonenumber"
                                            name="email"
                                        />
                                        <button
                                            className="Button"
                                            type="submit"
                                        >
                                            Purchase for ${selectedPrice}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                        {this.state.checkoutSuccess && (
                            <Confirmation
                                selectedSpot={selectedSpot}
                                email={this.state.email}
                                backToSearch={backToSearch}
                            />
                        )}
                    </div>
                </div>
            </CSSTransition>
        );
    }
}

export default Checkout;
