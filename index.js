let TaxHandler  =   require("./bin/taxHandler.js");
let taxPolicy   =   require("./bin/taxPolicy.js") ;

let taxHandler = new TaxHandler();
/*
let inputString = ´""
let basket = new Basket();
let receipt = new Receipt();

*/
//Console Interface for Handling user input
//"insert Products /n"
//"Format: [n] [product name] at [price]"
//inputString = prompt



taxHandler.parseProducts(
    "1 imported bottle of perfume at 27.99\n"+
                "1 bottle of perfume at 18.99\n"+
                "1 packet of headache pills at 9.75\n"+
                "3 box of imported chocolates at 11.25"
);
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