function taxPolicy(){
    return {
        basicSalesTax :
            function( taxableItem , taxHandler ){
                let whiteList = ["book","chocolate","pills"]
                let found = false;
                console.log(taxableItem.name);

                for (let i = 0; i < whiteList.length; i++) {
                  excludedItemName = whiteList[i];
                  found =
                  taxableItem.name.search( excludedItemName ) === -1  ? false : true
                  console.log("found in whitelist? ",
                  taxableItem.name.search( excludedItemName ), "  " , found  );
                  if ( found === true ) { return }
                  if ( i === whiteList.length-1  )
                  {
                      console.log("apply tax --- 10");

                      taxHandler.taxRate += 10;
                  }
                }
            },
        importDuty :
            function( taxableItem , taxHandler ){
                if ( taxableItem.name.search("imported") === -1 ){
                    return
                }
                else{
                    taxHandler.taxRate += 5
                }
            },
        applySalesTaxes :
            function( taxableItem , taxHandler ){
                console.log("taxRate: " , taxHandler.taxRate)
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
                let taxes = 0;

                if ( taxHandler.taxRate > 0 ){

                    taxes =
                    ( taxHandler.taxRate ) *
                    ( taxableItem.price / 100 );
                    console.log("Applied Rate taxes: ", taxes);

                    taxes = (
                    (number, precision, rounding) => {
                      let multiply = 1 / rounding;
                      let roundedFloat =
                      parseFloat (
                        ( Math.round( number * multiply ) / multiply )
                      ).toFixed(precision);
                      return parseFloat ( roundedFloat );
                    })( taxes , 2 , 0.05);

                    console.log("Applied Rounding Rule: ", taxes );


                }


                taxHandler.taxedPrice =
                parseFloat (
                  ( taxableItem.price + taxes ) * taxableItem.quantity

                );
                taxHandler.totTexes =
                     taxHandler.totTexes + (taxes * taxableItem.quantity) ;
                taxHandler.totPrice =
                     taxHandler.totPrice + taxHandler.taxedPrice ;


            }


    }
}



module.exports = taxPolicy