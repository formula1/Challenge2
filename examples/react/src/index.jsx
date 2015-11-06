
var React = require('react');
var ReactDom = require('react-dom');
var store = require('./store');
var Search = require('./Search.jsx');
var Info = require('./Info.jsx');
var List = require('./List.jsx');

var Main = React.createClass({
  componentDidMount: function() {
    // Bind to StateChange Event

    store.on('updated', function() {
      this.setState({store:store});
    }.bind(this));
    store.initialize();
  },

  render: function() {
    return (
      <div>{[
        <Search key='search' value={store.search} onSearch={store.setSearch.bind(store)} />,
        store.page ? <Info key='info' store={store}/> : null,
        <List key='list' store={store} />,
      ]}</div>
    );
  },
});

ReactDom.render(<Main />, document.body);
