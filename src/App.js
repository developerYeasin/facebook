import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import PostDetails from './components/Posts/PostDetails/PostDetails';

function App() {
  return (
    <div>
      <Router>
          <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/post/:postId" element={<PostDetails/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

