
var React = require('react');

var SearchInfo = React.createClass({
  render: function() {
    var store = this.props.store;
    var options = [];
    if (store.page > 1) {
      options.push(<button onClick={store.setPage.bind(store, 1)}>
        First Page
      </button>);
      options.push(<button onClick={store.setPage.bind(store, store.page - 1)}>
        Page {store.page - 1}
      </button>);
    }

    options.push(<span>Displaying page {store.page} of {store.maxPage}</span>);

    if (store.page < store.maxPage) {
      options.push(<button type='button' onClick={store.setPage.bind(store, store.page + 1)}>
        Page {store.page + 1}
      </button>);
      options.push(<button type='button' onClick={store.setPage.bind(store, store.maxPage)}>
        Last Page
      </button>);
    }

    return (<div className='search-info' >{options}</div>);
  },
});

module.exports = SearchInfo;
