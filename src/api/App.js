'use strict'


var express = require( 'express' );
var bodyParse = require( 'body-parser' );


var app = express();

app.use( bodyParse.urlencoded({ extenderd:false }) );
app.use( bodyParse.json() );

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Allow', 'GET');
    next();
});


app.get( '/api/conversion', ( req, res ) => {
    if( req.query.calcOrigenAmount  ==  'true'    ){
        return res.status( 200 )
                    .send({
                        ...req.query,
                        originAmount : (    req.query.destinationAmount / req.query.conversionRate ).toFixed( 2 )
                    });
    }   else    {
        return res.status( 200 )
                    .send({
                        ...req.query,
                        destinationAmount : ( req.query.originAmount * req.query.conversionRate ).toFixed( 2 )
                    });
    }

});

app.get( '/api/fees', ( req, res ) =>{
    return res.status( 200 )
                .send({
                    ...req.query,
                    fee: req.query.originAmount *   0.10
                });
});

app.get( '/api/rate', ( req, res ) =>{
    
    var conversionRate  =   1; 
    
    if( req.query.originCurrency != req.query.destinationCurrency ){
        switch( req.query.originCurrency ){
            case 'USD':
                switch( req.query.destinationCurrency ){

                    case 'EUR':
                        conversionRate  = 0.91;
                    break;
                    
                    case 'JPY':
                        conversionRate  = 108.01;
                    break;
                }

            break;

            case 'EUR':
                switch( req.query.destinationCurrency ){
                    case 'USD':
                        conversionRate  = 1.10
                    break;

                    case 'JPY':
                        conversionRate  = 118.96;
                    break;
                }

            break;

            case 'JPY':
                switch( req.query.destinationCurrency ){
                    case 'USD':
                        conversionRate  = 0.0093;
                    break;

                    case 'EUR':
                        conversionRate  =   0.0084;
                    break;
                    
                }

            break;
        }

    }

    return res.status( 200 )
                .send({
                    ...req.query,
                    conversionRate,
                    destinationAmount: ( req.query.originAmount * conversionRate ).toFixed( 2 )
                })
});


module.exports  =   app;