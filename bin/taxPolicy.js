/*
    Maksym Sharin Note.
    Why Decimal.js Library?
    what about javascript float bug guys, very very fun joke.
    (18.99 +  1.9) = 20.889999999999997
    try in node console if you don’t trust me
    (or maybe it’s intended as part of the challenge
    for verify troubleshooting skills of unthinkable errors )
    Here the article:
    https://medium.com/@ellenaua/floating-point-errors-in-javascript-node-js-21aadd897bf8.
*/
var Decimal = require('decimal.js');

function taxPolicy(){
    return {
        basicSalesTax :
            function( taxableItem , taxHandler ){
                //simple, you are one of this three bad guy?
                //ok youn can go tax-free because you
                //are the book,food,medicine privileged goods.
                //if not aha! 10% of taxes, pay!
                let whiteList = ["book","chocolate","pills"]
                let found = false;
                for (let i = 0; i < whiteList.length; i++) {
                  excludedItemName = whiteList[i];
                  found =
                  taxableItem.name.search( excludedItemName ) === -1  ? false : true
                  if ( found === true ) { return }
                  if ( i === whiteList.length-1  )
                  {
                      taxHandler.taxRate =
                      taxHandler.taxRate.add(10);
                  }
                }
            },
        importDuty :
            function( taxableItem , taxHandler ){
                //so that country isn't a free market enthusiast
                //for that if you are imported, 5% of taxes for you
                if ( taxableItem.name.search("imported") === -1 ){
                    return
                }
                else{
                    taxHandler.taxRate=
                    taxHandler.taxRate.add(5)  ;
                }
            },
        applySalesTaxes :
            function( taxableItem , taxHandler ){
                //i gonna have nightmares for that
                let taxes = new Decimal( 0 ) ;
                //if there is taxes let’s go to round!
                if ( taxHandler.taxRate.gt( 0 ) ){
                    // so for make taxes going to nearest 0.05
                    // keeping in mind that it is 1/20
                    // we gonna make it 20 time bigger, ceil to next ,
                    // and resize again back, and voila magic math trick!
                    taxes = new Decimal
                    ( taxHandler.taxRate.mul( taxableItem.price.div(100) ));
                    taxes = taxes.mul(20).ceil().div(20);
                }
                //so here we take in account the quantity of products
                //and tell at our caller object what put where
                taxHandler.taxedPrice =
                taxableItem.price.add( taxes ).mul(taxableItem.quantity)

                taxHandler.totTexes =
                taxHandler.totTexes.add( taxes.mul( taxableItem.quantity ) )

                taxHandler.totPrice =
                taxHandler.totPrice.add( taxHandler.taxedPrice)
            }
    }
}

module.exports = taxPolicy