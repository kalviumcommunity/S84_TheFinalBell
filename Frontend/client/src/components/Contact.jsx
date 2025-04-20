// src/components/Contact.js
import React from "react";
import "../styles/contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h2>Contact Me / Feedback</h2>
      <form
        action="http://localhost:3000/send-email"
        method="POST"
        className="contact-form"
      >
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;
