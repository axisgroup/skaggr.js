import Base from "./base";
import qFunction from "./function";
import SetExpression from "./set-expression";
import Explicit from "./explicit";

export default class Aggregation extends qFunction {
    constructor(value = "") {
        super();
        // automate loading template...put into base? constructor takes type?
        this.attributes = {
            type: "aggr",
            value: value,
            qualifiers: [],
            set: new SetExpression(),
            parameters: []
        };

        this.parsableProps = ["qualifiers", "set", "parameters"];

    }

    type(val) {
        this.attributes.value = val;
        return this;
    }

    // QUALIFIERS
    addQualifier(qualifier) {
        return this.addAttribute("qualifiers", qualifier);
    }

    getQualifiers() {
        return this.getAttributes("qualifiers");
    }

    removeQualifier(qualifier) {
        return this.removeAttribute("qualifiers", qualifier);
    }

    removeQualifierByIndex(index) {
        return this.removeAttributeByIndex("qualifiers", index);
    }

    
    // SET
    set(setExpression) {
        this.attributes.set = setExpression;
        return this;
    }

}