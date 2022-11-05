import s from './App.module.css';
import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = e => {
    setFilter(e.currentTarget.value);
  };

  const addContact = newContact => {
    contacts.some(
      contact =>
        contact.name.trim().toLowerCase() ===
        newContact.name.trim().toLowerCase()
    )
      ? alert(`${newContact.name} is already in contacts `)
      : setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const removeContact = id => {
    setContacts(prevContacts => prevContacts.filter(el => el.id !== id));
  };

  const filterContact = () => {
    if (contacts.length === 0) return;
    const filterName = filter.trim().toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filterName)
    );
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2 className={s.title}>Contacts</h2>
      <Filter handleChange={handleChange} filter={filter} />
      {filterContact() && (
        <ContactList contacts={filterContact()} removeContact={removeContact} />
      )}
    </div>
  );
}
