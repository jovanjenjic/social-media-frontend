import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({onlineUsers, currentId, setCurrentChat}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get('https://social-media-backend-example.herokuapp.com/api/users/friends/' + currentId);
        setFriends(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter(f => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(`https://social-media-backend-example.herokuapp.com/api/conversations/find/${currentId}/${user._id}`);
      setCurrentChat(res.data);
    } catch(e) {
      console.log(e);
    }
  }
  
  return (
    <div className="chatOnline">
      {onlineFriends.map(o => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img src={o.profilePicture ? PF + o.profilePicture : PF + 'person/noAvatar.png'} alt="" className="chatOnlineImg" />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o.username}</span>
        </div>
      ))}
    </div>
  )
}