var EE = require('events').EventEmitter;
var sa = require('superagent');
var qs = require('qs');
var History = require('history.js');

var store = new EE();

module.exports = store;

var limit = 10;

store.list = [];

store.setSearch = function(search, page) {
  sa.get('http://api.vip.supplyhub.com:19000/products')
  .query({count:1, search: search})
  .end(function(err, res) {
    if (err) return store.emit('error', err);
    console.log(res.body);
    store.count = res.body.count;
    store.maxPage = Math.ceil(store.count / limit);
    store.search = search;
    store.setPage(page || 1);
  });
};

store.setPage = function(page) {
  History.pushState(
    {search:store.search, page:page},
    'Searching for ' + store.search,
    '?' + qs.stringify({search:store.search, page:page})
  );
};

store.initialize = function() {

  var state = qs.parse(History.getState().url.split('?')[1]);
  if (state.search) {
    store.setSearch(state.search, state.page);
  }
};

History.Adapter.bind(window, 'statechange', function() {
  var state = History.getState();
  store.search = state.data.search;
  store.page = state.data.page;

  sa.get('http://api.vip.supplyhub.com:19000/products')
  .query({
    search:store.search,
    limit:limit,

    // To simplify ui, we are going to make pages start at 1 instead of 0
    skip: (store.page - 1) * limit,
  })
  .end(function(err, res) {
    if (err) return store.emit('error', err);
    store.list = res.body;
    store.emit('updated');
  });
});
