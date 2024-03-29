import './rightbar.css';
import { Users } from "../../dummyData";
import Online from '../online/Online';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {Add, Remove} from "@material-ui/icons";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const {user: currentUser, dispatch} = useContext(AuthContext); 
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user?._id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get('https://social-media-backend-example.herokuapp.com/api/users/friends/' + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    }
    getFriends();
  },[user]);

  const handleClick = async () => {
    try {
      if(followed) {
        await axios.put("https://social-media-backend-example.herokuapp.com/api/users/" + user?._id + "/unfollow", {userId:currentUser?._id});
        dispatch({ type: 'UNFOLLOW', payload: user?._id })
      }
      else {
        await axios.put("https://social-media-backend-example.herokuapp.com/api/users/" + user?._id + "/follow", {userId:currentUser?._id});
        dispatch({ type: 'FOLLOW', payload: user?._id })
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(prev => !prev);
  }

  const HomeRightbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
      <>
        <div className="birthdayContainer">
          <img src="assets/birthday.png" alt="" className="birthdayImg" />
          <span className="birthdayText"><b>Pola Foster</b> and <b>3 other friends </b> have a brithday today</span>
        </div>
        <img src="assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online friends</h4>
        <ul className="rightbarFriendList">
          {Users.map(u => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    )
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
           {!followed ?  'Follow' : 'Unfollow'}
           {!followed ?  <Add /> : <Remove />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? 'Single' : user.relationship === 2 ? 'Marrid' : ""}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friend</h4>
        <div className="rightbarFollowings">
          {friends.map(friend => (
            <Link to={"/profile/"+friend?.username} style={{textDecoration: 'none'}}>
              <div className='rightbarFollowing'>
                <img src={friend?.profilePicture ? PF+friend.profilePicture : PF+"person/noAvatar.png"} alt="" className="rightbarFollowingImg" />
                <span className="rightbarFollowingName">{friend?.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  }

  return(
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar /> }
      </div>
    </div>
  )
}