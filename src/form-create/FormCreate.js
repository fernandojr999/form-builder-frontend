import React, { useState } from 'react';

function FormCreate() {
    const [form, setForm] = useState({
        name: '',
        fields: [],
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
          ...prevForm,
          [name]: value,
        }));
    };

    const handleFieldChange = (event, index) => {
        const { name, value } = event.target;
        setForm((prevForm) => {
          const updatedFields = [...prevForm.fields];
          updatedFields[index] = {
            ...updatedFields[index],
            [name]: value,
          };
          return {
            ...prevForm,
            fields: updatedFields,
          };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/metadata`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error('Falha ao enviar os dados');
            }
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }
    };

    const addField = () => {
        setForm((prevForm) => ({
          ...prevForm,
          fields: [...prevForm.fields, { name: ''}],
        }));
    };

  return (
    <div>
        <label>Novo Formulário</label>
        <hr></hr>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nome do Formulario:</label>
            <input id='formName' name='name' value={form.name} onChange={handleChange} ></input>
            
            <h2>Campos do Formulário</h2>
            {form.fields.map((item, index) => (
                <div key={index}>
                    <div>
                        <label htmlFor={`name${index}`}>Nome do Campo:</label>
                        <input type="text" id={`name${index}`} name="name" value={item.name} onChange={(e) => handleFieldChange(e, index)} />
                    </div>
                </div>
            ))}
            <button type="button" onClick={addField}>Adicionar Campo</button>
            <button type="submit">Enviar</button>
        </form>
    </div>
  );
}

export default FormCreate;
