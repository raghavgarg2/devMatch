<<<<<<< HEAD
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { createSocketConnection } from "../utils/socket";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";

// const Chat = () => {
//   const {id}= useParams();
//   const targetUserId = id;


//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const user = useSelector((store) => store.user);
//   const userId = user?._id;

//   const fetchChatMessages = async () => {
//     const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
//       withCredentials: true,
//     });

//     // console.log(chat.data.messages);

//     const chatMessages = chat?.data?.messages.map((msg) => {
//       const { senderId, text } = msg;
//       return {
//         firstName: senderId?.firstName,
//         lastName: senderId?.lastName,
//         text,
//       };
//     });
//     setMessages(chatMessages);
//   };
//   useEffect(() => {
//     fetchChatMessages();
//   }, []);

//   useEffect(() => {
//     if (!userId) {
//       return;
//     }
//     const socket = createSocketConnection();
//     // As soon as the page loaded, the socket connection is made and joinChat event is emitted
//     socket.emit("joinChat", {
//       firstName: user.firstName,
//       userId,
//       targetUserId,
//     });

//     socket.on("messageReceived", ({ firstName, lastName, text }) => {
//     //   console.log(firstName + " :  " + text);
//       setMessages((messages) => [...messages, { firstName, lastName, text }]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId, targetUserId]);

//   const sendMessage = () => {
//     const socket = createSocketConnection();
//     socket.emit("sendMessage", {
//       firstName: user.firstName,
//       lastName: user.lastName,
//       userId,
//       targetUserId,
//       text: newMessage,
//     });
//     setNewMessage("");
//   };

//   return (
//     <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
//       <h1 className="p-5 border-b border-gray-600">Chat</h1>
//       <div className="flex-1 overflow-scroll p-5">
//         {messages.map((msg, index) => {
//           return (
//             <div
//               key={index}
//               className={
//                 "chat " +
//                 (user.firstName === msg.firstName ? "chat-end" : "chat-start")
//               }
//             >
//               <div className="chat-header">
//                 {`${msg.firstName}  ${msg.lastName}`}
//                 <time className="text-xs opacity-50"> 2 hours ago</time>
//               </div>
//               <div className="chat-bubble">{msg.text}</div>
//               <div className="chat-footer opacity-50">Seen</div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="p-5 border-t border-gray-600 flex items-center gap-2">
//         <input
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="flex-1 border border-gray-500 text-white rounded p-2"
//         ></input>
//         <button onClick={sendMessage} className="btn btn-secondary">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };
// export default Chat;


import { useEffect, useState } from "react";
=======
import { useEffect, useState, useRef } from "react";
>>>>>>> d2ec1b8 (fixing ui)
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { id } = useParams();
  const targetUserId = id;
<<<<<<< HEAD

=======
>>>>>>> d2ec1b8 (fixing ui)
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
<<<<<<< HEAD
=======
  const chatEndRef = useRef(null);
>>>>>>> d2ec1b8 (fixing ui)

  const fetchChatMessages = async () => {
    try {
      console.log("📥 Fetching chat messages...");
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

<<<<<<< HEAD
      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
        };
      });
=======
      const chatMessages = chat?.data?.messages.map((msg) => ({
        firstName: msg.senderId?.firstName,
        lastName: msg.senderId?.lastName,
        text: msg.text,
      }));
>>>>>>> d2ec1b8 (fixing ui)

      setMessages(chatMessages);
      console.log("✅ Chat messages loaded:", chatMessages);
    } catch (error) {
      console.error("❌ Error fetching chat messages:", error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    console.log("🔌 Connecting socket...");

<<<<<<< HEAD
    // Join Chat
=======
>>>>>>> d2ec1b8 (fixing ui)
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });
<<<<<<< HEAD
    console.log("📢 joinChat event emitted:", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    // Listen for new messages
    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log("📩 Message received from server:", { firstName, lastName, text });
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
=======

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log("📩 Message received:", { firstName, lastName, text });
      setMessages((prev) => [...prev, { firstName, lastName, text }]);
>>>>>>> d2ec1b8 (fixing ui)
    });

    return () => {
      console.log("❌ Disconnecting socket...");
      socket.disconnect();
    };
  }, [userId, targetUserId]);

<<<<<<< HEAD
  const sendMessage = () => {
    if (!newMessage.trim()) {
      console.warn("⚠️ Cannot send an empty message!");
      return;
    }

    const socket = createSocketConnection();
    console.log("📢 Sending message:", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
=======
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();
    console.log("📢 Sending message:", { userId, targetUserId, text: newMessage });
>>>>>>> d2ec1b8 (fixing ui)

    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
<<<<<<< HEAD
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              "chat " +
              (user.firstName === msg.firstName ? "chat-end" : "chat-start")
            }
          >
            <div className="chat-header">
              {`${msg.firstName}  ${msg.lastName}`}
=======
      <div className="flex-1 overflow-auto p-5">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${user.firstName === msg.firstName ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-header">
              {`${msg.firstName} ${msg.lastName}`}
>>>>>>> d2ec1b8 (fixing ui)
              <time className="text-xs opacity-50"> 2 hours ago</time>
            </div>
            <div className="chat-bubble">{msg.text}</div>
            <div className="chat-footer opacity-50">Seen</div>
          </div>
        ))}
<<<<<<< HEAD
=======
        <div ref={chatEndRef} />
>>>>>>> d2ec1b8 (fixing ui)
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        />
<<<<<<< HEAD
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
=======
        <button onClick={sendMessage} className="btn btn-secondary">Send</button>
>>>>>>> d2ec1b8 (fixing ui)
      </div>
    </div>
  );
};

export default Chat;
<<<<<<< HEAD


=======
>>>>>>> d2ec1b8 (fixing ui)
