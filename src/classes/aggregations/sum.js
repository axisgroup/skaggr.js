import Aggregation from "../core/aggregation";
import Qualifier from "../core/qualifier";

export default class Sum extends Aggregation {
    constructor(param = "") {
        super("sum");
        
        this.addParameter(param);

        this.$$ = {};

        this.$$.totalQualifier = new Qualifier("TOTAL")
            .included(false);
        
        this.$$.distinctQualifier = new Qualifier("DISTINCT")
            .included(false);
        
        this.addQualifier(this.$$.totalQualifier)
            .addQualifier(this.$$.distinctQualifier);

    }

    total(arr = []) {
        if(arr === false) this.$$.totalQualifier.included(false);
        else {
            this.$$.totalQualifier.included(true)
                .modifiers(arr);
        }
        return this;
    }

    distinct(bool) {
        if(bool === false) this.$$.distinctQualifier.included(false);
        else this.$$.distinctQualifier.included(true);
        return this;
    }

    expr(val) {
        this.setParameterByIndex(val, 0);
        return this;
    }

}

// named modifiers like in d3-force?