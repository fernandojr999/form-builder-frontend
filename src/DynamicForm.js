import React from 'react';

function DynamicForm({ formJSON }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};

    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    try {
        const response = await fetch(`http://localhost:8080/data/${formJSON.id}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Falha ao enviar os dados');
        }

        console.log('Dados enviados com sucesso!');

    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
    }
  };

  return (
    <div>
        <hr></hr>
      <form onSubmit={handleSubmit}>
        {formJSON.fields.map((field, index) => (
          <div key={index}>
            <label htmlFor={field.name}>{field.name}</label>
            {field.type === 'textarea' ? (
              <textarea id={field.name} name={field.name}></textarea>
            ) : (
              <input type={field.type} id={field.name} name={field.name} />
            )}
          </div>
        ))}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default DynamicForm;
