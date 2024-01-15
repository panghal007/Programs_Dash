
import React, { useState, useEffect } from 'react';
import ProgramList from './ProgramList';
import ProgramForm from './ProgramForm';
import programApi from '../api/programApi';
import ProgramDetails from './ProgramDetails'; 
import { useUserContext } from '../UserContext';
import './ProgramsDashboard.css'; 


const ProgramsDashboard = () => {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [availableDomains, setAvailableDomains] = useState([]); // List of available domains
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { user } = useUserContext();
  useEffect(() => {
    const fetchPrograms = async () => {
      const programsData = await programApi.getAllPrograms();
      setPrograms(programsData);
      // Extract unique domains from programs and set as availableDomains
      const domains = [...new Set(programsData.map(program => program.domain))];
      setAvailableDomains(domains);

    };
    fetchPrograms();
  }, []);

  useEffect(() => {
    // Filter programs based on the search term and selected domain
    const filtered = programs.filter(
      (program) =>
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedDomain ? program.domain === selectedDomain : true)
    );
    setFilteredPrograms(filtered);
  }, [searchTerm, selectedDomain, programs]);

  const handleSelectProgram = (program) => {
   
    setSelectedProgram(program);
    setIsEditing(false);
  };

  const handleCreateProgram = async (programData) => {
    await programApi.createProgram(programData);
    const updatedPrograms = await programApi.getAllPrograms();
    setPrograms(updatedPrograms);
    // Update available domains
    const domains = [...new Set(updatedPrograms.map(program => program.domain))];
    setAvailableDomains(domains);
    setIsFormVisible(false); // Hide the form after creating a program

  };

  const handleUpdateProgram = async (programData) => {
   
      await programApi.updateProgram(programData);
      const updatedPrograms = await programApi.getAllPrograms();
      setPrograms(updatedPrograms);
      setSelectedProgram(null);
      // Update available domains
      const domains = [...new Set(updatedPrograms.map(program => program.domain))];
      setAvailableDomains(domains);
      setIsFormVisible(false); // Hide the form after updating a program
    
  };

  const handleEdit = (program) => {
    setSelectedProgram(program);
    setIsEditing(true);
    setIsFormVisible(true);
  };

  const handleDeleteProgram = async (programId) => {
   
      await programApi.deleteProgram(programId);
      const updatedPrograms = await programApi.getAllPrograms();
      setPrograms(updatedPrograms);
      // Update available domains
      const domains = [...new Set(updatedPrograms.map(program => program.domain))];
      setAvailableDomains(domains);
      setIsFormVisible(false); // Hide the form after deleting a program
    
    
  };

  const handleDomainFilter = (domain) => {
    setSelectedDomain(domain);
  };
  const handleToggleForm = () => {
    setIsFormVisible(!isFormVisible);
    setSelectedProgram(null); // Clear selected program when toggling the form
  };



  return (
    <div className="programs-dashboard-container">
      <div className="programs-dashboard" style={{ height: '100vh', display: 'flex' }}>
        <div className="left-section" style={{ flex: '0 0 20%', padding: '20px' }}>
          <h1>Welcome, {user?.username || 'Guest'}!</h1>
          <div className="input-container">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label>Filter by Domain:</label>
            <select value={selectedDomain} onChange={(e) => handleDomainFilter(e.target.value)}>
              <option value="">All Domains</option>
              {availableDomains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>

          <div className="button-container">
            <button onClick={handleToggleForm}>{isFormVisible ? 'Hide Form' : 'Add Program'}</button>
          </div>
        </div>

        <div className="middle-section" style={{ flex: '0 0 60%', padding: '20px' }}>
          <div className="program-list-grid">
            <ProgramList programs={filteredPrograms} onSelectProgram={handleSelectProgram} />
          </div>
        </div>

        <div className="right-section" style={{ flex: '0 0 20%', padding: '20px' }}>
          <ProgramDetails program={selectedProgram} onEdit={handleEdit} />
        </div>
      </div>

      {isFormVisible && (
        <div className="program-form-section">
          <ProgramForm
            program={selectedProgram}
            onCreateProgram={handleCreateProgram}
            onUpdateProgram={handleUpdateProgram}
            onDeleteProgram={handleDeleteProgram}
            availableDomains={availableDomains}
            ownerUsername={user?.username}
            isEditMode={isEditing}
          />
        </div>
      )}
    </div>
  );
};

