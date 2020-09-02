var Decimal = require('decimal.js');
function TaxHandler() {
    //so wtf why not plain vanilla js float? i answer you later.
    //It’s a fun story. But not so much for me.
    this.taxRate = new Decimal(0) ;
    this.taxedPrice = new Decimal(0.0);
    this.totTexes = new Decimal(0.0);
    this.totPrice = new Decimal(0.0);

    this.parseProducts =
        function (productsString) {
            //pretty routine work
            //iteration of elements, regex-driven data catching and type parsing
            this.products = [];
            //array newline splitting + pop combo,
            //i am a junior but not that junior
            productsArray = productsString.split("\n");
            productsArray.pop();
            productsArray.forEach(
                productLine => {
                    this.products.push(
                        {
                            quantity:
                                new Decimal(  (productLine.match(/^(\d)(?= .*)/g))[0]  ),
                            name:
                                 productLine.match(/(?<= )(.*)(?= at)/g)[0] ,
                            price:
                                new Decimal(  productLine.match(/(?<= at )(\d+(\.\d{1,2})?)$/g)[0] )
                        }
                    );

                }
            );
        //the bus is full LETS GO!
        }



    this.applyPolicies =
        function (taxableObj , taxPolicy ) {
            //that is an interesting part because
            //the thinking behind this is about "hey taxes policy change!"
            //for that the rules need to be written with maintenance in mind
            //so the rule handling must to be dynamic
            //abstraction is the key.
            this.taxRate = new Decimal(0);
            this.taxedPrice = new Decimal(0.0 ) ;
            for ( let taxFunction in taxPolicy ) {
                //that for don’t execute allll the proprieties down the Object Prototype Chain
                if ( Object.prototype.hasOwnProperty.call(taxPolicy, taxFunction ) )
                //and the tax handler is on the obscure way to the policies forest...
                //Yeah Dante Alighieri, useful for comments creative writing
                { taxPolicy[taxFunction]( taxableObj , this ); }
            }
        }

}

module.exports = TaxHandler;