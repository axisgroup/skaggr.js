import Base from "./base";

export default class SetField extends Base {
    constructor(field = "") {
        super();
        // automate loading template...put into base? constructor takes type?
        this.attributes = {
            type: "set-field",
            value: field
        };
    }

    field(val) {
        this.attributes.value = val;
        return this;
    }

}