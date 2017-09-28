import Calendar from 'rc-calendar';
var React = require('react');
var ReactDOM = require('react-dom');
var Geocode = require('./Geocode.jsx');
var Form = require('./Form.jsx');


ReactDOM.render(<Calendar />, document.querySelector('[data-calendar]'));

ReactDOM.render(<Geocode />, document.querySelector('[data-react-geocode]'));

ReactDOM.render(<Form />, document.querySelector('[data-form]'));
