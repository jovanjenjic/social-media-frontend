import "./topbar.css";
import { Search, Person, Chat, Notifications } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
  
  return(
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{textDecoration: 'none'}}>
          <span className="logo">Lamasocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="Search for friend, post or video" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <span className="topbarLink">Homepage</span>
        <span className="topbarLink">Timeline</span>
        <div className="topbarLinks">
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>
            <Link to="/messenger" style={{color: 'white'}}>
              <div className="topbarIconItem">
                <Chat />
                <span className="topbarIconBadge">2</span>
              </div>
            </Link>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
        </div>
        <img onClick={() => setShowDropdown(prev => !prev)} src={user?.profilePicture ? PF + user?.profilePicture : PF + "person/noAvatar.png"} alt="" className="topbarImg"/>
        {showDropdown &&
          <div className="dropdownMenu">
            <Link to={`/profile/${user?.username}`} style={{'text-decoration': 'none', color: 'black'}}>
              <span className="dropdownMenuText">Profile</span>
            </Link>
            <span onClick={handleLogout} className="dropdownMenuText">Logout</span>
          </div>
        }
      </div>
    </div>
  )
}