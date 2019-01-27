
jQuery(document).ready(function(){
    let all_titles = jQuery(".ep_search_result em");
    let all_creators = jQuery(".person_name");
    let search_fields  = ["title", "creators_name"];
    let search_keywords = get_search_keywords_dict(search_fields);
    highlight_search_results(all_titles, search_keywords["title"]["re_str"]);
    highlight_search_results(all_creators, search_keywords["creators_name"]["re_str"]);
});

function highlight_search_results(elements, regex){
    let re = RegExp(regex, "gi");
    elements.each(function(idx, elem){
        let text = elem.innerHTML;
        text = text.replace(re, "<span class='highlighted_search_result'>$1</span>");
        elem.innerHTML = text;
    });
}

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
    str = str.replace(/\|*$/, ")");
    return str;
}
