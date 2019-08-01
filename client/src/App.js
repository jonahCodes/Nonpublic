import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import Home from './components/Home'
import { Container } from 'reactstrap';
import Create from './pages/Create'

function App() {
  return (
      <Router>
        <div>
          <TopNav />
          <Container>
            <Switch>
            <Route exact path='/' component={Home}/>   
              <Route exact path="/signup" render={(props) => <Auth {...props} action="signup" />} />
              <Route exact path="/login" render={(props) => <Auth {...props} action="login" />} />
              <Route exact path="/profile" component={Profile} />
             <Route exact path='/create' component={Create}/>
            </Switch>
          </Container>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
