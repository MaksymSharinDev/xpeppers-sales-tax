let TaxHandler  =   require("./bin/taxHandler.js");
let taxPolicy   =   require("./bin/taxPolicy.js") ;
var consoleBasket = require("./bin/consoleBasket.js");
let taxHandler = new TaxHandler();


consoleBasket.prompt(
    inputString => {
        taxHandler.parseProducts( inputString );
        taxHandler.products.forEach(
            product => {
                taxHandler.applyPolicies( product , taxPolicy() )
                /*
                receipt.addRow(
                    `${product.quantity} `  +
                    `${product.name}: `     +
                    `${product.taxedPrice}`
                );
                */
        });
});
/*
receipt.addRow( `Sales Taxes: ${taxHandler.
receipt.addRow( `Total: ${taxHandler.
receipt.print();
*/



