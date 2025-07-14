import React, { useEffect, useState, useRef } from "react";
import { Layout, List, Input, Button, Avatar, Empty } from "antd";
import { getAllChats, getMessagesForUser } from "../../Services/chats";
import io from "socket.io-client";
import { formatDistanceToNow, differenceInSeconds } from "date-fns";
import { baseURL } from "../../API/baseUrl";

const { Content, Sider } = Layout;

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [adminId, setAdminId] = useState("");
  const [peopleList, setPeopleList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [socket, setSocket] = useState(null);

  const listRef = useRef(null);

  const chatUsers = async () => {
    try {
      let chats = await getAllChats();
      if (chats.data) {
        const filteredData = chats.data.data.map((item) => {
          const timeDifferenceInSeconds = differenceInSeconds(
            new Date(),
            new Date(item.t)
          );

          let formattedTime;
          if (timeDifferenceInSeconds < 5) {
            formattedTime = "just now";
          } else if (timeDifferenceInSeconds < 60) {
            formattedTime = "less than a minute ago";
          } else {
            formattedTime = formatDistanceToNow(new Date(item.t), {
              addSuffix: true,
              includeSeconds: true,
            });
          }

          return {
            chat_id: item._id,
            id: item.members[0]._id,
            name: item.members[0].personal_info.name,
            avatar:
              `${baseURL}/uploads/${item.members[0].personal_info.image}` ||
              "https://i.pravatar.cc/40?img=2",

            latest_msg: item.latest_msg,
            msg_time: formattedTime,
          };
        });
        setPeopleList(filteredData);
      }
    } catch (e) {
      console.error("Error fetching chat users:", e);
    }
  };

  const connectToChat = async (chatId) => {
    if (socket) {
      socket.disconnect();
      setMessages([]);
    }

    const token = localStorage.getItem("wasl_token");
    const admin_id = localStorage.getItem("wasl_admin");
    if (admin_id != null && adminId != undefined) {
      setAdminId(admin_id);
    }

    const newSocket = io(`https://wasl-chat.onrender.com`, {
      transports: ["websocket"],
      query: `token=${token}`,
    });

    console.log("🚀 ~ connectToChat ~ newSocket:", newSocket);

    // const newSocket = io(`https://waslchat.nascentinnovations.com`, {
    //   transports: ["websocket"],
    //   query: `token=${token}`,
    //   forceNew: true,
    // });

    // const newSocket = io(`https://abcchat.nascentinnovations.com`, {
    //   transports: ["websocket"],
    //   query: `token=${token}`,
    //   forceNew: true,
    // });

    newSocket.on("messages", (data) => {
      const admin_id = localStorage.getItem("wasl_admin");
      console.log("sss",data.from)
      const formattedMessages = [
        {
          text: data.message,
          sender: String(data.from) === admin_id ? "admin" : "user",
          images:data.images
        },
      ];
      setMessages((prevMessages) => [...prevMessages, ...formattedMessages]);
    });

    try {
      const userMessages = await getMessagesForUser(chatId);
      if (userMessages.data) {
        console.log("🚀 ~ connectToChat ~ userMessages.data:", userMessages.data)
        const admin_id = localStorage.getItem("wasl_admin");

        const formattedUserMessages = userMessages.data.data.map((msg) => ({
          text: msg.message,
          sender: String(msg.from) === admin_id ? "admin" : "user",
          images:msg.images
        }));
        setMessages((prevMessages) => [
          ...prevMessages,
          ...formattedUserMessages,
        ]);
      }
    } catch (error) {
      console.error("Error fetching old messages:", error);
    }

    setSocket(newSocket);
  };

  useEffect(() => {
    chatUsers();
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleServerResponse = (data) => {
      if (data.success) {
        // setMessages((prevMessages) => [
        //   ...prevMessages,
        //   { text: newMessage, sender: "admin" },
        // ]);
        setNewMessage("");
      } else {
        console.error("Message failed to send:", data.error);
      }
    };

    if (socket) {
      socket.on("chats", handleServerResponse);
      return () => {
        socket.off("chats", handleServerResponse);
      };
    }
  }, [socket, newMessage]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && socket) {
      console.log("🚀 ~ handleSendMessage ~ newMessage:", newMessage)
      
      socket.emit("chats", {
        message: newMessage,
        to: selectedChat.id,
        chatid: selectedChat.chat_id,
      });

      console.log("🚀 ~ handleSendMessage ~ newMessage:", newMessage);

    }

    setNewMessage("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

 const renderMessage = ({ text, sender, images = [] }) => (
  <List.Item style={{ textAlign: sender === "admin" ? "right" : "left" }}>
    <List.Item.Meta
      title={
        <div>
          {text && (
            <span style={{ color: sender === "admin" ? "#1890ff" : "#333" }}>
              {text}
            </span>
          )}
          {images && images.length > 0 && (
            <div style={{ marginTop: 8 }}>
              {images.map((img, index) => (
                <img
                  key={index}
                  src={`${baseURL}/uploads/${img}`}
                  alt={`message-img-${index}`}
                  style={{
                    maxWidth: 200,
                    margin: "4px 4px 0 0",
                    borderRadius: 8,
                    border: "1px solid #ddd"
                  }}
                />
              ))}
            </div>
          )}
        </div>
      }
    />
  </List.Item>
);

  const renderChatDetails = () => {
    if (selectedChat) {
      return (
        <div style={{ padding: "16px", background: "#fff",  display: "flex", alignItems: "center", boxShadow : "rgba(0, 0, 0, 0.1) 0px 0px 10px" }}>
          <Avatar src={selectedChat.avatar} size={64} style={{ marginRight: "16px" }} />
          <div>
            <h3>{selectedChat.name}</h3>
            {/* Add any additional details you want to display */}
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ padding: "16px", background: "#f0f2f5", borderRadius: "8px", textAlign: "center" }}>
          <Empty description="Select a chat to start messaging" />
        </div>
      );
    }
  };

  const handleUserClick = async (selectedUser) => {
    console.log("🚀 ~ handleUserClick ~ selectedUser:", selectedUser)
    setSelectedChat(selectedUser);
    await connectToChat(selectedUser.chat_id);
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };

  return (
    <Layout style={{ minHeight: "85vh",height:"80vh" }}>
      <Sider
        width={350}
        style={{
          background: "#fff",
          padding: "24px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          overflowY: "auto",
        }}
      >
        <List
          dataSource={peopleList}
          renderItem={(person) => (
            <List.Item onClick={() => handleUserClick(person)}>
              <div className="chat-item">
                <div className="profile">
                  <img src={person.avatar} alt="Profile" />
                </div>
                <div className="details">
                  <div className="name-time">
                    <span className="name">{person.name}</span>
                    <span className="time">{person.msg_time}</span>
                  </div>
                  <div className="last-message">{person.latest_msg}</div>
                </div>
              </div>
            </List.Item>
          )}
        />
      </Sider>
      <Layout style={{ overflow: "hidden" }}>
        <Content
        className="chat-content"
          style={{
            padding: "0px 10px 0px 24px",
            overflowY: "auto",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {renderChatDetails()}
          <div
            ref={listRef}
            style={{
              background: "#ffff",
              padding: "16px",
              flex: 1,
              borderRadius: "0 8px 8px 0",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              overflowY: "auto",
              marginTop: "16px",
              maxHeight: "70vh", // Set the maximum height for the scroll
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={messages}
              renderItem={renderMessage}
              key={(item, index) => index.toString()}
            />
          </div>
          {selectedChat && (
            <div
              style={{
                margin: "16px 0px 0px 0px",
                borderRadius: "0 8px 8px 0",
                padding: "16px",
                borderTop: "1px solid #e8e8e8",
                background: "#fff",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{
                  flex: 1,
                  marginRight: "8px",
                  padding: "12px 11px",
                  fontSize: "15px",
                }}
              />
              <Button
                type="primary"
                onClick={handleSendMessage}
                style={{
                  margin: "0px",
                  padding: "5px 5px",
                  width: "100px",
                  height: "50px",
                  fontSize: "16px",
                  background: "#128C7E",
                  border: "none",
                }}
              >
                Send
              </Button>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChatPage;
