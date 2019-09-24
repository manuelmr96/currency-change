import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FeesTable extends Component {

    render(){
        var { conversionRate, fee, total, originCurrency, destinationCurrency } = this.props;
        return(
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" >Conversion Rate</th>
                            <th scope="col" >1 { originCurrency } -> { conversionRate.toFixed( 2 ) } { destinationCurrency } </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th> Fee </th>
                            <td> { fee.toFixed( 2 ) } { originCurrency } </td>
                        </tr>
                        <tr>
                            <th className="total-lable"> Total Cost </th>
                            <td> { total.toFixed( 2 ) } { originCurrency } </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

FeesTable.propTypes = {
    conversionRate      : PropTypes.number.isRequired,
    originCurrency      : PropTypes.string.isRequired,
    total               : PropTypes.number.isRequired,
    destinationCurrency : PropTypes.string.isRequired
}

export default FeesTable;