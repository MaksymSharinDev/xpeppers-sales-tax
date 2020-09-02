var Decimal = require('decimal.js');
function TaxHandler() {
    //taxRate , taxedPrice , totTexes , totPrice
    this.taxRate = new Decimal(0) ;
    this.taxedPrice = new Decimal(0.0);
    this.totTexes = new Decimal(0.0);
    this.totPrice = new Decimal(0.0);

    this.parseProducts =
        function (productsString) {
            this.products = [];
            productsString.split("\n").forEach(
                productLine => {
                    this.products.push(
                        {
                            quantity:
                                new Decimal(  productLine.match(/^(\d*)(?= .*)/g)[0]  ),
                            name:
                                 productLine.match(/(?<= )(.*)(?= at)/g)[0] ,
                            price:
                                new Decimal(  productLine.match(/(?<= at )(\d+(\.\d{1,2})?)$/g)[0] )
                        }
                    );

                }
            );
        }



    this.applyPolicies =
        function (taxableObj , taxPolicy ) {
            this.taxRate = new Decimal(0);
            this.taxedPrice = new Decimal(0.0 ) ;
            for ( let taxFunction in taxPolicy ) {
                if ( Object.prototype.hasOwnProperty.call(taxPolicy, taxFunction ) )
                { taxPolicy[taxFunction]( taxableObj , this ); }
            }
        }

}

module.exports = TaxHandler;