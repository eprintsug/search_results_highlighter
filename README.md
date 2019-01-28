# Eprints Search Results Highlighter #
by Michele Morelli (2019)

.  
├── lib  
│   └── static  
│       ├── javascript  
│       │   ├── auto  
│       │   │   └── 90_highlighter.js  
│       │   ├── package.json  
│       │   └── test  
│       │       └── 90_highlighter.js  
│       └── style  
│           └── auto  
│               └── highlighter.css  
├── README.md  
└── search_results_highlighter.epmi 


This simple plugin highlights the search paramaters in Eprints' search results page.

It requires jQuery to run properly, so if jQuery is not already in use in 
your repository, you will need to add it to your repository somehow. 
For example, you could add the following element to the head of your 
template (default.xml):

```xml
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
```

### For the tests ###
I used Tape and Node.js for unit testing 

If installing Nodejs is needed (on CentOS):
```bash
$sudo yum install nodejs
```
Then:
```bash
$cd lib/static/javascript
```

Creating the Nodejs project the first time that you run the test:
```bash
npm install
```

To actually run the tests:
```bash
$node test/node 90_highlighter.js
```

Enjoy!
