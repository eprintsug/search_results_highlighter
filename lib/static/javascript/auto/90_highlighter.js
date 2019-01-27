/*

for (let i of document.getElementsByClassName("ep_search_result")){
        
    let e = i.getElementsByTagName("em")[0];
        
    let str = e.innerHTML;
        
    str = str.replace(/\bspiny\b/gi,"QUAQUAQUA!QUAQUAQUA!");
        
    e.innerHTML = str;

}*/

var jQuery = require(jQuery);

jQuery(document).ready(function(){
    let title_elements = jQuery(".ep_search_result em");
    let creators_elements = jQuery(".person_name");
    let search_fields  = ["title", "creators_name"];
    let search_keywords = get_search_keywords_dict(search_fields);
    console.log("String is " +  search_keywords["title"]["re_str"]);
});


function get_search_keywords_dict(search_fields){
    let search_keywords = {};
    search_fields.map(field => {
        search_keywords[field] = {};
        let arr = get_search_params(field);
        search_keywords[field]["kw_array"] = arr;
        search_keywords[field]["re_str"] = prepare_highlight_regex(arr);
    });
    return search_keywords;
}


function get_search_params(search_field){
    return new URLSearchParams(window.location.href)
        .get(search_field)
        .split(" ");
}


function prepare_highlight_regex(arr){
    let str = "(";
    arr.map(x => str += x + "|");
    str = str.replace(/\|+$/, ")");
    return str;
}

exports.x = prepare_highlight_regex;
