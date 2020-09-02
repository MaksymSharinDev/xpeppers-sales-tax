/*
    Maksym Sharin Note.
    javascript float bug
    (18.99 +  1.9) = 20.889999999999997
    try in node console if you don’t trust me
    (or maybe it’s intended as part of the challenge
    for verify troubleshooting skills of unthinkable errors )
    And here the article:
    https://medium.com/@ellenaua/floating-point-errors-in-javascript-node-js-21aadd897bf8.
*/
var Decimal = require('decimal.js');

function taxPolicy(){
    return {
        basicSalesTax :
            function( taxableItem , taxHandler ){
                let whiteList = ["book","chocolate","pills"]
                let found = false;
                for (let i = 0; i < whiteList.length; i++) {
                  excludedItemName = whiteList[i];
                  found =
                  taxableItem.name.search( excludedItemName ) === -1  ? false : true
                  taxableItem.name.search( excludedItemName ), "  " , found  );
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

                let taxes = new Decimal( 0 ) ;

                if ( taxHandler.taxRate.gt( 0 ) ){
                    taxes = new Decimal
                    ( taxHandler.taxRate.mul( taxableItem.price.div(100) ));
                    taxes = taxes.mul(20).ceil().div(20);
                }

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