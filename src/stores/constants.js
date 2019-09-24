import keymirror from 'keymirror';

export var ActionTypes = keymirror({
    CHANGE_ORIGIN_AMOUNT            : null,
    CHANGE_DESTINATION_AMOUNT       : null,
    CHANGE_CURRENCY                 : null,
    REQUEST_CONVERSION_RATE         : null,
    RECIVED_CONVERSION_RATE_SUCCESS : null,
    RECIVED_CONVERSION_RATE_FAILURE : null,
    REQUEST_FEES                    : null,
    RECIVED_FEES_SUCCESS            : null,
    RECIVED_FEES_FAILURE            : null,
    REQUEST_RATE                    : null,
    RECIVED_RATE_SUCCESS            : null,
    RECIVED_RATE_FAILURE            : null
});