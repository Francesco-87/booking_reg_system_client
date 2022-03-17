import React, {useEffect, useState} from "react";
import {formatDateDatabase, formatDateFromDatabase} from "../components/Functions";
import {useNavigate} from "react-router-dom";
import useProfile from "../Hooks/useProfile";
import DayPicker from "react-day-picker";
import {allergensArray} from "../components/Images";
import useLogout from "../Hooks/useLogout";
import {useAllergenSearch} from "../Hooks/useAllergenSearch";
import {allergensUpdate} from "../Hooks/allergensUpdate";
import {updateBookingDates, useGetBookings} from "../components/BookingFunctions";
import {updatePersonalData} from "../components/PersonalDataFunctions"



function Header() {
    const profile = useProfile();
    const [name, setName] = useState();

    useEffect( () =>{
        setName(profile.profile.result[0].customer_name)
    },  [profile.profile.result]);


    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () =>{
        await logout();
        navigate('/');
    }

    return(
        <div className="page-header">
            <h2>Welcome {name}</h2>

<button  className="btn-sites" onClick={signOut}>Sign Out</button>
        </div>

    )

};


//created a UserHomepage to display the Userdata, calendar, allergens;

export function Main(){





//setting the profile
    const profile = useProfile();

    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [birthday, setBirthday] = useState();
    const [eMail, setEMail] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [idCustomer, setIdCustomer] = useState(profile.profile.result[0].idCustomer)



    //just setting it on load (one time)
    useEffect(() => {
        setName(profile.profile.result[0].customer_name)
        setSurname(profile.profile.result[0].customer_surname)
        setBirthday(formatDateFromDatabase(profile.profile.result[0].customer_birthday))
        setEMail(profile.profile.result[0].customer_eMail)
        setPhone(profile.profile.result[0].customer_phone)
        setPassword(profile.profile.result[0].customer_password)

    }, [profile.profile.result] );


    //DatePicker: modifiers to disable weekends, start monday;
    // using a new Date() to initialize the first stateDay, afterwards stateDay gets data from Calendar(Daypicker)
    //r
    const modifiers = {
        disabled: {daysOfWeek: [0,6]},
        monday: { daysOfWeek: [1] },
        firstDayOfWeek: {daysOfWeek:[1]}
    };



    const bookedDays = useGetBookings(idCustomer)
    const [selectedDays, setSelectedDays] = useState(sortBooking(bookedDays.bookings));


    useEffect(() => {
        setSelectedDays(sortBooking(bookedDays.bookings))
    }, [bookedDays.bookings]);

    //sorting and formating the bookingdates
    function sortBooking(booking){
        const bookingArray = [];
        for (let i = 0; i < booking.length; i++) {

            bookingArray[i] = new Date((booking[i].booking_date))
        }
        return bookingArray
    }







    useEffect(() => {

//filtering the selected days into a uniqueArray to get only unique dates.
// 1. mapping the array to get the time (for comparison)
// 2. filtering with index to remove the double selected dates
// 3. if the selectedDays are longer then the uniqueArray -> the selected days are set to the unique array.


        let uniqueArray = selectedDays
            .map(function (date) { return date.toDateString()})
         .filter((date, _, array) => array.indexOf(date) === array.lastIndexOf(date))
    .map(function (time) { return new Date(time); });

if(uniqueArray.length < selectedDays.length){

    setSelectedDays(uniqueArray)
}

    }, [selectedDays]);






   const sendDates = () =>{
       updateBookingDates(idCustomer, selectedDays)


   }



   //defining allergens
    const allergens = useAllergenSearch(profile.profile.result[0].idCustomer);


    const toggleAllergens = (index) => {
        allergens.setAllergen(prevState => {
            return[ ...prevState.slice(0, index),
                prevState[index] === !prevState,
                ...prevState.slice(index + 1),
            ]
        });

    }


    return(

        <div className="row">
            <div className="left-column">
                <div className="card">
                    <h2>Calendar</h2>
                    <h5>Choose your days to display</h5>
                    <div>
                        <DayPicker
                            selectedDays={selectedDays}
                            onDayClick={(v) =>{ setSelectedDays(prevState => {
                                return [...prevState, v]
                            });}}
                            modifiers={modifiers}
                            firstDayOfWeek={1}
                        />
                            <button
                                className="btn-sites"
                                onClick={sendDates}>Update</button>
                    </div>
                </div>

                <div className="card" >

                        <h2>Allergens</h2>
                        <table className="table-allergens">
                            <thead>
                                <tr >
                                    <th>Celery</th>
                                    <th>Crustaceans</th>
                                    <th>Egg</th>
                                    <th>Fish</th>
                                    <th>Gluten</th>
                                    <th>Lupin</th>
                                    <th>Milk</th>
                                    <th>Molluscs</th>
                                    <th>Mustard</th>
                                    <th>Nuts</th>
                                    <th>Peanuts</th>
                                    <th>Sesame</th>
                                    <th>Soy</th>
                                    <th>Sulphides</th>
                                </tr>
                                <tr className="tr-double">
                                    <th>{allergensArray[0]}</th>
                                    <th>{allergensArray[1]}</th>
                                    <th>{allergensArray[2]}</th>
                                    <th>{allergensArray[3]}</th>
                                    <th>{allergensArray[4]}</th>
                                    <th>{allergensArray[5]}</th>
                                    <th>{allergensArray[6]}</th>
                                    <th>{allergensArray[7]}</th>
                                    <th>{allergensArray[8]}</th>
                                    <th>{allergensArray[9]}</th>
                                    <th>{allergensArray[10]}</th>
                                    <th>{allergensArray[11]}</th>
                                    <th>{allergensArray[12]}</th>
                                    <th>{allergensArray[13]}</th>

                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="td-right">
                                    <label className="switch">
                                    <input
                                        type="checkbox"
                                       onChange={() => toggleAllergens(0)}
                                        checked={allergens.allergen[0]}
                                    />
                                        <span className="slider round"></span>
                                </label>
                                    </td>
                                <td className="td-right">
                                    <label className="switch">
                                        <input type="checkbox"
                                         onClick={() => toggleAllergens(1)}
                                         checked={allergens.allergen[1]}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </td>
                                <td className="td-right">
                                    <label className="switch">
                                        <input type="checkbox"
                                               onChange={() => toggleAllergens(2)}
                                               checked={allergens.allergen[2]}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </td>
                                <td className="td-right">
                                    <label className="switch">
                                        <input type="checkbox"
                                               onChange={() => toggleAllergens(3)}
                                               checked={allergens.allergen[3]}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </td>
                                <td className="td-right">
                                    <label className="switch">
                                        <input type="checkbox"
                                               onChange={() => toggleAllergens(4)}
                                               checked={allergens.allergen[4]}/>
                                        <span className="slider round"></span>
                                    </label>
                                </td>
                                <td className="td-right">
                                    <label className="switch">
                                        <input type="checkbox"
                                               onChange={() => toggleAllergens(5)}
                                               checked={allergens.allergen[5]}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </td>
                                <td className="td-right">
                                    <label className="switch">
                                        <input type="checkbox"
                                               onChange={() => toggleAllergens(6)}
                                               checked={allergens.allergen[6]}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </td>
                                <td className="td-right">
                                    <label className="switch">
                                        <input type="checkbox"
                                               onChange={() => toggleAllergens(7)}
                                               checked={allergens.allergen[7]}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </td>
                                <td className="td-right">
                                    <label className="switch">
                                        <input type="checkbox"
                                               onChange={() => toggleAllergens(8)}
                                               checked={allergens.allergen[8]}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </td>
                                <td className="td-right">
                                    <label className="switch">
                                        <input type="checkbox"
                                               onChange={() => toggleAllergens(9)}
                                               checked={allergens.allergen[9]}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </td>
                                <td className="td-right">
                                    <label className="switch">
                                        <input type="checkbox"
                                               onChange={() => toggleAllergens(10)}
                                               checked={allergens.allergen[10]}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </td>
                                <td className="td-right">
                                    <label className="switch">
                                        <input type="checkbox"
                                               onChange={() => toggleAllergens(11)}
                                               checked={allergens.allergen[11]}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </td>
                                <td className="td-right">
                                    <label className="switch">
                                        <input type="checkbox"
                                               onChange={() => toggleAllergens(12)}
                                               checked={allergens.allergen[12]}/>
                                        <span className="slider round"></span>
                                    </label>
                                </td>
                                <td className="td-right">
                                    <label className="switch">
                                        <input type="checkbox"
                                               onChange={() => toggleAllergens(12)}
                                               checked={allergens.allergen[13]}/>
                                        <span className="slider round"></span>
                                    </label>
                                </td>

                            </tr>
                            </tbody>
                        </table>
                    <button className="btn-sites"
                    onClick={() => allergensUpdate(allergens.allergen)}
                    >Update</button>
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
                            <input type="password" id="password" name="password" placeholder="N/A"onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <button className="btn-sites" onClick={() => updatePersonalData(name, surname, formatDateDatabase(birthday), eMail, phone, password, idCustomer)}>Submit</button>

                    </div>




                </div>
                <div className="card">
                    <h3>Popular Post</h3>
                    <div className="fake-img">Image</div>
                    <br/>
                    <div className="fake-img">Image</div>
                    <br/>
                    <div className="fake-img">Image</div>
                </div>
                <div className="card">
                    <h3>Follow Me</h3>
                    <p>Some text..</p>
                </div>
            </div>
        </div>


    )

}

export function UserHomepage() {


    return(
        <>
            <Header/>,
            <Main/>
        </>

    )
}