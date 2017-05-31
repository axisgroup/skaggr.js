# skaggr.js
*A JavaScript library for creating Qlik expressions via the skaggr JSON spec*

**skaggr.js** is a JavaScript library for creating Qlik expressions. In the QlikView and Qlik Sense world, developers became very familiar with the syntax of writing Qlik expressions by hand. While this syntax is great for that usecase, it becomes difficult to automate. Qlik developers have responded by using dollar-sign expansion to create dynamic expressions.

As the APIs bring the QIX Engine closer to web developers who have no experience with QV or QS, a new approach is needed for creating and managing Qlik expressions that matches how web developers write code. **skaggr.js** is a library that builds Qlik expressions via JavaScript classes and methods that allow web developers to compose and maintain these expressions programmatically. A couple of examples:

#### Simple Example: Sum of Sales
```javascript
var mySales = skaggr.Sum("Sales");
mySales.print(); // -> "sum(Sales)"
```

With a simple example like that, we haven't added much value. How is this any easier than writing "sum(Sales)"? It's not. However, as we scale up the syntax and want to modify our expressions over time, the interface becomes more useful. For example, lets add a total qualifier:

```javascript
mySales.total();
mySales.print(); // -> "sum(TOTAL Sales)"
```

What if I then want to add modifiers to the total qualifier? I could redefine it on the fly easily like:
```javascript
mySales.total(["Region", "Country"]);
mySales.print(); // -> "sum(TOTAL<Region,Country> Sales)"

mySales.total(false);
mySales.print(); // -> "sum(Sales)";
```

#### Advanced Example: Set Analysis
Let's try to produce a much more complicated expression:

`sum({1 - $<Year = [Alt Year] - {2009,2010}, Month = P({1<Product = {Shoe}>} Month)>} TOTAL<Country,Region> Sales)`

In this example, we have a complex set expression made up of multiple components, as well as total qualifiers. We can define this via skaggr.js like so:
```javascript
// Init a sales expression with our total qualifier from before
var mySales = skaggr.Sum("Sales")
    .total(["Country","Region"]);

// Create the first component of the set expression
var one = skaggr.SetComponent("1");

// Create the second component of the set expression
var $ = skaggr.SetComponent("$");

// Create the year modifier for the second component
var yearMod = skaggr.SetModifier()
    .field("Year")
    .setSelection(skaggr.SetField("[Alt Year]"))
    .exclusion(skaggr.SetList(["2009","2010"]));

// Create the P() expression for the month modifier for the second component
var P = skaggr.Aggregation()
    .type("P")
    .addParameter("Month")
    .set(skaggr.SetExpression()
        .setComponent(skaggr.SetComponent("1")
            .addModifier(skaggr.SetModifier("Product")
                .setSelection(skaggr.SetList(["Shoe"]))
            )
        )
    );

// Create the month modifier for the second component
var monthMod = skaggr.SetModifier()
    .field("Month")
    .setSelection(P);

// Add the modifiers to the second component
$.addModifier(yearMod)
    .addModifier(monthMod);

// Combine the components to form the set
var diffSet = skaggr.SetExpression()
    .setComponent(one)
    .exclusion($);

// Finally, add the set to your expression and print
mySales.set(diffSet);

mySales.print(); // -> "sum({1 - $<Year = [Alt Year] - {2009,2010}, Month = P({1<Product = {Shoe}>} Month)>} TOTAL<Country,Region> Sales)"
```

While it is a lot to write, we are able to manage the various components of these expressions directly. For example, we could change the Year modifier to an Alt Year modifier simply by saying:
```javascript
yearMod.field("[Alt Year]");
mySales.print(); // -> "sum({1 - $<[Alt Year] = [Alt Year] - {2009,2010}, Month = P({1<Product = {Shoe}>} Month)>} TOTAL<Country,Region> Sales)"
```

These various components can also be reused across multiple expressions, making it easy to share dynamic set analyses without relying on dollar-sign expansion.