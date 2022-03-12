import "./App.css";
import { Home } from "./pages/Home";
import { ChefsHomepage } from "./pages/ChefsHomepage";
import {Route, Routes} from "react-router-dom";
import {UserHomepage} from "./pages/UserHomepage";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";



//holds the navigation of the application,
function App() {


  return (
    <div >
      <Routes>
        <Route path="/" exact element={<Home />} />

<Route element={<PersistLogin/>}>
        <Route element={<RequireAuth allowedRoles={[1050]}/>}>
            <Route  path="/UserHomepage/:id" element={<UserHomepage />}/>
        </Route>

        <Route element={<RequireAuth allowedRoles={[2050]} />}>
              <Route path="/ChefsHomepage/:id" element={<ChefsHomepage />} />
        </Route>
</Route>
      </Routes>

    </div>
  );
}

export default App;
