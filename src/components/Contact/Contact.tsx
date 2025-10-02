
import React, { useState } from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const body =
      `--------------------------\n` +
      `📝 Solicitud de Contacto\n` +
      `--------------------------\n\n` +
      `👤 Nombre Completo: ${nombre}\n` +
      `✉️ Email: ${email}\n` +
      `📞 Teléfono: ${telefono}\n\n` +
      `💬 Mensaje:\n${mensaje}\n\n` +
      `--------------------------\n` +
      `Recibido automáticamente desde la web.\n\n`;

    const mailtoLink = `mailto:contact@virosms.com?subject=Nuevo Contacto Web de ${nombre}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <section className="form" id="contact">
      <div className="interface">
        <h2 className="title">HABLA <span>COMINGO.</span></h2>
        <form onSubmit={handleSubmit}>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre completo:" required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email:" required />
          <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Telefono:" />
          <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder="Escribe tu mensaje:" required></textarea>
          <div className="btn-send">
            <input type="submit" value="ENVIAR" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
