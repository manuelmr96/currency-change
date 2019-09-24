import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../stores/actions';


// import * from '../stores/actions';

import FeesTable from './FeesTable';

class Conversion extends Component {

    constructor( props ){
        super( props );
        this.originsAmountChange        = this.originsAmountChange.bind( this );
        this.destinationAmountChange    = this.destinationAmountChange.bind( this );
        this.currencyOrigenChange       = this.currencyChange.bind( this, 'origin' );
        this.currencyDestinationChange  = this.currencyChange.bind( this, 'destination' );
    }
    
    componentDidMount( ) {
        
        this.originAmountInput.focus();
        
    }

    currencyChange( currentlyEditting, event ){
        
        var obj =  {};
        if( currentlyEditting === 'origin' ){
            obj.originCurrency      =   event.target.value;
            obj.destinationCurrency =   this.props.destinationCurrency;
        } else {
            obj.destinationCurrency =   event.target.value;
            obj.originCurrency      =   this.props.originCurrency;
        }

        this.props.dispatch( actions.changeCurrency( currentlyEditting, event.target.value ) );
        
        this.props.dispatch( actions.fetchRate( {
            destinationAmount       : this.props.destinationAmount,
            originAmount            : this.props.originAmount,
            destinationCurrency     : obj.destinationCurrency,
            originCurrency          : obj.originCurrency
        }));

    }
    
    originsAmountChange( event ){

        var newAmount   =   event.target.value;
        newAmount   =   newAmount.replace( ',', '' );

        this.props.dispatch( actions.changeOriginAmount( newAmount ) );

        var payload =   {
            originAmount        : newAmount,
            destinationAmount   : this.props.destinationAmount,
            destinationCurrency : this.props.destinationCurrency,
            originCurrency      : this.props.originCurrency,
            conversionRate      : this.props.conversionRate,
            calcOrigenAmount    : false
        };
    
        this.props.dispatch( actions.fetchConversionRate( payload ) );

    }

    destinationAmountChange( event ){

        var newAmount   =   event.target.value;
        newAmount   =   newAmount.replace( ',', '' );

        this.props.dispatch( actions.changeDestinationAmount( newAmount ) );

        var payload = {
            originAmount        : this.props.originAmount,
            destinationAmount   : newAmount,
            destinationCurrency : this.props.destinationCurrency,
            originCurrency      : this.props.originCurrency,
            conversionRate      : this.props.conversionRate,
            calcOrigenAmount    : true
        };

        this.props.dispatch( actions.fetchConversionRate( payload ) );

    }

    render(){ 
        console.log( this.props.errorMsg );
        if( this.props.errorMsg ){
            var errorMsg    = <div className="errorMsg"> { this.props.errorMsg } </div>
        }
        return ( 
            <div>
                { errorMsg }
                <label> Convert </label> &nbsp;
                <input type='number' ref={ input  => this.originAmountInput = input } onChange={ this.originsAmountChange } className="amount-field" value={ this.props.originAmount }/>
                <select value={ this.props.originCurrency } onChange={ this.currencyOrigenChange }>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="JPY">JPY</option>
                </select>
                &nbsp;to <input type='number' ref={ input  => this.destinationAmountInput = input } onChange={ this.destinationAmountChange } className="amount-field" value={ this.props.destinationAmount }/>
                <select value={ this.props.destinationCurrency } onChange={ this.currencyDestinationChange }>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="JPY">JPY</option>
                </select>
                <br/><br/><br/>

                <FeesTable
                    originCurrency={ this.props.originCurrency }
                    destinationCurrency={ this.props.destinationCurrency }
                    fee={ this.props.fee }
                    total={ this.props.totalCost }
                    conversionRate={ this.props.conversionRate }
                />    
            </div>
        );
    }
}

export default connect( ( state )    =>  {
    return  {
        originAmount:           state.amount.originAmount,
        destinationAmount:      state.amount.destinationAmount,
        conversionRate:         state.amount.conversionRate,
        destinationCurrency:    state.amount.destinationCurrency,
        fee:                    state.amount.fee,
        originCurrency:         state.amount.originCurrency,
        totalCost:              state.amount.totalCost,
        errorMsg:               state.error.errorMsg

    }
} )( Conversion );