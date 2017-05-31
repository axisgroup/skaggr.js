import Base from "./base";
import Explicit from "./explicit";

export default class qFunction extends Base {
    constructor(name = "", parameters = []) {
        super();
        // automate loading template...put into base? constructor takes type?
        this.attributes = {
            type: "function",
            value: name,
            parameters: parameters
        };

        this.parsableProps = ["parameters"];
    }

    name(val) {
        this.attributes.value = val;
        return this;
    }

    // PARAMETERS
    addParameter(param) {
        var value;
        if(param instanceof Base) value = param;
        else value = new Explicit(param);
        return this.addAttribute("parameters", value);
    }

    getParameters() {
        return this.getAttributes("parameters");
    }

    removeParameter(param) {
        return this.removeAttribute("parameters", param);
    }

    removeParameterByIndex(index) {
        return this.removeAttributeByIndex("parameters", index);
    }

    setParameterByIndex(param,index) {
        var value;
        if(param instanceof Base) value = param;
        else value = new Explicit(param);
        return this.setAttributeByIndex("parameters", value, index);
    }

}