/**
 * Eprints Search Results Highlighter 
 * by Michele Morelli (2019)
 *
 * A simple script for Eprints repositories to highlight search keywords in the 
 * search results page.
 *
 * It requires jQuery to run properly, so if jQuery is not already in use in 
 * your repository, you will need to add it to your template. 
 * For example, you could add the following element to the <head> of your 
 * template (default.xml):
 * <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
 */

// MAIN
jQuery(document).ready(function(){
    if (jQuery(".ep_search_result").length){
        highlight_search_results();
    }
});
//end of MAIN


/**
 * Highlights the search words in the search results page.
 * TODO: make generic!
 */
function highlight_search_results(){
    let all_titles = jQuery(".ep_search_result em");
    let all_creators = jQuery(".person_name");
    const search_fields  = ["title", "creators_name"];
    const search_keywords = get_search_keywords_dict(search_fields);
    put_highlighted_span(all_titles, search_keywords["title"]["re_str"]);
    put_highlighted_span(all_creators, search_keywords["creators_name"]["re_str"]);
}


/**
 * Searches for the search keywords in the specified list of elements, and, if 
 * found, it replaces the matches with a <span class='highlighted_search_result'>  
 * @param {jQuery array} elements An array of the elements of the specified class
 * @param {string} regex A string containing all the parameters associated to a search field
 *                  in the following format: (n1|n2|n3)
 */
function put_highlighted_span(elements, regex){
    const re = RegExp(regex, "gi");
    elements.each(function(idx, elem){
        let text = elem.innerHTML;
        text = text.replace(re, "<span class='highlighted_search_result'>$1</span>");
        elem.innerHTML = text;
    });
}


/**
 * Creates a dictionary where the keys are the search_fields 
 * @param {jQuery array} elements An array of the elements of the specified class
 */
function get_search_keywords_dict(search_fields){
    let search_keywords = {};
    search_fields.map(field => {
        search_keywords[field] = {};
        const arr = get_search_params(field);
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
