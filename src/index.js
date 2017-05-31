// Core
import Base from "./classes/core/base";
import Aggregation from "./classes/core/aggregation";
import qFunction from "./classes/core/function";
import Qualifier from "./classes/core/qualifier";
import SetExpression from "./classes/core/set-expression";
import SetComponent from "./classes/core/set-component";
import SetModifier from "./classes/core/set-modifier";
import SetField from "./classes/core/set-field";
import SetList from "./classes/core/set-list";
import Explicit from "./classes/core/explicit";
import Group from "./classes/core/group";

// Aggregations
import Sum from "./classes/aggregations/sum";

export default {
    Base: (...args) => new Base(...args),
    Aggregation: (...args) => new Aggregation(...args),
    Qualifier: (...args) => new Qualifier(...args),
    SetExpression: (...args) => new SetExpression(...args),
    SetComponent: (...args) => new SetComponent(...args),
    SetModifier: (...args) => new SetModifier(...args),
    SetField: (...args) => new SetField(...args),
    SetList: (...args) => new SetList(...args),
    qFunction: (...args) => new qFunction(...args),
    Group: (...args) => new Group(...args),
    Sum: (...args) => new Sum(...args)
};