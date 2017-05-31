import Base from "./base";

export default class Group extends Base {
    constructor(value = [], operators = []) {
        super();
        // automate loading template...put into base? constructor takes type?
        this.attributes = {
            type: "group",
            brackets: false,
            value: value,
            operators: operators
        };

        this.parsableProps = ["value"];
    }

    brackets(val) {
        this.attributes.brackets = val;
        return this;
    }

    // ITEMS

    addItem(item, operator = "") {
        return this.addAttribute("value", item)
            .addAttribute("operators", operator);
    }

    getItems() {
        return this.getAttributes("value");
    }

    getItemOperator(item) {
        var index = this.getItems().find(i => i === item);
        return this.getAttributes("operators")[index];
    }

    removeItem(item) {
        var index = this.getItems().find(i => i === item);
        this.removeAttribute("value", item);
        this.attributes.operators.splice(index,1);
        return this;
    }

    removeItemByIndex(index) {
        return this.removeItem(this.attributes.value[index]);
    }

}