import React from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <div className={`container-fluid`}>
        <Header/>
        <Main/>
      </div>
    </div>
  );
}

export default App;




// import React, { useState} from 'react';
// import axios from 'axios';

// const App = () => {
//     const [testGet, setTestGet] = useState('KO');
//     const [testPost, setTestPost] = useState('KO');
//     const API_HOST = 'http://localhost:8000';
//     const [_csrfToken, set_csrfToken] = useState(null);

//     function getCsrfToken() {
//     if (_csrfToken === null) {
//         axios.get(`${API_HOST}/csrf/`, {
//         credentials: 'include',
//         })
//         .then((res) => {
//           set_csrfToken(res.data.csrfToken);
//         })
//     }
//     console.log(_csrfToken)
//     return _csrfToken;
//     }

//     // function testRequest(method) {
//     // axios.get(`${API_HOST}/ping/`, {credentials: 'include'}, {
//     //     method: method,
//     //     headers: (
//     //     method === 'POST'
//     //         ? {'X-CSRFToken': getCsrfToken()}
//     //         : {}
//     //     ),
//     // })
//     // .then((res) => {
//     //   set_csrfToken(res.data.csrfToken);
//     // })
//     // // console.log(_csrfToken)
//     // return _csrfToken  
//     // }




//     return (
//       <div>
//         {/* <p>Test GET request: {testGet}</p>
//         <p>Test POST request: {testPost}</p> */}
//         <p>_csrfToken: {getCsrfToken()}</p>
//       </div>
//     );

// }

// export default App;