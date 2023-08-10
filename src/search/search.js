// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const SearchBar = () => {
//   const [searchTerm, setSearchSong] = useState('');
//   const [data, setSong] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchSong = async () => {
//     try {
//       const response = await axios.get('YOUR_API_ENDPOINT');
//       setSong(response.data); // Assuming the API returns an array of objects
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handleInputChange = (event) => {
//     setSearchSong(event.target.value);
//   };

//   // Filter the data based on the search term
//   const filteredData = data.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search by name..."
//         value={searchTerm}
//         onChange={handleInputChange}
//       />
//       <ul>
//         {filteredData.map((item) => (
//           <li key={item.id}>{item.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SearchBar;
