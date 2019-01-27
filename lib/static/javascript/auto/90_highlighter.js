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
    let a = jQuery(".ep_search_result em");
    let search_fields  = ["title", "creators_name"];
    let search_keywords = {};
    for (let keyword of search_fields){
        search_keywords[keyword] = new URLSearchParams(window.location.href).get(keyword).split(" ");
    }
    console.log(search_keywords);
});
