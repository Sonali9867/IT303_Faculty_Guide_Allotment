// src/pages/PreferenceViewingPage.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

function PreferenceViewingPage() {
  const facultyName = localStorage.getItem('facultyName');
  const [selectedStudents, setSelectedStudents] = useState({});
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [notification, setNotification] = useState('');

  const clusters = {
    cluster1: [
      { name: "Student A", roll: "221IT001", cg: 9.5 },
      { name: "Student B", roll: "221IT002", cg: 9.52 },
      { name: "Student C", roll: "221IT003", cg: 9.43 },
      { name: "Student D", roll: "221IT004", cg: 9.3 },
      { name: "Student E", roll: "221IT005", cg: 9.2 },
  ],
  cluster2: [
      { name: "Student F", roll: "221IT008", cg: 9.0 },
      { name: "Student G", roll: "221IT090", cg: 8.9 },
      { name: "Student H", roll: "221IT081", cg: 8.89 },
      { name: "Student I", roll: "221IT056", cg: 8.85 },
      { name: "Student J", roll: "221IT065", cg: 8.7 },
  ],
  cluster3: [
      { name: "Student K", roll: "221IT044", cg: 8.1 },
      { name: "Student L", roll: "221IT045", cg: 7.9 },
      { name: "Student M", roll: "221IT043", cg: 7.89 },
      { name: "Student N", roll: "221IT041", cg: 7.5 },
      { name: "Student O", roll: "221IT031", cg: 7.7 },
  ],
  cluster4: [
      { name: "Student P", roll: "221IT087", cg: 7.6 },
      { name: "Student Q", roll: "221IT078", cg: 6.2 },
      { name: "Student R", roll: "221IT076", cg: 5.6 },
      { name: "Student S", roll: "221IT088", cg: 5.4 },
      { name: "Student T", roll: "221IT089", cg: 5.9 },
  ],
    // ... other clusters
  };

  const deadline = new Date('2024-10-27T23:48:00');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeDiff = deadline - now;

      if (timeDiff <= 0) {
        clearInterval(interval);
        assignStudents();
        setNotification('The deadline has passed. Students have been assigned.');
        alert('The deadline has passed. You can no longer select students.');
      } else {
        setTimeRemaining(formatTime(timeDiff));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return ${hours}h ${minutes}m ${seconds}s;
  };

  const handleSelectStudent = (clusterName, studentName) => {
    if (selectedStudents[clusterName]) {
      setNotification(Only one student can be selected from ${clusterName}!);
      return;
    }

    if (new Date() > deadline) {
      setNotification('The deadline has passed. You cannot select students.');
      return;
    }

    setSelectedStudents({
      ...selectedStudents,
      [clusterName]: studentName,
    });
  };

  const removeSelectedStudent = (clusterName) => {
    const newSelectedStudents = { ...selectedStudents };
    delete newSelectedStudents[clusterName];
    setSelectedStudents(newSelectedStudents);
  };

  const assignStudents = () => {
    const assigned = [];
    Object.entries(clusters).forEach(([clusterName, students]) => {
      const selectedStudent = selectedStudents[clusterName];
      if (selectedStudent) {
        assigned.push(${selectedStudent} has been assigned from ${clusterName}.);
      } else {
        const highestCGStudent = students.reduce((prev, curr) =>
          prev.cg > curr.cg ? prev : curr
        );
        assigned.push(
          ${highestCGStudent.name} has been automatically assigned from ${clusterName}.
        );
      }
    });
    setAssignedStudents(assigned);
  };

  return (
    <div className="bg-gray-100 text-gray-800 font-sans min-h-screen">
      <Header facultyName={facultyName} />
      <section className="flex justify-center items-start min-h-screen">
        <div className="bg-white p-10 rounded shadow-lg w-full max-w-3xl">
          <h1 className="text-3xl font-semibold mb-8">Review Student Preferences</h1>
          {/* Render clusters and students */}
          {Object.entries(clusters).map(([clusterName, students]) => (
            <div key={clusterName} className="mb-6">
              <h2 className="text-xl font-semibold capitalize">{clusterName}</h2>
              <table className="min-w-full bg-white border border-gray-300 mb-4">
                <tbody>
                  {students.map((student) => (
                    <tr key={student.roll} className="hover:bg-gray-100">
                      <td className="border border-gray-300 p-2">{student.name}</td>
                      <td className="border border-gray-300 p-2">{student.roll}</td>
                      <td className="border border-gray-300 p-2">{student.cg}</td>
                      <td className="border border-gray-300 p-2">
                        <button
                          onClick={() => handleSelectStudent(clusterName, student.name)}
                          className="bg-blue-500 text-white py-1 px-2 rounded"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          {/* Display selected students */}
          <h2 className="text-xl font-semibold">Selected Students</h2>
          <ul className="mb-4">
            {Object.entries(selectedStudents).map(([cluster, student]) => (
              <li key={cluster}>
                {student} from {cluster}{' '}
                <button
                  onClick={() => removeSelectedStudent(cluster)}
                  className="text-red-500 ml-2"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          {/* Notifications and countdown */}
          {notification && <div className="text-red-500 mb-4">{notification}</div>}
          <div className="font-bold text-xl mb-4">Time Remaining: {timeRemaining}</div>
          {/* Display assigned students */}
          <h2 className="text-xl font-semibold mt-4">Assigned Students</h2>
          <ul>
            {assignedStudents.map((assignment, index) => (
              <li key={index}>{assignment}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default PreferenceViewingPage;