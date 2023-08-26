import React, { useEffect, useState } from 'react';
import './App.css';
import { MdClose } from 'react-icons/md';
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:8080/"

function App() {
  const [addSection, setAddSection] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
  });

  const [dataList, setDataList] = useState([])

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post('/create', formData)
    // You can do something with formData here, e.g., send it to an API
    console.log(data);
    if (data.data.success) {
      setAddSection(false)
      alert(data.data.message)
    }
  };

  const getFatchData = async () => {
    const data = await axios.get('/')
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data)
      // alert(data.data.message)
    }
  }

  useEffect(() => {
    getFatchData()
  }, [])
  console.log(dataList)


  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>
          Add
        </button>
        {addSection && (
          <div className="add-container">
            <form onSubmit={handleSubmit}>
              <div className="close-btn" onClick={() => setAddSection(false)}>
                <MdClose />
              </div>

              <label htmlFor="name">Name :</label>
              <input type="text" id="name" name="name" onChange={handleOnChange} />

              <label htmlFor="email">Email :</label>
              <input type="email" id="email" name="email" onChange={handleOnChange} />

              <label htmlFor="mobile">Mobile :</label>
              <input type="number" id="mobile" name="mobile" onChange={handleOnChange} />

              <button className="btn" type="submit">
                Submit
              </button>
            </form>
          </div>
        )}

        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                dataList.map((el) => {
                  return (
                    <tr>
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.mobile}</td>
                      <td>
                      <button className="btn btn-edit ">Edit</button>
                      <button className="btn btn-delete ">Delete</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}

export default App;
