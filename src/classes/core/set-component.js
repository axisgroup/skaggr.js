import Base from "./base";

export default class SetComponent extends Base {
    constructor(identifier = "$", modifiers = [] ) {
        super();
        // automate loading template...put into base? constructor takes type?
        this.attributes = {
            type: "set-component",
            identifier: identifier,
            modifiers: modifiers
        };

        this.parsableProps = ["modifiers"];
    }

    identifier(val) {
        this.attributes.identifier = val;
        return this;
    }


    modifiers(arr) {
        this.attributes.modifiers = arr;
        return this;
    }

    // MODIFIERS
    addModifier(modifier) {
        return this.addAttribute("modifiers", modifier);
    }

    getModifiers() {
        return this.getAttributes("modifiers");
    }

    removeModifier(modifier) {
        return this.removeAttribute("modifiers", modifier);
    }

    removeModifierByIndex(index) {
        return this.removeAttributeByIndex("modifiers", index);
    }

}