import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextButton from 'common/TextButton';
import SpotItem from 'spot/SpotItem';
import SpotDetail from 'spot/SpotItemDetail';
import { CSSTransition } from 'react-transition-group';
import Checkout from '../../checkout/Checkout';

export default class SpotList extends Component {
    static propTypes = {
        selectedSpot: PropTypes.object,
        spots: PropTypes.arrayOf(PropTypes.object).isRequired,
        setSpot: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            detailsViewOn: false,
            checkoutViewOn: false,
        };
    }

    _onDetailsClick = spot => {
        this.props.setSpot(spot);
        this.setState({ detailsViewOn: true });
    };

    closeWindow = () => {
        this.setState({ detailsViewOn: false });
    };

    bookSpot = () => {
        this.setState({ detailsViewOn: false, checkoutViewOn: true });
    };

    backToSearch = () => {
        this.setState({ checkoutViewOn: false });
    };

    render() {
        const { selectedSpot, spots } = this.props;

        return (
            <div className="SpotWrapper">
                <div className="SpotList">
                    <div className="SpotList-feature">
                        <div className="SpotList-breadcrumbs">
                            <TextButton>Chicago</TextButton> &gt; Millennium
                            Park
                        </div>
                        <h1>Millennium Park</h1>
                        <p>{spots.length} Spots Available</p>
                    </div>
                    <div className="SpotList-spots">
                        {spots.map(spot => {
                            return (
                                <SpotItem
                                    key={spot.id}
                                    data={spot}
                                    isSelected={
                                        selectedSpot &&
                                        selectedSpot.id === spot.id
                                    }
                                    onDetailsClick={this._onDetailsClick}
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="Search-content">
                    {this.state.detailsViewOn && (
                        <CSSTransition
                            in
                            appear
                            classNames="fade"
                            timeout={300}
                        >
                            <SpotDetail
                                selectedSpot={selectedSpot}
                                closeWindow={this.closeWindow}
                                bookSpot={this.bookSpot}
                            />
                        </CSSTransition>
                    )}
                </div>
                {this.state.checkoutViewOn && (
                    <Checkout
                        selectedSpot={selectedSpot}
                        backToSearch={this.backToSearch}
                        congratsSpot={this.congratsSpot}
                    />
                )}
            </div>
        );
    }
}
