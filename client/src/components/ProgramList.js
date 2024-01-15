import React from 'react';
import './ProgramsDashboard.css'; 


const ProgramList = ({ programs, onSelectProgram }) => {
  return (
    <div className="program-list">
      <h2>ProgramsList!!</h2>
      {programs.length > 0 ? (
        programs.map((program) => (
          <div
            key={program.id}
            className="program-card"
            onClick={() => onSelectProgram(program)}
          >
            <h3>{program.name}</h3>
            <p>
              <strong>Domain:</strong> {program.domain}
            </p>
            <p>
              <strong>Price:</strong> INR {program.price}
            </p>
          </div>
        ))
      ) : (
        <p>No programs available.</p>
      )}
    </div>
  );
};

export default ProgramList;