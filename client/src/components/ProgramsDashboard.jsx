
import React, { useState, useEffect } from 'react';
import ProgramList from './ProgramList';
import ProgramForm from './ProgramForm';
import programApi from '../api/programApi';
import ProgramDetails from './ProgramDetails'; 


import { useUserContext } from '../UserContext';
import './ProgramsDashboard.css'; 
import Navbar from "./navbar";
import AnimatedPage from "./AnimatedPage";

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
    <AnimatedPage>

    <div className="top">
      {/* <img src="../public/back.avif" className="back--image"/> */}
      <div className="my-head">
      <Navbar />
      </div>
    
    {/* <div className="programs-dashboard-container"> */}
      <div className="programs-dashboard" >
      
        <div className="left-section" >
        {/* // style={{ flex: '0 0 10%', padding: '20px' }}> */}
          <h1>Welcome, {user?.username || 'Guest'}!</h1>
          <div className="input-container">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div >
            <label>Filter by Domain:</label>
            <select className="domain-select"value={selectedDomain} onChange={(e) => handleDomainFilter(e.target.value)}>
              <option value="">All Domains</option>
              {availableDomains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>
          { user  &&(
          <div className="button-container">
            <a href="#form">
            <button onClick={handleToggleForm}>{isFormVisible ? 'Hide Form' : 'Add Program'}</button>
            </a>
            
          </div>)}
        </div>

        <div className="middle-section" >
        {/* style={{ flex: '0 0 60%', padding: '20px' }} */}
          {/* <div className="program-list-grid"> */}
            <ProgramList programs={filteredPrograms} onSelectProgram={handleSelectProgram} />
          {/* </div> */}
        </div>

        <div id="detail" className="right-section" >
        {/* style={{ flex: '0 0 20%', padding: '20px' }} */}
          <ProgramDetails program={selectedProgram} onEdit={handleEdit} />
        </div>
      

      
      </div>
      {isFormVisible && (
        <div id="form"className="program-form-section">
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
    {/* </div> */}
    <div id="footer" className="footer">
            {/* <img src="download.png" className="header--image"/> */}
            <div className='foot-child1'>
            <h1>Programs Dashboard
              {/* <ReactTyped strings={["Programs Dashboard"]}
                          typeSpeed={50}
                          cursorChar="#"
                          showCursor={false}/> */}
            </h1>
            <h3>-by Unique Panghal</h3> 
            </div>
            
            <div className="foot-child2">
            <h2>Get in Touch:</h2> 
            <a href="https://github.com/panghal007"><img src="gihub2.png"  /></a>
            <a href="https://www.linkedin.com/in/uniquepanghal/"><img className="img2" src="linkedin.jpg" /></a>    
            {/* <h4>-by Unique Panghal</h4>  */}
                
            </div>
        </div>
    </div>
    </AnimatedPage>


  );
};

export default ProgramsDashboard;