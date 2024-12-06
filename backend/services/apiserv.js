export const createItemDB = async (item) => {
    try {
      const response = await fetch('http://3000/api/createItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
  
      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      return data;
    } catch (error) {
      console.error('Error al enviar datos:', error);
      throw error;
    }
  };
  