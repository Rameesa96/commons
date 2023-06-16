import React, { useState } from "react";

const ContactForm = ({ fields, header, url, data }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...data, ...prevData, [id]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let isValid = true;

    fields.forEach((field) => {
      if (!formData[field.id]) {
        console.log(`Please enter a ${field.label}`);
        isValid = false;
      }
    });

    if (!isValid) {
      return;
    }
    fetch(url, {
      method: "POST",
      headers: header,
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .then((data) => {
        // Request successful
        console.log(data);
        console.log("submitted Successfully");
      })
      .catch((error) => {
        // Handle request error
        console.error(error);
      });
  };

  return (
    <form>
      {fields.map((field) => (
        <React.Fragment key={field.id}>
          <label htmlFor={field.id}>{field.label}</label>
          <input
            id={field.id}
            value={formData[field.id] || ""}
            onChange={handleInputChange}
          />
        </React.Fragment>
      ))}
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
