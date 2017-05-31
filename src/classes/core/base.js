import skaggrParse from "skaggr-parse";

export default class Base {
    constructor() {
        this.attributes = {
            type: "explicit",
            value: ""
        };

        this.parsableProps = [];
    }

    setSpecProperty(addr, val) {
        var tree = addr.split("/");

        var spec = generateSpec();

        var curVal = spec;

        while (tree.length>0) {
            var prop = tree.shift();
            var nextProp = tree[0];
            if(typeof curVal[prop] === "undefined") {
                curVal[prop] = isNaN(nextProp) ? {} : [];
            }

            if(tree.length === 0) curVal[prop] = val;
            else curVal = curVal[prop];
        }

        return spec;
    }

    getSpecProperty(addr) {
        var tree = addr.split("/");
        var spec = generateSpec();

        return tree.reduce((acc,curr) => {
            if(curr === "") return acc;
            return acc[curr];
        }, spec);
    }

    // ATTRIBUTE MANAGEMENT
    addAttribute(name, value) {
        this.attributes[name].push(value);
        return this;
    }

    getAttributes(name) {
        return this.attributes[name];
    }

    removeAttribute(name, value) {
        var index = this.attributes[name].find(a=>a === value);
        this.attributes[name].splice(index,1);
        return this;
    }

    removeAttributeByIndex(name, index) {
        this.attributes[name].splice(index,1);
        return this;
    }

    setAttributeByIndex(name, value, index) {
        this.attributes[name].splice(index,1,value);
        return this;
    }

    // SPEC PARSING
    generateSpec() {
        var spec = Object.assign({}, this.attributes);
        this.parsableProps.forEach(prop=>{
            var valToParse = this.attributes[prop];
            // consider removing all arrays in spec with groups (values that have operators) and lists (parameters that are delimited)
            spec[prop] = valToParse instanceof Array ? valToParse.map(m=>m.generateSpec()) : valToParse.generateSpec();
        });
        return spec;
    }

    print() {
        var spec = this.generateSpec();
        return skaggrParse(spec);
    }

}