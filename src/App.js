import React, { Component } from 'react';
import classes from './App.module.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'id1', name: 'Max', age: 28 },
      { id: 'id2', name: 'Mat', age: 23 },
      { id: 'id3', name: 'Tom', age: 31 },
    ],
    showPersons: false
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => p.id === id);
    const person = {
      ...this.state.persons[personIndex],
      name: event.target.value
    };

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({
      persons: persons
    });
  };

  deletePersonHandler = (index) => {
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({
      persons: persons
    });
  };

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons,
    });
  };

  render() {
    let persons = null;
    let buttonClasses = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, idx) => {
            return (
              <Person
                name={person.name}
                age={person.age}
                click={this.deletePersonHandler.bind(this, idx)}
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)}
              />
            );
          })}
        </div>
      );
      buttonClasses = classes.Red;
    }

    let parClasses = [];

    if (this.state.persons.length <= 2) {
      parClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      parClasses.push(classes.bold);
    }


    return (
      <div className={classes.App}>
        <h1>Hi, this is my first react app!!</h1>
        <p className={parClasses.join(' ')}>
          {!this.state.persons.length ? 'No person' : this.state.persons.length + (this.state.persons.length > 1 ? ' people': ' person')} on the list!
        </p>
        <button className={buttonClasses} onClick={this.togglePersonsHandler}>
          Toggle Persons
        </button>
        {persons}
      </div>
    );
  }
}

export default App;
