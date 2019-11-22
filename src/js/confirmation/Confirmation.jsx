import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'common/Button';
import Image from 'common/Image';

class Confirmation extends PureComponent {
    static propTypes = {
        email: PropTypes.string,
        selectedSpot: PropTypes.object,
        backToSearch: PropTypes.func,
    };

    render() {
        const { email, selectedSpot, backToSearch } = this.props;

        if (!selectedSpot) {
            return null;
        }

        return (
            <div className="Confirmation">
                <h1>Park it like its hot!</h1>
                <p>
                    You successfully purchased parking at{' '}
                    <strong>{selectedSpot.title}</strong> for{' '}
                    <strong>${(selectedSpot.price / 100).toFixed(2)}</strong>.
                </p>
                <Image src={selectedSpot.image} />
                <p>
                    We emailed a receipt to{' '}
                    <a href={`mailto:${email}`}>{email}</a>.
                </p>
                <Button color="primary" onClick={backToSearch}>
                    Purchase Another Spot!
                </Button>
            </div>
        );
    }
}

export default Confirmation;
