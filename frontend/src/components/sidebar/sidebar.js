

// import React, { useState } from 'react';
// import './sidebar.css';
// import { assets } from '../../assets/assets';


// const Sidebar = ({ onNewChat }) => {
//     const [extended, setExtended] = useState(false);
   
//     return (
//       <div className="sidebar">
//         <div className="top">
//           <img onClick={() => setExtended(prev => !prev)} className="menu" src={assets.menu_icon} alt="menu" />
//           <div className="new-chat" onClick={onNewChat}>
//             <img src={assets.plus_icon} alt="new chat" />
//             {extended ? <p>New Chat</p> : null}
//           </div>
//         </div>
//         {extended ? (
//           <div className="recent">
//             <p className="recent-title">Recent</p>
//             <div className="recent-entry">
//               <img src={assets.message_icon} alt="recent message" />
//               <p>What is React ...</p>
//             </div>
//           </div>
//         ) : null}
//       </div>
//     );
//   };
  
//   export default Sidebar;
























import React, { useState, useEffect } from 'react';
import './sidebar.css';
import { assets } from '../../assets/assets';

const Sidebar = ({ onNewChat, onSelectChat, userId }) => {
    const [extended, setExtended] = useState(false);
    const [recentChats, setRecentChats] = useState([]);

    useEffect(() => {
        // Fetch recent chats when the component loads
        const fetchChats = async () => {
            if (!userId) return; // Ensure userId is available
            try {
                const response = await fetch('/api/chats', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId }) // Use dynamic userId
                });

                if (response.ok) {
                    const data = await response.json();
                    setRecentChats(data.chatList || []);
                } else {
                    console.error('Failed to fetch chats');
                }
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        fetchChats();
    }, [userId]); // Re-run whenever userId changes

    return (
        <div className="sidebar">
            <div className="top">
                <img
                    onClick={() => setExtended((prev) => !prev)}
                    className="menu"
                    src={assets.menu_icon}
                    alt="menu"
                />
                <div className="new-chat" onClick={onNewChat}>
                    <img src={assets.plus_icon} alt="new chat" />
                    {extended ? <p>New Chat</p> : null}
                </div>
            </div>
            {extended ? (
                <div className="recent">
                    <p className="recent-title">Recent</p>
                    {recentChats.map((chat) => (
                        <div
                            key={chat.sessionId}
                            className="recent-entry"
                            onClick={() => onSelectChat(chat.sessionId)}
                        >
                            <img src={assets.message_icon} alt="recent message" />
                            <p>{chat.title}</p>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default Sidebar;

























