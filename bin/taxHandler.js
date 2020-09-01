
function TaxHandler() {

    this.parseProducts =
        function (productsString) {
            this.products = [];
            productsString.split("\n").forEach(
                productLine => {
                    this.products.push(
                        {
                            quantity: productString.match("\\")[0],
                            //TODO regex startString integer space
                            name: productStrings.match("\\")[0],
                            //TODO regex space variablechars space at
                            price: productStrings.match("\\")[0]
                            //TODO regex "at" space decimal 2 accuracy
                        }
                    );

                }
            )

            //productsString
        }

    this.setTaxPolicy =
        function (taxPolicy) {
            this.taxPolicy = taxPolicy;
        }

    this.applyPolicies =
        function (taxableObj) {
            this.taxPolicy.forEach(
                (taxFunction, index, array) => {
                    taxFunction(taxableObj);
                });

        }
}

exports.TaxHandler = TaxHandler;