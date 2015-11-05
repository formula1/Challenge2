
var React = require('react');

var List = React.createClass({
  render: function() {
    return (
      <ul className='list'>{this.props.store.list.map(function(item) {
        return (
          <li>
            <h4>{item.product.name}</h4>
            <h5>Maker: {item.brand.name}</h5>
            <p>{item.product.invoiceDescription}</p>
            <a target='_blank' href={item.product.specificationSheetUrl}>
              View Specification Sheet
            </a>
          </li>
        );
      })}</ul>
    );
  },
});

module.exports = List;
