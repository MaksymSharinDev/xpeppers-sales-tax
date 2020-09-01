var consoleBasket = require("./bin/consoleBasket.js");
/*
let taxPolicy  //import json with tax
let basket = new Basket();
let receipt = new Receipt();
let taxHandler = new TaxHandler();
//load taxes to apply from a policy file
taxHandler.setTaxPolicy( taxPolicy );
*/

//Console Interface for Handling user input
    //"insert Products /n"
    //"Format: [n] [product name] at [price]"
consoleBasket.prompt(
    inputString => {
        console.log( inputString );
        /*
        basket.parseProducts( inputString );
        basket.getProducts.forEach(
        product => {
        taxHandler.applyPolicies( product );
        receipt.addRow(
        `${product.quantity} `  +
        `${product.name}: `     +
        `${product.taxedPrice}`
        );
        }
        );
        receipt.addRow( `Sales Taxes: ${taxHandler.taxesApplied} `);
        receipt.addRow( `Total: ${taxHandler.totalGrossApplied} `);
        receipt.print();
        */
    }
);





