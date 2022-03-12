import React, {useEffect, useState} from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import useAuth from "../Hooks/useAuth";
import {useNavigate} from "react-router-dom";
import useProfile from "../Hooks/useProfile";
import axios from '../api/axios';





function Header() {
  return (
    <div className="page-header">
      <h1>VOICE Canteen</h1>
    </div>
  );
};
//TODO add checks for password and empty fields; try to separate the functions; add success note after register

//TODO cookies


//The main method rendering the login/reg form; useState to get all the information in variables;
function Main() {


  const [state, setState] = useState(0);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState("");
  const [regPassword, setRegPassword] = useState("");


  const [errMsg, setErrMsg] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const {setAuth, persist, setPersist} = useAuth();
  const {setProfile} = useProfile();

  const navigate = useNavigate();



  useEffect(() => {
    setErrMsg('')
    }, [loginEmail, loginPass]);


  //The function to add a User/chef to the system (using axios-post);
  // it checks for password match before using the post
  const register = () => {

      if(regPassword !== password){
        alert("Passwords do not match");
      }
      else{
        axios.post('/register', {
          name: name,
          surname: surname,
          birthday: birthday,
          eMail: email,
          phone: phone,
          password: password

        })
            .then(function (response) {
              console.log(response);
              toggleButtonClick();
            })
            .catch(function (error) {
              console.log(error);
            });

      }
 };

  //toggle functions for tabs
  const toggleSelect = (index) => {
    setState(index);

  };

  const toggleButtonClick = () => {
    setState(0);
  };


//submitting login information, making an axios post request to the backend to check for credentials,
// if a user exists the email address gets checked for "role" then gets linked to the correspondent site.
  const handleSubmit = async (e) => {

    e.preventDefault();


const response = await axios.post('/login',{

      eMail: loginEmail,
      password: loginPass
    },
    {headers: { 'Content-Type': 'application/json' },
      withCredentials: true});

      if (!response.data.auth) {
        console.log(response.data)
      } else {

        const accessToken = response?.data?.token;
        let roles = [response?.data?.roles];

        setAuth({loginEmail, loginPass, roles, accessToken});
            setLoginPass("");
            setLoginEmail("");
        setProfile(response.data);


        if(roles[0] === 2050){
          navigate("/ChefsHomepage/:id", {replace: true})

        }else{
          navigate("/UserHomepage/:id", {replace: true})
        }


      }
    ;
  };
  const togglePersist = () => {
    setPersist(prev => !prev);
  }

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist])

  //returning the login-register component;
  return (
    <div className="login-wrap">
      <div className="login-html">
        <div className="login-form">
        <Tabs
            selectedIndex={state}
              onSelect={toggleSelect}
            >
          <TabList>
            <Tab id="tab-1"
                 name="tab"
                 htmlFor="tab-1" className="tab">
              Sign In
            </Tab>
            <Tab id="tab-2" name="tab" htmlFor="tab-2" className="tab"
                >
              Sign Up
            </Tab>
          </TabList>

          <TabPanel>
            <div className="sign-in-html">
              <div className="group">
                <label htmlFor="eMail" className="label">
                  User E-Mail
                </label>
                <input id="eMail"
                       type="email"
                       name= "eMail"
                       className="input"
                       placeholder="E-Mail"
                       value={loginEmail}
                       required
                       onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  Password
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    className="input"
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                />
              </div>
              <div className="group">
                <input
                    id="persist"
                    type="checkbox"
                    className="check"
                    onChange={togglePersist}
                    checked={persist}
                />
                <label htmlFor="persist">
                  <span className="icon"></span> Keep me Signed in
                </label>
              </div>
              <div className="group">
                <button onClick={handleSubmit} type="submit" className="button">Sign In</button>
              </div>
              <div className="hr"></div>
              <div className="foot-lnk">
                <a href="#forgot">Forgot Password?</a>
              </div>
            </div>
          </TabPanel>


          <TabPanel>
            {/*The registration form starts here */}
            <div className="sign-up-html">
              <div className="group">
                <label htmlFor="name" className="label">
                  NAME
                </label>
                <input id="name" type="text" className="input" onChange={(event => {
                  setName(event.target.value);
                })} />
              </div>
              <div className="group">
                <label htmlFor="surname" className="label">
                  LAST NAME
                </label>
                <input
                    id="surname"
                    type="text"
                    className="input"
                    required="required"
                    onChange={(event => {
                      setSurname(event.target.value);
                    })}/>
              </div>
              <div className="group">
                <label htmlFor="birthday" className="label">
                  Birthday
                </label>
                <input
                    id="birthday"
                    type="date"
                    className="input"
                    required="required"
                    onChange={(event => {
                      setBirthday(event.target.value);
                    })}
                />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  Email Address
                </label>
                <input id="email" type="email" className="input" required="required"
                       onChange={(event => {
                         setEmail(event.target.value);
                       })}
                />
              </div>
              <div className="group">
                <label htmlFor="phone" className="label">
                  Phone number
                </label>
                <input id="phone" type="int" className="input" required="required" onChange={(event => {
                  setPhone(event.target.value);
                })} />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  Password
                </label>
                <input
                    id="regPass"
                    type="password"
                    className="input"
                    data-type="password"
                    required={true}
                    onChange={(event => {
                      setPassword(event.target.value);
                    })}
                />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  Repeat Password
                </label>
                <input
                    id="repeatPass"
                    type="password"
                    className="input"
                    data-type="password"
                    required="required"
                    onChange={(event => {
                      setRegPassword(event.target.value);
                    })}
                />
              </div>
              <div className="group">
                <button onClick={register} type="submit" className="button">Sign Up</button>
              </div>
              <div className="hr"></div>

              <div className="foot-lnk">
                <label htmlFor="tab-1">Already Member?</label>
              </div>
            </div>
          </TabPanel>

        </Tabs>
        </div>

      </div>
    </div>
  );
}

//centering the HEADER and MAIN in one call
export function Home() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}
