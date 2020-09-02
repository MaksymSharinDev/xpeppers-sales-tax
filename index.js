let TaxHandler  =   require("./bin/taxHandler.js");
let taxPolicy   =   require("./bin/taxPolicy.js") ;

let taxHandler = new TaxHandler();
/*
let inputString = ´""
let receipt = new Receipt();

*/
//Console Interface for Handling user input
//"insert Products /n"
//"Format: [n] [product name] at [price]"

taxHandler.parseProducts();
taxHandler.products.forEach(
    product => {
        taxHandler.applyPolicies( product , taxPolicy() );
        console.log(
            "taxRate: ",        taxHandler.taxRate,     " \n",
            "taxedPrice: ",     taxHandler.taxedPrice,  " \n",
            "totTexes: ",     taxHandler.totTexes,    " \n",
            "totPrice: ",       taxHandler.totPrice,    " \n"
        )
        /*
        receipt.addRow(
            `${product.quantity} `  +
            `${product.name}: `     +
            `${product.taxedPrice}`
        );
        */
    }
);
/*
receipt.addRow( `Sales Taxes: ${taxHandler.taxesApplied} `);
receipt.addRow( `Total: ${taxHandler.totalGrossApplied} `);
receipt.print();
*/