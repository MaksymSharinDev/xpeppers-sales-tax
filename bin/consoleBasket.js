var inquirer = require('inquirer');
//inquirer make a prompt like this
/*
    Basket
    -----------
    ${products}
    >Add Product
    >Get Receipt
*/
    //At >Add Product ,it make a prompt like this
/*

    format: <n> [imported] product_name at <decimal_price>
    _
*/

var events = require('events');
var eventEmitter = new events.EventEmitter();
var lastInputs = "";

//The Interface loop is recursive ( inquirer it’s based on promises )
function interfaceLoop ( printReceipt ) {
        let textInterface = () =>
        {
            return  "Basket\n" +
                "-----------\n" +
                `${lastInputs}`;
        }
        //menu multi-choice interface config
        console.clear();
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
                //pretty vanilla switch-case
                switch ( answers.choice ){
                    case "add_product":
                        console.clear();
                        //input submit interface
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
                                //Here we store the input and return to menu in a recursive fashion
                                //TODO input ProductLine regex matching
                                lastInputs += answers.entryString + "\n";
                                console.clear();
                                interfaceLoop();
                            })
                            .catch(error => {
                                //i know i know error handling but... it’s still a small narrow project
                                if(error.isTtyError) {
                                    // Prompt couldn't be rendered in the current environment
                                } else {
                                    // Something else when wrong
                                }
                            });
                        break;
                    //here after x submits we are in scope tunnel
                    //because of recursive promises, i like to call the next thing
                    //the "rocket pattern"
                    //where we send out of scope evil orbit the data to its promised soil
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

            });
            //hey we arrived at the planet of destination
            eventEmitter.on("basketSubmit", (lastInputs)=>{ return printReceipt(lastInputs) }  )
        }


exports.prompt = interfaceLoop










