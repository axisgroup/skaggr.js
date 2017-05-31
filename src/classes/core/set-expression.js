import Base from "./base";

export default class SetExpression extends Base {
    constructor() {
        super();
        // automate loading template...put into base? constructor takes type?
        this.attributes = {
            type: "set-expression",
            components: [],
            operators: []
        };

        this.parsableProps = ["components"];
    }

    // COMPONENTS
    // set component initializes initial component
    setComponent(setComponent) {
        this.attributes.components = [setComponent];
        this.attributes.operators = [];
        return this;
    }
    addSetComponent(setComponent, operator) {
        return this.addAttribute("components", setComponent)
            .addAttribute("operators", operator);
    }

    getSetComponents() {
        return this.getAttributes("components");
    }

    getSetComponentOperator(setComponent) {
        var index = this.getSetComponents().find(sC => sC === setComponent);
        return this.getAttributes("operators")[index-1];
    }

    removeSetComponent(setComponent) {
        var index = this.getSetComponents().find(sC => sC === setComponent);
        this.removeAttribute("components", setComponent);
        this.attributes.operators.splice(index-1,1);
        return this;
    }

    removeSetComponentByIndex(index) {
        return this.removeSetComponent(this.attributes.components[index]);
    }

    // ADDING COMPONENTS WITH OPERATORS
    union(setComponent) {
        return this.addSetComponent(setComponent, "+");
    }

    exclusion(setComponent) {
        return this.addSetComponent(setComponent, "-");
    }

    intersection(setComponent) {
        return this.addSetComponent(setComponent, "*");
    }

    xor(setComponent) {
        return this.addSetComponent(setComponent, "/");
    }

}