export default ProgramsDashboard;


// import React, { useState, useEffect } from 'react';
// import ProgramList from './ProgramList';
// import ProgramForm from './ProgramForm';
// import programApi from '../api/programApi';

// const ProgramsDashboard = () => {
//   const [programs, setPrograms] = useState([]);
//   const [filteredPrograms, setFilteredPrograms] = useState([]);

//   const [selectedProgram, setSelectedProgram] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
  

// //   useEffect(() => {
// //     console.log('Fetching programs based on search term:', searchTerm);

// //     const fetchPrograms = async () => {
// //       const programsData = await programApi.getAllPrograms(searchTerm);
// //       console.log('Fetched Programs:', programsData);

// //       setPrograms(programsData);
// //     };
// //     fetchPrograms();
// //   }, [searchTerm]);

// //   const handleSelectProgram = (program) => {
// //     setSelectedProgram(program);
// //   };
// useEffect(() => {
//     const fetchPrograms = async () => {
//       const programsData = await programApi.getAllPrograms();
//       setPrograms(programsData);
//     };
//     fetchPrograms();
//   }, []);

//   useEffect(() => {
//     // Filter programs based on the search term
//     const filtered = programs.filter((program) =>
//       program.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredPrograms(filtered);
//   }, [searchTerm, programs]);

//   const handleSelectProgram = (program) => {
//     setSelectedProgram(program);
//   };

//   const handleCreateProgram = async (programData) => {
//     console.log('Creating Program:', programData);

//     await programApi.createProgram(programData);
//     const updatedPrograms = await programApi.getAllPrograms();
//     setPrograms(updatedPrograms);
//   };

//   const handleUpdateProgram = async (programData) => {
//     await programApi.updateProgram(programData);
//     const updatedPrograms = await programApi.getAllPrograms();
//     setPrograms(updatedPrograms);
//     setSelectedProgram(null);
//   };

//   const handleDeleteProgram = async (programId) => {
//     await programApi.deleteProgram(programId);
//     const updatedPrograms = await programApi.getAllPrograms();
//     setPrograms(updatedPrograms);
//   };
// //   const handleSearchChange = (e) => {
// //     setSearchTerm(e.target.value);
// //   };
// //   const filteredPrograms = programs.filter((program) =>
// //   program.name.toLowerCase().includes(searchTerm.toLowerCase())


// //   return (
// //     <div>
// //         <input  type="text" placeholder="Search by name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
// //       {/* <ProgramList programs={programs} onSelectProgram={handleSelectProgram} /> */}
// //       <ProgramList programs={filteredPrograms} onSelectProgram={handleSelectProgram} />

// //       <ProgramForm
// //         program={selectedProgram}
// //         onCreateProgram={handleCreateProgram}
// //         onUpdateProgram={handleUpdateProgram}
// //         onDeleteProgram={handleDeleteProgram}
// //       />
// //     </div>
// //   );
// return (
//     <div style={{ display: 'flex' }}>
//       {/* Left Column (Search Bar) */}
//       <div style={{ width: '30%', padding: '20px' }}>
//         <input
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Right Column (Program List and Form) */}
//       <div style={{ width: '70%', padding: '20px' }}>
//         <ProgramList programs={filteredPrograms} onSelectProgram={handleSelectProgram} />
//         <ProgramForm
//           program={selectedProgram}
//           onCreateProgram={handleCreateProgram}
//           onUpdateProgram={handleUpdateProgram}
//           onDeleteProgram={handleDeleteProgram}
//         />
//       </div>
//     </div>
//   );
// };

// export default ProgramsDashboard;
