import Base from "./base";

export default class Qualifier extends Base {
    constructor(name = "", modifiers = [] ) {
        super();
        // automate loading template...put into base? constructor takes type?
        this.attributes = {
            type: "qualifier",
            value: name,
            included: true,
            modifiers: modifiers
        };
    }

    name(val) {
        this.attributes.value = val;
        return this;
    }

    included(bool) {
        this.attributes.included = bool;
        return this;
    }

    modifiers(arr) {
        this.attributes.modifiers = arr;
        return this;
    }


}