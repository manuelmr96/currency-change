
import { ActionTypes as types } from '../stores/constants';

var defaultState    =   {
    originCurrency      :   'USD',
    destinationCurrency :   'EUR',
    conversionRate      :   0.91,
    originAmount        :   0.00,
    destinationAmount   :   0.00,
    fee                 :   0.00,
    totalCost           :   0.00
};

function amount( state  =   defaultState, action ){

    switch( action.type ){
        
        case types.CHANGE_ORIGIN_AMOUNT:
            return  {   ...state,   originAmount    :   action.data.newAmount  };

        case types.CHANGE_CONVERSION_RATE:
            return {    ...state,   conversionRate  :   action.data.conversionRate  };
        
        case types.CHANGE_DESTINATION_AMOUNT:
            return  {   ...state,   destinationAmount   :   action.data.newAmount   };
        
        case types.RECIVED_CONVERSION_RATE_SUCCESS:
            return { 
                ...state,
                destinationAmount   : action.data.destinationAmount,
                originAmount        : action.data.originAmount
            }

        
        case types.RECIVED_FEES_SUCCESS:
            return { 
                ...state,
                fee                 : action.data.fee,
                totalCost           : parseFloat( state.originAmount ) + parseFloat( action.data.fee )
            }

        
        case types.RECIVED_RATE_SUCCESS:
            return {
                ...state,
                destinationAmount   : action.data.destinationAmount,
                conversionRate      : action.data.conversionRate
            }

        case types.CHANGE_CURRENCY:
            if( action.data.currentlyEditting === 'origin' ){
                return {
                    ...state,
                    originCurrency: action.data.newCurrency
                }
            } else {
                return {
                    ...state,
                    destinationCurrency: action.data.newCurrency
                }
            }
        default:
            return state

    }
}

export default amount;