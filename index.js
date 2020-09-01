import taxPolicy from "bin/taxPolicy";
import TaxHandler from "bin/taxHandler"

let taxHandler = new TaxHandler();
/*
let inputString = ´""
let basket = new Basket();
let receipt = new Receipt();

*/
taxHandler.setTaxPolicy( taxPolicy );
/*
//load taxes to apply from a policy file
taxHandler.setTaxPolicy( taxPolicy );

//Console Interface for Handling user input
    //"insert Products /n"
    //"Format: [n] [product name] at [price]"
inputString = await consoleInterface.prompt();

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



