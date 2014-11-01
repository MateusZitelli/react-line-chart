/**
 * @jsx React.DOM */
if(process.env.NODE_ENV !== 'production'){
  require('./LineChart.css');
}

var React = require('react');
var d3 = require('d3');

require('./utils/assign');

var merge = function(one, two) {
  return Object.assign({}, one, two);
};


var Pie = React.createClass({
  propTypes: {
    data : React.PropTypes.array.isRequired,
  },

  _renderGraph (props) {
    var margin = props.margin;
    var width = props.width;
    var height = props.height;

    var svg = d3.select(this.getDOMNode())
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    svg = svg.select(".line-graph")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    this._reusableGraph(props);
  },

  _reusableGraph: function(props) { 
    var margin = props.margin;
    var width = props.width;
    var height = props.height;

    var _this = this;
    var svg = d3.select(this.getDOMNode())
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);
    svg = svg.select(".line-graph")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var line = d3.svg.line()
      .x(function(d,i) { 
        return _this.x(d.date); 
      })
      .y(function(d) { 
        return _this.y(d.value); 
      }).interpolate("linear");

    svg.selectAll("rect").remove();
      
    svg.select('.x.axis').remove();
    svg.select('.y.axis').remove();
    
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(this.xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(this.yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(props.ylabel);

    svg.select('path').remove();
    d3.select('.line-graph').append("path")
      .attr('class', 'data-line')
      .attr("d", line(this.props.data));

    d3.select('.data-point').remove();
    var dataCirclesGroup = svg.append('svg:g').attr('class', 'data-point');
    var circles = dataCirclesGroup.selectAll('.data-point')
        .data(this.props.data);
  
    circles
      .enter()
      .append('svg:circle')
        .attr('r', 5)
        .attr('cx', function(d) { return _this.x(d.date) })
        .attr('cy', function(d) { return _this.y(d.value) });

    d3.select('.labels').remove();
    var labels = d3.select('.line-graph').append('svg:g')
      .attr('class', 'labels');
    
    var texts = labels.selectAll('text').data(this.props.data);

    texts
      .enter()
      .append('text')
        .attr('x', function(d) { return _this.x(d.date) + 4; })
        .attr('y', function(d) { return _this.y(d.value) + 14; })
        .attr('class', 'label')
        .text(function(d) { return d.value; }); 
  },

  componentDidMount () {
    var props = merge(this.props);

    props.width = props.width - props.margin.left - props.margin.right;
    props.height = props.height - props.margin.top - props.margin.bottom;
    
    this.x = d3.time.scale().range([0, props.width]); 
    this.y = d3.scale.linear().range([props.height, 0]);
    
    this.x.domain(d3.extent(
      props.data.map(function(d) { return d.date; })
    ));

    this.y.domain([0, d3.max(props.data, function(d) { return d.value; })]);
    this.xAxis = d3.svg.axis().scale(this.x).orient("bottom");
    this.yAxis = d3.svg.axis().scale(this.y).orient("left");

    this._renderGraph(props);
  },

  shouldComponentUpdate (nextProps) {
    var props = merge(this.props);

    props.width = props.width - props.margin.left - props.margin.right;
    props.height = props.height - props.margin.top - props.margin.bottom;
    
    this.x = d3.time.scale().range([0, props.width]); 
    this.y = d3.scale.linear().range([props.height, 0]);
    
    this.x.domain(d3.extent(
      props.data.map(function(d) { return d.date; })
    ));
    this.y.domain([0, d3.max(props.data, function(d) { return d.value; })]);
    this.xAxis = d3.svg.axis().scale(this.x).orient("bottom");
    this.yAxis = d3.svg.axis().scale(this.y).orient("left");

    this._reusableGraph(props);
    return false;
  },

  render() {
    return (
      <svg><g className="line-graph"></g></svg>
    );
  }

});

module.exports = Pie;
