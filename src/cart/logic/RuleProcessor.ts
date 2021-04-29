import {Product, Rule} from '../interfaces/Products'


export class RuleProcessor {
    id : string;
    amountNeeded : number;
    strict : boolean;
    discount : number;
    applyTo : string;
    totalCost : number;

    constructor(rule : Rule) {
        this.id = rule.id;
        this.amountNeeded = rule.amountNeeded;
        this.strict = rule.strict;
        this.discount = rule.discount;
        this.applyTo = rule.applyTo;
        this.totalCost = 0;
    }

    apply(product : Product, amount : number) {
        let cost = 0;
        // this processing logic could be further refined and refactored into
        // easy to test class methods, however for the sake of simplicity in initial development
        // i chose to do it this way
        // the code remains automatically testable which I would consider production ready as
        // you can verify the code always does what it needs to for the retailer with the tests before a
        // build/deploy
        if (this.strict) {
            if (amount === this.amountNeeded) {
                cost = this.applyToMath(product, amount);
            } else if (amount > this.amountNeeded) {
                const remainder = amount % 2;
                const tempAmount = amount - remainder;
                if (remainder > 0) {
                    cost += this.applyToMath(product, tempAmount);
                    const remainderCost = remainder * product.price;
                    cost += remainderCost;
                } else {
                    cost = this.applyToMath(product, tempAmount);
                }
            } else {
                cost = product.price * amount;
            }
        } else {
            if (amount >= this.amountNeeded) {
                cost = this.applyToMath(product, amount);
            } else {
                cost = product.price * amount;
            }
        }
        return cost;
    }

    private applyToMath(product : Product, amount : number) {
        let cost = 0
        if (this.applyTo === 'single') {
            const discountAmount = product.price * this.discount;
            const discountedPrice = product.price - discountAmount;
            cost = discountedPrice * amount;
        }
        if (this.applyTo === 'total') {
            cost = (product['price'] * amount) * this.discount;
        }
        return cost;
    }
}
