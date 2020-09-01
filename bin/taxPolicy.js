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
                let taxes =
                ( taxHandler.taxRate ) *
                ( taxableItem.price / 100 );
                console.log("Applied Rate taxes: ", taxes);
                taxes = (
                ( numberRoundTo, valueToRound ) =>
                   { return Math.round( valueToRound / numberRoundTo ) * numberRoundTo }
                )( 0.05 , taxes );
                console.log("Applied Rounding Rule: ", taxes );
                taxHandler.taxedPrice = ( taxableItem.price + taxes ) * taxableItem.quantity;
                taxHandler.totTexes += taxes * taxableItem.quantity ;
                taxHandler.totPrice += taxHandler.taxedPrice
            }


    }
}



module.exports = taxPolicy