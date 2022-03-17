import logo from './logo.svg';
import './App.css';
import data from './mockData.js';

function App() {
  return (
    <div>
        <table>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Action</th>
          </tr>

          {
            data.map(person => {
              return (
                <tr>
                  <td>{person["First_name"]}</td>
                  <td>{person["Last_name"]}</td>
                  <td>{person["Email"]}</td>
                  <td>{person["Gender"]}</td>
                  <td>{person["Phone"]}</td>
                  <td>{person["DOB"]}</td>
                </tr>
              )
            })
          }

        </table>
    </div>
  );
}

export default App;
