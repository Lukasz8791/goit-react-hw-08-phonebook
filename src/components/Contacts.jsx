import React, { useState, useEffect } from 'react';
import Navigation from './Navigation'; 

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: '',
    number: '',
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://connections-api.herokuapp.com/contacts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setContacts(data);
        } else {
          console.error('Błąd pobierania kontaktów:', response.statusText);
        }
      } catch (error) {
        console.error('Błąd pobierania kontaktów:', error.message);
      }
    };

    fetchContacts();
  }, []); 

  const handleInputChange = (e) => {
    setNewContact({
      ...newContact,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddContact = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://connections-api.herokuapp.com/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newContact),
      });

      if (response.ok) {
        const data = await response.json();
        setContacts([...contacts, data]);
        setNewContact({
          name: '',
          number: '',
        });
      } else {
        console.error('Błąd dodawania kontaktu:', response.statusText);
      }
    } catch (error) {
      console.error('Błąd dodawania kontaktu:', error.message);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://connections-api.herokuapp.com/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setContacts(contacts.filter((contact) => contact.id !== id));
      } else {
        console.error('Błąd usuwania kontaktu:', response.statusText);
      }
    } catch (error) {
      console.error('Błąd usuwania kontaktu:', error.message);
    }
  };

  return (
    <div>
      <Navigation /> 
      <h2>Kontakty</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleAddContact();
      }}>
        <label>
          Imię i nazwisko:
          <input
            type="text"
            name="name"
            value={newContact.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Numer telefonu:
          <input
            type="text"
            name="number"
            value={newContact.number}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Dodaj kontakt</button>
      </form>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <strong>{contact.name}</strong> - {contact.number}
            <button onClick={() => handleDeleteContact(contact.id)}>Usuń</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
