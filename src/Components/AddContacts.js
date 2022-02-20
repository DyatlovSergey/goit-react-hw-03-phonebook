import { Component } from "react";
import s from "./Phonebook.module.css";

class AddContacts extends Component {
  state = {
    name: "",
    number: "",
  };
  handleChangeName = (e) => {
    this.setState({ name: e.currentTarget.value });
  };
  handleChangeNumber = (e) => {
    this.setState({ number: e.currentTarget.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.onSubmit(this.state.name, this.state.number);
    this.setState({ name: "", number: "" });
  };
  render() {
    return (
      <form className={s.phonebookList} onSubmit={this.handleSubmit}>
        <label>Name</label>
        <input
          className={s.input}
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChangeName}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />

        <label>Number</label>
        <input
          className={s.input}
          type="tel"
          name="number"
          value={this.state.number}
          onChange={this.handleChangeNumber}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />

        <button className={s.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default AddContacts;
