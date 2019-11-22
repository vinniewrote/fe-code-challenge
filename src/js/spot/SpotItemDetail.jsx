import React from 'react';

export default class SpotItemDetail extends React.Component {
    render() {
        const { selectedSpot, closeWindow, bookSpot } = this.props;
        const selectedPrice = parseFloat(
            this.props.selectedSpot.price / 100
        ).toFixed(2);

        return (
            <div className="details-backdrop">
                <div className="base-card details-card">
                    <button className="close-window"
onClick={closeWindow}>
                        X
                    </button>
                    <h4>Spot Details</h4>
                    <div className="detail-content">
                        <h5>{selectedSpot.title}</h5>
                        <p>{selectedSpot.description}</p>
                    </div>

                    <button
                        className="Button Button-primary book-it"
                        onClick={bookSpot}
                    >
                        ${selectedPrice} | Book It!
                    </button>
                </div>
            </div>
        );
    }
}
