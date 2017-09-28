/*global google*/

var React = require('react');


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
     
    };

     this.state = {value: ''};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  
  handleSubmit(event) {
    alert('Il valore: ' + this.state.nome );
    event.preventDefault();
  }

  render() {
    return (
      <form>
      
        <br />
        <label>
          Orario Appuntamento:
          <select name="select" name="select" value={this.state.select} onChange={this.handleChange}>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </label>
        <label>
         
          <input type="text" name="nome" value={this.state.nome} onChange={this.handleInputChange} />
        </label>
        
        <label>
          
          <textarea name="textarea" value={this.state.textarea} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}




module.exports = Form;
