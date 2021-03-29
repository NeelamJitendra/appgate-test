import React, { useState } from 'react';
import './Login.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import HeaderImage from './HeaderImage.jpg';
import { v4 as uuidv4 } from 'uuid';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

async function loginUser(credentials) {
    return fetch('/admin/login', {
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/vnd.appgate.peer-v14+json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(credentials)
    })
      .then(response=>{
        if(response.ok){
           return response.json()
        }else{ 
          response.text().then(text =>{
            
            const error = JSON.parse(text);
            throw alert(error.message)
          })
        }
      })
      .catch(err => {
        alert(err);
      });
   }
   
export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [rememberMe, setRememberMe] = useState(false);
  const [identityProvider, setIdentityProvider] = useState("Company LDAP");
  const classes = useStyles();
    
  const handleSubmit = async e => {
    e.preventDefault();
    try{
      const token = await loginUser({
        "providerName": identityProvider,
        "username": username,
        "password": password,
        "deviceId": uuidv4(),
        "samlResponse": "string"
      });
      setToken(token);
    }
    catch(error){
      console.error(error)
    }
  }
  return(
    <div className="bg-img">
            <form className="form-wrapper" onSubmit={handleSubmit}>
              <img src={HeaderImage} alt={'HeaderImage'} />
              <div>The credentials for this Test Drive have been sent to the e-mail address you registered with.
                The email is from "AppGate SDP Test Drive &lt;noreply@appgate.com&gt;". 
                <br/><br/>
                Use "Company LDAP" Identity Provider for signing in.
              </div>

              <br/><br/>
              
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="identity-provider">Identity Provider</InputLabel>
                <Select
                  labelId="identity-provider"
                  id="identity-provider"
                  onChange={e => setIdentityProvider(e.target.id)}
                  value={identityProvider}
                  label="identity-provider">
                  <MenuItem value={"Company LDAP"}>Company LDAP</MenuItem>
                  <MenuItem value={"local"}>Local</MenuItem>
                </Select>
              </FormControl>

              <TextField className={classes.formControl} color="primary" type="text" id="username" onChange={e => setUserName(e.target.value)} label="Username" variant="outlined" />

              <TextField className={classes.formControl} color="primary" type="password" id="password" onChange={e => setPassword(e.target.value)} label="password" variant="outlined" />
              
              <FormControlLabel
                className={classes.formControl}
                control={
                  <Checkbox
                    onChange={e => setRememberMe(e.target.checked)}
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    name="keepLoggedIn"
                    color="primary"
                  />
                }
                label="Keep me signed in until token expires"
              />

              <Button type="submit" variant="outlined" color="primary">Sign in</Button>
            </form>
          </div>
  )
}

Login.propTypes = {
    //setToken: PropTypes.func.isRequired
  }