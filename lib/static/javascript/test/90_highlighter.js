var test = require("tape");

var Highlight = require('../auto/90_highlighter');

test("First test", assert => {
    assert.equal("Initial test", 
        Highlight.x(["kw1","kw2"]),
        "(kw1|kw2)");
});
