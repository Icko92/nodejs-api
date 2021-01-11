//Dependencies
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

//Global redux store
import store from "./redux/store";

//Page Components
import Superadmin from "./components/pages/superadmin/Superadmin";

//Style
import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route path="/superadmin" component={Superadmin} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
