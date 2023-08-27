import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Formtable from './component/Form';
import {AiFillDelete} from 'react-icons/ai'
import {GrEdit} from 'react-icons/gr'



axios.defaults.baseURL = "http://localhost:8080/";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [formDataEdit, setFormDataEdit] = useState({
    name: '',
    email: '',
    mobile: '',
    _id: '',

  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
  });



  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post('/create', formData);
    console.log(data);
    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFatchData();
      setFormData({
        name: '',
        email: '',
        mobile: '',
      })
    }
  };

  const getFatchData = async () => {
    const data = await axios.get('/');
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  useEffect(() => {
    getFatchData();
  }, []); // Call getFatchData() only when the component mounts

  const handleDelete = async (id) => {
    const data = await axios.delete('/delete/' + id);
    if (data.data.success) {
      getFatchData();
      alert(data.data.message);
    }
  };

  const handleUpdate = async(e) => {
    e.preventDefault()
    const data = await axios.put('/update/',formDataEdit);
    if (data.data.success) {
      getFatchData();
      alert(data.data.message);
      setEditSection(false)
    }
  };

  const handleEditOnChange = async (e)=>{
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleEdit = async(el)=>{
    setFormDataEdit(el)
    setEditSection(true)
  }

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>
          Add
        </button>
        {addSection && (
          <Formtable
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleclose={() => setAddSection(false)}
            rest={formData}
          />
        )}
        {
          editSection && (
            <Formtable
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleclose={() => setEditSection(false)}
            rest={formDataEdit}
          />
          )
        }

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
              {dataList.length ? (
                dataList.map((el) => {
                  return (
                    <tr key={el._id}>
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.mobile}</td>
                      <td>
                        <button className="btn btn-edit" onClick={()=>handleEdit(el)}><GrEdit/>Edit</button>
                        <button className="btn btn-delete" onClick={() => handleDelete(el._id)}><AiFillDelete/> Delete</button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="4">No data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
