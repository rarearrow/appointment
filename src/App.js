import logo from './logo.svg';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import React from 'react'
import TextField from "@material-ui/core/TextField";
import PrimaryApi from "../src/api/axios";
import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [dateSet, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [spinBool,setSpinBool] = React.useState(false);

  var date = new Date();
  var CurrentDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  const body = (
    <div style={{ top: '15%', left: '25%', position: "absolute", width: "50%", height: "80%", backgroundColor: "white", display: 'flex', flexDirection: 'column', justifyContent: "space-around", alignItems: "center", outline: "white", borderRadius: "15px" }}>
      <input onChange={(data) => { setName(data.target.value) }} style={{ width: '70%', height: "50px", borderRadius: "5px", fontSize: "20px" }} placeholder='Enter Name' />
      <input onChange={(data) => { setEmail(data.target.value) }} style={{ width: '70%', height: "50px", borderRadius: "5px", fontSize: "20px" }} placeholder='Email' />
      <input onChange={(data) => { setDescription(data.target.value) }} style={{ width: '70%', height: "50px", borderRadius: "5px", fontSize: "20px" }} placeholder='Description' />
      <TextField
        id="date"
        label="Select Appointment Date"
        type="date"
        style={{ width: '50%', color: "white" }}
        onChange={(data) => { setDate(data.target.value) }}
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
        id="date"
        label="Select Appointment Time"
        type="time"
        style={{ width: '50%', color: "white" }}
        onChange={(data) => { setTime(data.target.value) }}
        InputLabelProps={{
          shrink: true
        }}
      />
      {spinBool?<CircularProgress />:null}
      <button onClick={async() => {
        setSpinBool(true);
        console.log(name, email, description, dateSet, time);
        const rawResponse = await PrimaryApi.post('/users/post_event',{'name':name,'email':email,'description':description,'dateSet':dateSet,'time':time});
        console.log(rawResponse.data)
        setSpinBool(false);
        if(rawResponse.data.status == 'success')
       { alert('Event Created');setLoginModel(false)}
        else
        alert('Event Creation Failed')
      }}>Submit</button>
    </div>
  )
  const [loginModel, setLoginModel] = React.useState(false);
  return (

    <div style={{ flexGrow: 1, background: "white", height: '100vh', backgroundColor: "#acecfe57" }}>
      <Modal
        open={loginModel}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-desciption"
      >
        {body}
      </Modal>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" >
            Bkgs Appointment
        </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ height: "88%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div>
          <button onClick={() => { setLoginModel(!loginModel) }} style={{ width: "200px", height: "50px", backgroundColor: "#48dc33", color: "white", borderRadius: "5px", border: "1px solid #48dc33" }}>Make Appointment</button>
        </div>

      </div>
    </div>
  );
}

export default App;
