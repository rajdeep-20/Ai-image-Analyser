// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const Sidebar = () => {
//   const [recent, setRecent] = useState([]);

//   useEffect(() => {
//     // Fetch recent logs when the component loads
//     axios.get('http://localhost:5000/logs/recent')
//       .then(response => {
//         setRecent(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching recent logs:', error);
//       });
//   }, []);

//   return (
//     <aside className="sidebar">
//       <h2>AI Analyzer</h2>
//       <nav className="nav-links">
//         <Link to="/" className="nav-link">Uploader</Link>
//         <Link to="/history" className="nav-link">History</Link>
//       </nav>

//       <div className="recent-section">
//         <h3>Recent</h3>
//         <div className="recent-list">
//           {recent.map(log => (
//             <div key={log._id} className="recent-item">
//               {log.caption.substring(0, 25)}...
//             </div>
//           ))}
//         </div>
//       </div>
//     </aside>
//   );
// };



// export default Sidebar;
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">🧠</div>
      <nav className="nav-links">
        <Link to="/" className="nav-link" title="Uploader">
          <span className="icon">📤</span>
          <span className="text">Uploader</span>
        </Link>
        <Link to="/history" className="nav-link" title="History">
          <span className="icon">📜</span>
          <span className="text">History</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;