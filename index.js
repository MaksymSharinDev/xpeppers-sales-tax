var consoleBasket = require("./bin/consoleBasket.js");
let TaxHandler  =   require("./bin/taxHandler.js");
let taxPolicy   =   require("./bin/taxPolicy.js") ;
let taxHandler = new TaxHandler();


consoleBasket.prompt(
    inputString => {

        let receiptString = "";
        taxHandler.parseProducts( inputString );
        taxHandler.products.forEach(
            (product , i,array ) => {
                taxHandler.applyPolicies( product , taxPolicy() )

                receiptString +=        `${product.quantity} `  +
                                        `${product.name}: `     +
                                        `${taxHandler.taxedPrice}\n`
                if( i == (array.length-1) ) {
                        receiptString +=        `Sales Taxes: ${taxHandler.totTexes }\n`+
                                                `Total: ${taxHandler.totPrice}`
                        console.log( receiptString )
                        return
                }
        });
});




