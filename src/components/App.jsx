import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const INITIAL_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

export class App extends Component {
  state = { ...INITIAL_STATE };

  componentDidUpdate() {
    // console.log(this.state.filter);
  }

  handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    const newContact = { id: nanoid(6), name: name, number: number };
    const nameArray = this.state.contacts.map(({ name }) => name);
    if (nameArray.includes(name)) {
      alert(`${name} is already in contacts.`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [...contacts, newContact],
      }));
      form.reset();
    }
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  fooFilter = () => {
    const newArray = this.state.contacts.filter(contact => {
      const valueToLow = this.state.filter.toLowerCase();
      return contact.name.toLowerCase().includes(valueToLow);
    });
    return newArray;
  };

  fooDelete = contactID => {
    const index = this.state.contacts.findIndex(
      contact => contact.id === contactID
    );
    const genNewElement = () => {
      const array = this.state.contacts;
      let newArray = [];
      for (const element of array) {
        if (array.indexOf(element) !== index) {
          newArray.push(element);
        }
      }
      return newArray;
    };
    this.setState(({ contacts }) => ({ contacts: genNewElement() }));
  };

  render() {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexDirection: 'column',
          fontSize: 20,
          color: '#010101',
          padding: '20px 10px',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm handleSubmit={this.handleSubmit} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} handleChange={this.handleChange} />
        <ContactList onDelete={this.fooDelete} filterArray={this.fooFilter} />
      </div>
    );
  }
}
