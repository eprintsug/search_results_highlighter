/**
 * A class to highlight the keywords in the selected DOM elements without 
 * using regexes, thus avoiding the horrible issues caused by HTML elements 
 * (e.g. href attribute in <a> element) to be modified.
 * This class is based on the awesome InstantSearch shared by Stefan Steiger
 * at https://stackoverflow.com/questions/8644428/how-to-highlight-text-using-javascript#answer-29798094 
 * Stefan's class does the following:
* - Loop through the HTML document; 
* - find all text nodes;
* - get the textContent; 
* - get the position of the highlight-text with indexOf (with
*    an optional toLowerCase if it should be case-insensitive); 
* - append everything before indexof as textNode, append the matched Text with a highlight span;
* - repeat for the rest of the textnode (the highlight string might occur multiple times in the textContent string)
*   The class was changed slighly to ensure that it works with the rest of the script.
 */ 

let HighlightWithNoRegex = {
    "highlight": (container, highlightText) =>  {
        let internalHighlighter = (options) =>  {
            let id = {
                container: "container",
                tokens: "tokens",
                all: "all",
                token: "token",
                className: "className",
                sensitiveSearch: "sensitiveSearch"
            },
            tokens = options[id.tokens],
            allClassName = options[id.all][id.className],
            allSensitiveSearch = options[id.all][id.sensitiveSearch];

            function checkAndReplace(node, tokenArr, classNameAll, sensitiveSearchAll){
                let nodeVal = node.nodeValue, parentNode = node.parentNode,
                    i, j, curToken, myToken, myClassName, mySensitiveSearch,
                    finalClassName, finalSensitiveSearch,
                    foundIndex, begin, matched, end,
                    textNode, span, isFirst;

                for (i = 0, j = tokenArr.length; i < j; i++){
                    curToken = tokenArr[i];
                    myToken = curToken[id.token];
                    myClassName = curToken[id.className];
                    mySensitiveSearch = curToken[id.sensitiveSearch];
                    finalClassName = (classNameAll ? myClassName + " " + classNameAll : myClassName);
                    finalSensitiveSearch = (typeof sensitiveSearchAll !== "undefined" ? sensitiveSearchAll : mySensitiveSearch);
                    isFirst = true;
                    while (true){
                        if (finalSensitiveSearch)
                            foundIndex = nodeVal.indexOf(myToken);
                        else
                            foundIndex = nodeVal.toLowerCase().indexOf(myToken.toLowerCase());

                        if (foundIndex < 0){
                            if (isFirst)
                                break;

                            if (nodeVal){
                                textNode = document.createTextNode(nodeVal);
                                parentNode.insertBefore(textNode, node);
                            } // End if (nodeVal)
                            parentNode.removeChild(node);
                            break;
                        } // End if (foundIndex < 0)
                        isFirst = false;
                        begin = nodeVal.substring(0, foundIndex);
                        matched = nodeVal.substr(foundIndex, myToken.length);

                        if (begin){
                            textNode = document.createTextNode(begin);
                            parentNode.insertBefore(textNode, node);
                        } // End if (begin)
                        span = document.createElement("span");
                        span.className += finalClassName;
                        span.appendChild(document.createTextNode(matched));
                        parentNode.insertBefore(span, node);
                        nodeVal = nodeVal.substring(foundIndex + myToken.length);
                    } // Whend
                } // Next i 
            }; // End Function checkAndReplace 

            function iterator(p) {
                if (p === null) return;
                let children = Array.prototype.slice.call(p.childNodes), i, cur;
                if (children.length){
                    for (i = 0; i < children.length; i++){
                        cur = children[i];
                        if (cur.nodeType === 3){
                            checkAndReplace(cur, tokens, allClassName, allSensitiveSearch);
                        }
                        else if (cur.nodeType === 1){
                            iterator(cur);
                        }
                    }
                }
            }; // End Function iterator

            iterator(options[id.container]);
        } // End Function highlighter
        ;

        internalHighlighter({
            container: container, 
            all:{className: ""}, 
            tokens: [
                    {
                        token: highlightText, 
            className: "highlighted_search_result", 
            sensitiveSearch: false
                    }
                ]
            }
        ); // End Call internalHighlighter 
    } // End Function highlight
};
