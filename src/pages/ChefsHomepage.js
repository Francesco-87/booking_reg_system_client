import React, {useEffect, useState} from "react";
import "../App.css";
import DayPicker from "react-day-picker";
import 'react-day-picker/lib/style.css';
import {updatePersonalData} from "../components/PersonalDataFunctions"
import {evaluateAllergens, formatDateDatabase, formatDateEurope, formatDateFromDatabase} from "../components/Functions";
import useProfile from "../Hooks/useProfile";
import {useNavigate} from "react-router-dom";
import useLogout from "../Hooks/useLogout";
import {useSearchChefsTable, ChefsTableContext} from "../Hooks/useSearchChefsTable";




//TODO add update function for personal data (add summary of allergens)

//The header, personalized Greeting and Logout
function Header() {
    const profile = useProfile();
    const [name, setName] = useState();

    useEffect( () =>{
        setName(profile.profile.result[0].chef_name)
    }, []);


    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () =>{
        await logout();
        navigate('/');
    }

    return(
        <div className="page-header">
            <h2>Welcome Chef {profile.profile.result[0].chef_name}</h2>
            <button  className="btn-sites" onClick={signOut}>Sign Out</button>
        </div>

        )

};


//Main function... contains the rest of the page
function Main(){

//Personal variables
    const profile = useProfile();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [birthday, setBirthday] = useState();
    const [eMail, setEMail] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [id, setId] = useState(profile.profile.result[0].idChef)

//setting the personal data, once
    useEffect(() => {
        setName(profile.profile.result[0].chef_name)
        setSurname(profile.profile.result[0].chef_surname)
        setBirthday(formatDateFromDatabase(profile.profile.result[0].chef_birthday))
        setEMail(profile.profile.result[0].chef_eMail)
        setPhone(profile.profile.result[0].chef_phone)
        setPassword(profile.profile.result[0].chef_password)
    }, []);




    //DatePicker: modifiers to disable weekends, start monday;
    // using a new Date() to initialize the first stateDay, afterwards stateDay gets data from Calendar(Daypicker)
    //r
    const modifiers = {
            disabled: { daysOfWeek: [6, 0]},
            monday: { daysOfWeek: [1] },
            firstDayOfWeek: {daysOfWeek:[1]}
        };
    const [stateDay, setStateDay] = useState(new Date());


    // Bookingtable with allergens and userinfo.
    let contextValue = useSearchChefsTable(stateDay.toLocaleDateString("zh-Hans-CN"));



    return(

<div className="row">
    <div className="left-column">
        <div className="card">
            <h2>Calendar</h2>
            <h5>Choose your days to display</h5>
            <div>
                <DayPicker
                    selectedDays={stateDay}
                   onDayClick={(e) =>{setStateDay(e);}}
                    modifiers={modifiers}
                    firstDayOfWeek={1}
                />

            </div>
        </div>

        <div className="card" >
            <ChefsTableContext.Provider value={contextValue}>
                <h2>Reservation Results</h2>
                <h5>Matches for date selected</h5>

                <table className="table-chef" >
                    <thead>
                    <tr >
                        <th>Name</th>
                        <th>Lastname</th>
                        <th>Birthday</th>
                        <th>E-mail</th>
                        <th>Phone</th>
                        <th>Allergens</th>
                    </tr>
                    </thead>

                    <tbody>
                    {contextValue.users.map((value, index) => {
                        return(
                            // console.log(value),
                            <tr key={index}>
                              <td>{value.customer_name}</td>

                              <td>{value.customer_surname}</td>

                              <td >{formatDateEurope(value.customer_birthday)}</td>

                              <td>{value.customer_eMail}</td>

                              <td>{value.customer_phone}</td>

                              <td className="td-img"> {evaluateAllergens(value)}</td>

                            </tr>
                        )
                    })}
                    </tbody>

                    <tfoot>
                    <tr className="tr-divider">
                        <td> </td>
                    </tr>
                    <tr>
                        <td> Total guests:</td>

                        <td className="td-right">{contextValue.users.length}</td>

                    </tr>
                    </tfoot>
                </table>

            </ChefsTableContext.Provider>

        </div>
    </div>
    <div className="right-column">
        <div className="card">
            <h2>About Me</h2>
<div className="per-info">
    <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder={name} onChange={e => setName(e.target.value)}/>
    </div>
    <div>
        <label htmlFor="lastname">Lastname</label>
        <input type="text" id="lastname" name="lastname" placeholder={surname} onChange={e => setSurname(e.target.value)}/>
    </div>
    <div>
        <label htmlFor="birthday">Birthday</label>
        <input type="text" id="birthday" name="birthday" placeholder={birthday} onChange={e => setBirthday(e.target.value)}/>

    </div>
    <div>
        <label htmlFor="eMail">E-mail</label>
        <input type="text" id="eMail" name="eMail" placeholder={eMail} onChange={e => setEMail(e.target.value)}/>
    </div>
    <div>
        <label htmlFor="phone">Phone</label>
        <input type="text" id="phone" name="phone" placeholder={phone} onChange={e => setPhone(e.target.value)}/>
    </div>
    <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="N/A" onChange={e => setPassword(e.target.value)}/>
    </div>
    <button className="btn-sites" onClick={() => updatePersonalData(name, surname, formatDateDatabase(birthday), eMail, phone, password, id)}>Submit</button>

</div>




        </div>
        <div className="card">
            <h3>Menu of the Day</h3>
            <div className="fake-img">Image</div>
            <br/>
            <div className="fake-img">Image</div>
            <br/>
            <div className="fake-img">Image</div>
        </div>
        <div className="card">
            <h3>Logout</h3>
            <button className="btn-sites" onClick={useLogout}>LOGOUT</button>
        </div>
    </div>
</div>


        )

}



export function ChefsHomepage() {


    return(
        <>
            <Header/>,
            <Main/>
        </>

    )
}