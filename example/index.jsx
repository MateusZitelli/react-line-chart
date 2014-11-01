/**
 * @jsx React.DOM
 */

  var data = [
    { date: new Date(2014, 3, 1), value: 20 },
    { date: new Date(2014, 4, 1), value: 30 },
    { date: new Date(2014, 5, 1), value: 40 },
    { date: new Date(2014, 6, 1), value: 40 },
    { date: new Date(2014, 7, 1), value: 50 },
    { date: new Date(2014, 8, 1), value: 100 },
    { date: new Date(2014, 9, 1), value: 30 },
    { date: new Date(2014, 10, 1), value: 70 },
    { date: new Date(2014, 11, 1), value: 20 }
  ]; 

var margin = {top: 20, right: 20, bottom: 30, left: 40};

var Index = React.createClass({
  getInitialState: function() {
    return {
      width: 500 
    };
  },

  componentDidMount: function () {
    var _this = this;
    var domNode = this.getDOMNode();

    window.onresize = function(){
     _this.setState({width: domNode.offsetWidth}); 
    };
  },

  render: function() {
    return (
      <div style={{width: "50%"}}> 
        <LineChart ylabel="Quantity" width={this.state.width} height={500} margin={margin}
          data={data} />
      </div>
    );
  }
});

React.renderComponent(
  <Index />,
  document.getElementById("container")
);
