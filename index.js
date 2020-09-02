var consoleBasket = require("./bin/consoleBasket.js");
var TaxHandler  =   require("./bin/taxHandler.js");
var taxPolicy   =   require("./bin/taxPolicy.js") ;
var taxHandler = new TaxHandler();


consoleBasket.prompt(
    //hey there, following the callback hehe?
    function ( inputString ) {
        console.clear();
        let receiptString = "";
        //so now our countability guy is figuring out the products
        taxHandler.parseProducts( inputString );
        taxHandler.products.forEach(
            (product , i,array ) => {
                //for every product he just read the policy and apply them
                taxHandler.applyPolicies( product , taxPolicy() )
                //and writing the receipt with taxed price
                receiptString +=        `${product.quantity} `  +
                                        `${product.name}: `     +
                                        `${taxHandler.taxedPrice.toFixed(2)}`+`\n`
                if( i === (array.length-1) ) {
                        //when it’s done we gonna put the summary information
                        //regarding all the basket
                        receiptString +=        `Sales Taxes: ${taxHandler.totTexes.toFixed(2)}\n`+
                                                `Total: ${taxHandler.totPrice.toFixed(2)}`
                        //so hey human here your receipt
                        console.log( receiptString )
                }
        });
});




