const BASE_URL = 'http://localhost:3000'; 

const programApi = {
//   getAllPrograms: async () => {
//     const response = await fetch(`${BASE_URL}/programs`);
//     const data = await response.json();
//     return data;
//   },
getAllPrograms: async (searchTerm) => {
    const queryParams = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : '';
    const response = await fetch(`${BASE_URL}/programs${queryParams}`);
    const data = await response.json();
    return data;
},

createProgram: async (programData) => {
    const response = await fetch(`${BASE_URL}/programs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(programData),
    });
    const data = await response.json();
    return data;
},

updateProgram: async (programData) => {
    const response = await fetch(`${BASE_URL}/programs/${programData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(programData),
    });
    const data = await response.json();
    return data;
},

deleteProgram: async (programId) => {
    const response = await fetch(`${BASE_URL}/programs/${programId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  },
};

export default programApi;