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
└── README.md


This small plugin highlights the search paramaters in Eprints' search results page.

### For the tests ###
I used Tape and Node.js for unit testing 

If installing Nodejs is needed (on CentOS):
```
$sudo yum install nodejs
```
Then:
```
$cd lib/static/javascript
```

Creating the Nodejs project the first time that you run the test:
```
npm install
```

To actually run the tests:
```
$node test/node 90_highlighter.js
```

Enjoy!
