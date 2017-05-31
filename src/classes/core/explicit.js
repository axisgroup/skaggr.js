import Base from "./base";

export default class Explicit extends Base {
    constructor(value = "") {
        super();
        // automate loading template...put into base? constructor takes type?
        this.attributes = {
            type: "explicit",
            value: value
        };
    }

    value(val) {
        this.attributes.value = val;
        return this;
    }

}