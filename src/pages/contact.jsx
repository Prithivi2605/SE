import React from 'react';
import '../styles/contact.css'; // Importing the CSS

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Information:</h1>
      <p>
        To contact us, just message us at the email below or give a missed call at the provided phone number.
      </p>
      <p>Email: <a href="mailto:info@sfiles.com">info@sfiles.com</a></p>
      <p>Phone No: <a href="tel:1234567890">123-456-7890</a></p>
    </div>
  );
};

export default Contact;
