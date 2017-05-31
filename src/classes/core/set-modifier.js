import Base from "./base";

export default class SetModifier extends Base {
    constructor(field = "", operator = "=", ) {
        super();
        // automate loading template...put into base? constructor takes type?
        this.attributes = {
            type: "set-modifier",
            field: field,
            operator: operator,
            forcedExclusion: false,
            selections: [],
            selectionOperators: []
        };

        this.parsableProps = ["selections"];
    }

    field(val) {
        this.attributes.field = val;
        return this;
    }


    operator(val) {
        this.attributes.operator = val;
        return this;
    }

    forcedExclusion(val) {
        this.attributes.forcedExclusion = val;
        return this;
    }

    // SELECTIONS
    // set selection initializes initial selection
    setSelection(setSelection) {
        this.attributes.selections = [setSelection];
        this.attributes.selectionOperators = [];
        return this;
    }
    addSetSelection(setSelection, operator) {
        return this.addAttribute("selections", setSelection)
            .addAttribute("selectionOperators", operator);
    }

    getSetSelections() {
        return this.getAttributes("selections");
    }

    getSetSelectionOperator(setSelection) {
        var index = this.getSetSelections().find(sC => sC === setSelection);
        return this.getAttributes("selectionOperators")[index-1];
    }

    removeSetSelection(setSelection) {
        var index = this.getSetSelections().find(sC => sC === setSelection);
        this.removeAttribute("selections", setSelection);
        this.attributes.selectionOperators.splice(index-1,1);
        return this;
    }

    removeSetSelectionByIndex(index) {
        return this.removeSetSelection(this.attributes.selections[index]);
    }

    // ADDING SELECTIONS WITH OPERATORS
    union(setSelection) {
        return this.addSetSelection(setSelection, "+");
    }

    exclusion(setSelection) {
        return this.addSetSelection(setSelection, "-");
    }

    intersection(setSelection) {
        return this.addSetSelection(setSelection, "*");
    }

    xor(setSelection) {
        return this.addSetSelection(setSelection, "/");
    }
}