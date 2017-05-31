import Base from "./base";

export default class SetList extends Base {
    constructor(value = "") {
        super();
        // automate loading template...put into base? constructor takes type?
        this.attributes = {
            type: "set-list",
            value: value
        };
    }

    values(val) {
        this.attributes.value = val;
        return this;
    }

}