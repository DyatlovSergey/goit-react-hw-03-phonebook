import React from "react";
import shortid from "shortid";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import Phonebook from "./Components/Phonebook";
import AddContacts from "./Components/AddContacts";
import Filter from "./Components/Filter";
import s from "./Components/Phonebook.module.css";

class App extends React.Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  addContact = (name, number) => {
    console.log(name, number);

    const { contacts } = this.state;
    const repeatName = contacts.find((contact) => {
      return contact.name.toLowerCase() === name.toLowerCase();
    });
    if (repeatName) {
      Notify.warning(`${name} is already in contacts`);
      return;
    }

    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
    Notify.success(`${name} is added in contacts`);
  };

  nameInputId = shortid.generate();

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  visibleContactCards = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  render() {
    const { contacts, filter } = this.state;
    const visibleContactCards = this.visibleContactCards();
    return (
      <section className={s.container}>
        <h1>Phonebook</h1>
        <AddContacts onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter onChangeFilter={this.changeFilter} value={filter} />
        <Phonebook
          contacts={visibleContactCards}
          onDeleteContact={this.deleteContact}
        />
      </section>
    );
  }
}

export default App;
