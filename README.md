# Eprints Search Results Highlighter #
by Michele Morelli (2019)

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
