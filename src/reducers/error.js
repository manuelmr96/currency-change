import { ActionTypes as types } from '../stores/constants';

var defaultState    =   {
    errorMsg    :   ''
};

function error( state  =   defaultState, action ){

    switch( action.type ){
        
        case types.RECIVED_CONVERSION_RATE_FAILURE :
            return {    ...state,   errorMsg    :   action.data.errorMsg    };

        case types.RECIVED_FEES_FAILURE :
            return {    ...state,   errorMsg    :   action.data.errorMsg    };

        case types.RECIVED_RATE_FAILURE :
            return {    ...state,   errorMsg    :   action.data.errorMsg    };
        
        case types.RECIVED_CONVERSION_RATE_SUCCESS, types.RECIVED_FEES_SUCCESS, types.RECIVED_RATE_SUCCESS  :
            return {    ...state,   errorMsg    :   ''    };
            
        default:
            return state;
    }
}

export default error;