var React = require('react');

var QueryComponent = React.createClass({
  getInitialState: function() {
    return {value: this.props.value};
  },

  handleChange: function(event) {
    this.setState({value: event.target.value});
  },

  componentWillReceiveProps: function(newProps) {
    // you don't have to do this check first, but some times it helps prevent against an unneeded render.
    if (newProps.value != this.state.value) {
      this.setState({value: newProps.value});
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onSearch(this.refs.query.value);
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit} className='search-form'>
        <input type='text' ref='query' value={this.state.value} onChange={this.handleChange}/>
        <button type='submit' >Search</button>
      </form>
    );
  },
});

module.exports = QueryComponent;
