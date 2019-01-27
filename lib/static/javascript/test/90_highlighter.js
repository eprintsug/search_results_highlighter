let test = require("tape");

let re = function prepare_highlight_regex(arr){
    let str = "(";
    arr.map(x => str += x + "|");
    str = str.replace(/\|*$/, ")");
    return str;
}

test("Test regex preparation", assert => {
    assert.equal(re(["kw1","kw2"]), "(kw1|kw2)");
    assert.equal(re(["kw1"]), "(kw1)");
    assert.equal(re([]), "()");
    assert.end();
});
