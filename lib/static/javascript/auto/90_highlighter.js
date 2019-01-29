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

jQuery(document).ready(function(){
    if (jQuery(".ep_search_result").length){
        highlight_search_results();
    }
});


/**
 * Removes stopwords and words shorter than 3 characters.
 * @param {array} An array of strings
 */
function remove_stopwords(arr){
    const stopwords = get_stopwords();
    return arr.filter(x => x.length >= 3).filter(x => !stopwords.includes(x));
}


/**
 * Returns a list of stopwords (as specified in lib/defaultcfg/cfg.d/indexing.pl)
 */
function get_stopwords(){
    return ["this","are","which", "with","that","can","from","these","those",
        "the","you","for","been","have","were","what","where","is","and"];
}


/**
 * Returns a non-null value if the search results page is from the advanced search 
 */
function is_advanced_search(){
    return window.location.pathname.match(/advanced$/);
}


/**
 * Searches for the search keywords in the specified list of elements, and, if 
 * found, it replaces the matches with a <span class='highlighted_search_result'>  
 * @param {jQuery array} elements An array of the elements of the specified class
 * @param {string} regex A string containing all the parameters associated to a search field
 *                  in the following format: (n1|n2|n3)
 */
function put_highlighted_span(elements, regex){
    if (regex){
    const re = RegExp(regex, "gi");
    elements.each(function(idx, elem){
        let text = elem.innerHTML;
        text = text.replace(re, "<span class='highlighted_search_result'>$1</span>");
        elem.innerHTML = text;
        });
    }
}


/**
 * Creates a dictionary where the keys are the search_fields passed as a array 
 * parameter. The dictionary contains an array of keywords for each field, and 
 * a regex to be used in put_highlighted_span() 
 * @param {array} An array of all the search fields 
 */
function get_search_keywords_dict(search_fields){
    let search_keywords = {};
    search_fields.map(field => {
        search_keywords[field] = {};
        const arr = remove_stopwords( get_search_params(field) );
        // this is an array containing all the search keywords for this field
        search_keywords[field]["kw_array"] = arr;
        // regex in the following format: (kw1|kw2|kw3|kw4)
        search_keywords[field]["re_str"] = prepare_highlight_regex(arr);
    });
    return search_keywords;
}


/**
 * Returns an array of all the search keywords for the specified search field 
 * @param {string} The name of a search field
 */
function get_search_params(search_field){
    let parameters = {};
    const re = RegExp("[?&]+([^=&]+)=([^&]*)", "gi"); 
    window.location.search.replace(re, 
            (string, fieldname, my_params) => 
            {parameters[fieldname]=my_params.split("+")}
        );
    return parameters[search_field];
}


/**
 * Returns a string in the following format: "(kw1|kw2|kw3|kw4)"
 * @param {array of strings} arr An array of strings to be concatenated
 */
function prepare_highlight_regex(arr){
    let str = "(";
    arr.map(x => str += x + "|");
    str = str.replace(/\|*$/, ")");
    return (str === "()") ? "" : str;
}


/**
 * Highlights the search words in the search results page.
 * TODO: this function needs to be made generic to clean it up and remove the
 * hardcoded parts
 */
function highlight_search_results(){
    const search_fields = (is_advanced_search()) ? ["title", "creators_name"]:["q"];
    const search_keywords = get_search_keywords_dict(search_fields);
    if (is_advanced_search()){
        put_highlighted_span(jQuery(".ep_search_result em"), search_keywords["title"]["re_str"]);
        put_highlighted_span(jQuery(".person_name"), search_keywords["creators_name"]["re_str"]);
    }
    else{
        put_highlighted_span(jQuery("tr.ep_search_result"), search_keywords["q"]["re_str"]);
    }
}
