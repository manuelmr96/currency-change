import axios from 'axios';
import debounce from 'lodash.debounce';

import { ActionTypes as types } from './constants';

export function changeOriginAmount( newAmount ){
    return {
        type: types.CHANGE_ORIGIN_AMOUNT,
        data: { newAmount } 
    };
}

export function changeDestinationAmount( newAmount ){
    return { 
        type: types.CHANGE_DESTINATION_AMOUNT,
        data: { newAmount }
    };
}

export function changeCurrency( currentlyEditting, newCurrency ){
    return { 
        type: types.CHANGE_CURRENCY,
        data: { currentlyEditting, newCurrency }
    };
}

export function fetchConversionRate( payload ){
    return ( dispatch ) => {
        makeConversionAjaxCall( payload, dispatch );
    }
}

export function fetchFees( payload ){
    return ( dispatch ) => {
        makeFeeAjaxCall( payload, dispatch );
    }
}

export function fetchRate( payload ){
    return ( dispatch ) => {
        makeRateAjaxCall( payload, dispatch );
    }
}

function _makeConversionAjaxCall( payload, dispatch ){
    
    dispatch( { type : types.REQUEST_CONVERSION_RATE, data : payload } );

    axios.get( 'http://localhost:3900/api/conversion', {
        params: payload
    })
    .then( ( resp ) =>{
        dispatch( { type : types.RECIVED_CONVERSION_RATE_SUCCESS, data : resp.data } );
        dispatch( fetchFees( resp.data  ) )
    })
    .catch( ( resp ) => {
        var errorMsg = getErrorMsg( resp )
        dispatch( { type : types.RECIVED_CONVERSION_RATE_FAILURE, data : { errorMsg, failCall: 'CONVERSION_RATE' } } );
    });

}



function _makeFeeAjaxCall( payload, dispatch ){
    
    dispatch( { type : types.REQUEST_FEES, data : payload } );   

    axios.get( 'http://localhost:3900/api/fees', {
        params: payload
    })
    .then( ( resp ) =>{
        dispatch( { type : types.RECIVED_FEES_SUCCESS, data : resp.data } );
    })
    .catch( ( resp ) => {
        var errorMsg = getErrorMsg( resp )
        dispatch( { type : types.RECIVED_FEES_FAILURE, data : { errorMsg, failCall: 'FEES' } } );
    });

}



function _makeRateAjaxCall( payload, dispatch ){
    dispatch( { type : types.REQUEST_RATE, data : payload } );   

    axios.get( 'http://localhost:3900/api/rate', {
        params  :   payload
    })
    .then( ( resp ) => {
        dispatch( { type : types.RECIVED_RATE_SUCCESS, data : resp.data } );
    })
    .catch( ( resp ) => {
        var errorMsg = getErrorMsg( resp )
        dispatch( { type : types.RECIVED_RATE_FAILURE, data : { errorMsg, failCall: 'RATE' } } );
    } );

}

var makeConversionAjaxCall = debounce( _makeConversionAjaxCall, 300 );
var makeFeeAjaxCall = debounce( _makeFeeAjaxCall, 300 );
var makeRateAjaxCall = debounce( _makeRateAjaxCall, 50 );

function getErrorMsg( resp ){
    var errorMsg =   "Error. Please try again later.";

    if( resp && resp.request && resp.request.status === 0 ){
        errorMsg =   'Oh no! App appears to be offline';
    }
    return errorMsg;
}
