import { useState, useEffect } from 'react';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';

const KEY = 'contacts';

const contactsList = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const cont = localStorage.getItem(KEY);
    const contacts = JSON.parse(cont);
    return contacts ? contacts : contactsList;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (contacts.length === 0) {
      return;
    }
    localStorage.setItem(KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    let names = contacts.map(cont => cont.name.toLocaleLowerCase());
    if (names.includes(name.toLocaleLowerCase())) {
      alert(`Список вже має ім'я ${name}`);
      return;
    }

    setContacts(prevState => [contact, ...prevState]);
  };

  const deleteContact = contactId => {
    setContacts(prevState => [
      ...prevState.filter(contact => contact.id !== contactId),
    ]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  );

  return (
    <>
      <ContactForm addContact={addContact} />
      <Filter onChange={changeFilter} value={filter} />
      <ContactList contacts={visibleContacts} deleteContact={deleteContact} />
    </>
  );
}
