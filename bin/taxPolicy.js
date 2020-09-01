
let taxPolicy = {
    basicSalesTax :
        function( taxableItem ){
            let whiteList = ["book","chocolate","pills"]
            let notFound = true;
            whiteList.forEach(
                excludedItemName =>
                notFound =
                taxableItem.name.search( excludedItemName ) === -1  ? true : false
            );
            if (notFound){
                this.taxRate += 10;
            }
            else{
                return
            }
        },
    importDuty :
        function( taxableItem ){
            if ( taxableItem.name.search("imported") === -1 ){
                return
            }
            else{
                this.taxRate += 5
            }
        },
    applySalesTaxes :
        function( taxableItem ){
            let taxes =
            ( this.taxRate / 100 ) *
            ( taxableItem.price / 100 );
            taxes = (
            ( numberRoundTo, valueToRound ) =>
                return Math.round( valueToRound / numberRoundTo ) * numberRoundTo
            )( 0.05 , taxes );
            this.taxedPrice = ( taxableItem.price + taxes ) * taxableItem.quantity;
            this.totTexes += taxes * taxableItem.quantity ;
            this.totPrice += taxableItem.price
        }


}


exports.taxPolicy = taxPolicy