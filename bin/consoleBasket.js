var inquirer = require('inquirer');
//inquirer make a prompt like this
/*
Basket
-----------
${products}
>Add Product
>Get Receipt
*/
    //At Add Product make a prompt like this
/*
    format: <n> [imported] product_name at <decimal_price>
*/
var events = require('events');
var eventEmitter = new events.EventEmitter();

let lastInputs = "";
function interfaceLoop ( callback ) {
        let textInterface = () =>
        {
            return  "Basket\n" +
                "-----------\n" +
                `${lastInputs}`;
        }

        inquirer.prompt([
            {
                type : "list",
                name : "choice",
                message : textInterface(),
                choices : [{

                    name : "Add Product",
                    value: "add_product"
                },{
                    name : "Get Receipt",
                    value: "get_Receipt"
                }]


            }
        ])
            .then(answers => {
                switch ( answers.choice ){
                    case "add_product":
                        console.clear();
                        inquirer.prompt([
                            {
                                type : "input",
                                name : "entryString",
                                message :
                                    textInterface() +
                                    "\nformat: <n> [imported] product_name at <decimal_price>\n"
                            }
                        ])
                            .then(answers => {
                                //TODO input ProductLine regex matching
                                lastInputs += answers.entryString + "\n";
                                console.clear();
                                interfaceLoop();
                            })
                            .catch(error => {
                                console.log(error);
                                if(error.isTtyError) {
                                    // Prompt couldn't be rendered in the current environment
                                } else {
                                    // Something else when wrong
                                }
                            });
                        break;
                    case "get_Receipt":
                        try{
                        eventEmitter.emit( "basketSubmit" , lastInputs );
                        }catch{}
                        break;
                }
            })
            .catch(error => {
                if(error.isTtyError) {
                    // Prompt couldn't be rendered in the current environment
                } else {
                    // Something else when wrong
                }
                console.log(error);
            });

            eventEmitter.on("basketSubmit",(lastInputs)=> {callback( lastInputs )} )


        }

exports.prompt = interfaceLoop










