import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import data from './mockData.js';

class App extends React.Component {
    constructor(props){
      super(props);
  
      this.state = {
        people: data
      }
  
      this.onHandleInputTextChange = this.onHandleInputTextChange.bind(this);
      this.onHandleGenderSelectorChange = this.onHandleGenderSelectorChange.bind(this);  
      this.onHandleSortDOBSelectorChange = this.onHandleSortDOBSelectorChange.bind(this);  
}

onHandleSortDOBSelectorChange(event){
  let inputValue = event.target.value;

  console.log(inputValue)
  if(inputValue === "DESC"){
      this.setState({
        people: data.sort((person1, person2) => this.dateConverter(person1["DOB"]) -this.dateConverter(person2["DOB"]))
      })
  }else {
    this.setState({
      people: data.sort((person1, person2) => this.dateConverter(person2["DOB"]) -this.dateConverter(person1["DOB"]))
    })
  }
}

onHandleGenderSelectorChange(event) {
    let inputValue = event.target.value;

    if(inputValue === "all"){
        this.setState({
          people: data
        })
    }else {
      this.setState({
        people: data.filter(person => person["Gender"] === inputValue)
      })
    }
  }

  onHandleInputTextChange(event) {
    let inputValue = event.target.value;
    console.log(inputValue)

    if(inputValue === ""){
        this.setState({
          people: data
        })
    }else {
      this.setState({
        people: data.filter(person => person["First_name"].indexOf(inputValue) !== -1 ||
                                      person["Last_name"].indexOf(inputValue) !== -1 ||
                                      person["Email"].indexOf(inputValue) !== -1 || 
                                      person["Phone"].indexOf(inputValue) !== -1)
      })
    }
  }

  dateConverter(dateString){
    let year = dateString.substring(dateString.lastIndexOf("/") + 1);    
    let month = dateString.substring(0, dateString.indexOf("/"));    
    let day = dateString.substring(dateString.indexOf("/") + 1, dateString.lastIndexOf("/"));
    
    return new Date(year, month, day);
  }

  render (){
    return (
      <div className="table-container">
          <div className="input-container">
            <TextInput InputHandler={this.onHandleInputTextChange}/>

            <GenderSelector genderSelectorHandler={this.onHandleGenderSelectorChange} />

            <SortSelector sortSelector={this.onHandleSortDOBSelectorChange} />
          </div> 
  
          <table>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>DOB</th>
              <th>Action</th>
            </tr>
  
            <TableRows people={this.state.people}/>
          </table>
      </div>
    );
  }
}


function TextInput(props){
  return (
    <input type="text" onChange={props.InputHandler} placeholder="Search..."/>
  )
}

function GenderSelector(props){
  return (
    <select onChange={props.genderSelectorHandler}>
    <option value="all">All</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
</select>
  )
}

function SortSelector(props){
  return(
    <select onChange={props.sortSelector}>
      <option value="DESC">DESC</option>
      <option value="ASCE">ASCE</option>
    </select>
  )
}

function TableRows(props){
  return props.people.map(person => {
      return (
        <tr key={person["First_name"].concat(person["Last_name"]).concat(person["email"])}>
          <td>{person["First_name"]}</td>
          <td>{person["Last_name"]}</td>
          <td>{person["Email"]}</td>
          <td>{person["Gender"]}</td>
          <td>{person["Phone"]}</td>
          <td>{person["DOB"]}</td>
        </tr>
      )
  })
}

export default App;
