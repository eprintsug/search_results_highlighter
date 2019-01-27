//let searchwords = new URLSearchParams(window.location.href).get("title");

/*

let i  = ["title", "creators_name"]
for (let t in i){
    n[t] = new URLSearchParams(window.location.href).get("title").split(" ");
}



console.log("This is a TETSTISUYD IAY SDIAUYS DASDYGASUYD GAUYSG DU");

for (search_res of document.getElementsByClassName("ep_search_result")){
    search_res.innerHTML = "QUAQUA!";
}
console.log($( ".person_name" ));
for (let i of document.getElementsByClassName("ep_search_result")){
        
    let e = i.getElementsByTagName("em")[0];
        
    let str = e.innerHTML;
        
    str = str.replace(/\bspiny\b/gi,"QUAQUAQUA!QUAQUAQUA!");
        
    e.innerHTML = str;

}*/


jQuery(document).ready(function(){
    let title_elements = jQuery(".ep_search_result em");
    let creators_elements = jQuery(".person_name");
    let search_fields  = ["title", "creators_name"];
    let search_keywords = {};
    for (let keyword of search_fields){
        search_keywords[keyword] = {};
        let arr = new URLSearchParams(window.location.href).get(keyword).split(" ");
        let str = "";
        arr.map(x => str += x + "|");
        search_keywords[keyword]["re_str"] = str.replace(/\|+$/, "");
        search_keywords[keyword]["kw_array"] = arr;
        console.log("String is " +  search_keywords[keyword]["re_str"]);
    }
    //console.log(search_keywords);
    //console.log(creators_elements);
});
