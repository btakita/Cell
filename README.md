# cell2
cell programming (aka observers, signals/slots, computed properties)

## Usage

~~~javascript
var observable = require('riot').observable // or require('cell2/observable')
  , Cell = require('cell2').assign({observable: observable})
  , cat = Cell()('Fluffy').query(iLoveCat).on('change', iLoveCat)
  ;
cat('Pickles');
function iLoveCat(cat2) {
  console.log('I love '+cat2+'!');
}
~~~

~~~
I love Fluffy!
I love Pickles!
~~~