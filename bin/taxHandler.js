
function TaxHandler() {
    //taxRate , taxedPrice , totTexes , totPrice
    this.taxRate = 0;
    this.taxedPrice = 0.0;
    this.totTexes = 0.0;
    this.totPrice = 0.0;

    this.parseProducts =
        function (productsString) {
            this.products = [];
            productsString.split("\n").forEach(
                productLine => {
                    this.products.push(
                        {
                            quantity:
                                parseInt( productLine.match(/^(\d*)(?= .*)/g)[0] , 10 ),
                            name:
                                productLine.match(/(?<= )(.*)(?= at)/g)[0],
                            price:
                                parseFloat( productLine.match(/(?<= at )(\d+(\.\d{1,2})?)$/g)[0] )
                        }
                    );

                }
            );
        }



    this.applyPolicies =
        function (taxableObj , taxPolicy ) {
            this.taxRate = 0;
            this.taxedPrice = 0.0;
            for ( let taxFunction in taxPolicy ) {
                if ( Object.prototype.hasOwnProperty.call(taxPolicy, taxFunction ) )
                { taxPolicy[taxFunction]( taxableObj , this ); }
            }
        }

}

module.exports = TaxHandler;