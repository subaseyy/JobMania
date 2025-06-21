"use client";
import { useState, useEffect } from "react";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  ArrowLeft,
  Search,
} from "lucide-react";
import Image from "next/image";

// Expanded mock data with 15 users (some with messages)
const mockConversations = [
  {
    id: 1,
    name: "Jan Meyer",
    avatar: "/api/placeholder/32/32",
    role: "Recruiter at Nomad",
    lastMessage: "I'd be happy to invite you for a...",
    time: "12 mins ago",
    messages: [
      {
        id: 1,
        sender: "Jan Meyer",
        content: "Hey John, we saw your work and were impressed...",
        time: "12:30 PM",
        isUser: false,
      },
      {
        id: 2,
        content: "We want to invite you for a quick interview.",
        time: "12:32 PM",
        isUser: false,
      },
      {
        id: 3,
        content: "Hi Jan, I would love to. Thanks for reaching out!",
        time: "12:35 PM",
        isUser: true,
      },
    ],
  },
  {
    id: 2,
    name: "Joe Bartmann",
    avatar: "/api/placeholder/32/32",
    lastMessage: "Hey thanks for your interview...",
    time: "2:40 PM",
    messages: [],
  },
  {
    id: 3,
    name: "Ally Rolex",
    avatar: "/api/placeholder/32/32",
    lastMessage: "Thanks for your interview...",
    time: "3:45 PM",
    messages: [],
  },
  {
    id: 4,
    name: "Lara Croft",
    avatar: "/api/placeholder/32/32",
    lastMessage: "Can we reschedule our meeting?",
    time: "1 hr ago",
    messages: [
      {
        id: 1,
        sender: "Lara Croft",
        content: "Hi, can we reschedule our meeting to tomorrow?",
        time: "4:30 PM",
        isUser: false,
      },
    ],
  },
  {
    id: 5,
    name: "Mark Twain",
    avatar: "/api/placeholder/32/32",
    lastMessage: "Looking forward to your presentation.",
    time: "Yesterday",
    messages: [],
  },
  {
    id: 6,
    name: "Nina Simone",
    avatar: "/api/placeholder/32/32",
    lastMessage: "Thanks for the update!",
    time: "Yesterday",
    messages: [],
  },
  {
    id: 7,
    name: "Paul Atreides",
    avatar: "/api/placeholder/32/32",
    lastMessage: "Have you seen the latest report?",
    time: "3 days ago",
    messages: [],
  },
  {
    id: 8,
    name: "Diana Prince",
    avatar: "/api/placeholder/32/32",
    lastMessage: "Let's catch up next week.",
    time: "4 days ago",
    messages: [],
  },
  {
    id: 9,
    name: "Bruce Wayne",
    avatar: "/api/placeholder/32/32",
    lastMessage: "The meeting is confirmed.",
    time: "5 days ago",
    messages: [],
  },
  {
    id: 10,
    name: "Clark Kent",
    avatar: "/api/placeholder/32/32",
    lastMessage: "I'll send the documents soon.",
    time: "1 week ago",
    messages: [],
  },
  {
    id: 11,
    name: "Selina Kyle",
    avatar: "/api/placeholder/32/32",
    lastMessage: "Got your message.",
    time: "1 week ago",
    messages: [],
  },
  {
    id: 12,
    name: "Barry Allen",
    avatar: "/api/placeholder/32/32",
    lastMessage: "Speed is of the essence!",
    time: "2 weeks ago",
    messages: [],
  },
  {
    id: 13,
    name: "Tony Stark",
    avatar: "/api/placeholder/32/32",
    lastMessage: "Let's build something amazing.",
    time: "2 weeks ago",
    messages: [],
  },
  {
    id: 14,
    name: "Steve Rogers",
    avatar: "/api/placeholder/32/32",
    lastMessage: "I'm ready to lead.",
    time: "3 weeks ago",
    messages: [],
  },
  {
    id: 15,
    name: "Natasha Romanoff",
    avatar: "/api/placeholder/32/32",
    lastMessage: "Mission accomplished.",
    time: "3 weeks ago",
    messages: [],
  },
];

// Mock socket (unchanged)
const mockSocket = {
  connected: false,
  events: {},
  connect() {
    this.connected = true;
    console.log("Socket connected");
    return this;
  },
  on(event, callback) {
    this.events[event] = callback;
    return this;
  },
  emit(event, data, callback) {
    console.log(`Socket emitting: ${event}`, data);
    if (event === "send_message" && this.events["receive_message"]) {
      setTimeout(() => {
        this.events["receive_message"]({
          id: Date.now(),
          conversationId: data.conversationId,
          content: data.content,
          sender: "You",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isUser: true,
        });
        callback?.();
      }, 300);
    }
    return this;
  },
  disconnect() {
    this.connected = false;
    console.log("Socket disconnected");
  },
};

export default function Messages() {
  const [conversations, setConversations] = useState(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState(
    mockConversations[0].id
  );
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showConversationList, setShowConversationList] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  useEffect(() => {
    const newSocket = mockSocket.connect();
    setSocket(newSocket);

    newSocket.on("receive_message", (newMessage) => {
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === newMessage.conversationId
            ? {
                ...conv,
                messages: [...(conv.messages || []), newMessage],
                lastMessage: newMessage.content,
                time: newMessage.time,
              }
            : conv
        )
      );
    });

    const checkMobile = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobile(isMobile);
      if (!isMobile) {
        setShowConversationList(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      newSocket.disconnect();
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleSendMessage = () => {
    if (!message.trim() || !socket) return;

    socket.emit("send_message", {
      conversationId: activeConversation.id,
      content: message,
    });

    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectConversation = (conversation) => {
    setActiveConversationId(conversation.id);
    if (isMobile) setShowConversationList(false);
  };

  const backToConversations = () => {
    setShowConversationList(true);
  };

  return (
    <div className="flex h-screen sm:max-h-[80vh] bg-gray-100">
      {/* Sidebar */}
      {(showConversationList || !isMobile) && (
        <div
          className={`${
            isMobile ? "w-full" : "w-1/3"
          } flex flex-col bg-white border-r`}
        >
          <div className="p-4 border-b">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search messages"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 pl-10 pr-4 py-2 font-epilogue font-[400] text-base leading-[160%] text-[#A8ADB7] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div
            className="overflow-y-auto flex-1"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {conversations
              .filter((c) =>
                c.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex items-start p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    activeConversation?.id === conversation.id
                      ? "bg-blue-50"
                      : ""
                  }`}
                  onClick={() => selectConversation(conversation)}
                >
                  <Image
                    src={conversation.avatar}
                    height={32}
                    width={32}
                    alt={conversation.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-epilogue font-[600] text-base leading-[160%] text-[#25324B] truncate">
                        {conversation.name}
                      </h3>
                      <span className="font-epilogue font-[400] text-base leading-[160%] text-[#7C8493]">
                        {conversation.time}
                      </span>
                    </div>
                    {conversation.role && (
                      <p className="font-epilogue font-[400] text-base leading-[160%] text-[#25324B]">
                        {conversation.role}
                      </p>
                    )}
                    <p className="font-epilogue font-[400] text-base leading-[160%] text-[#515B6F] truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Chat Window */}
      {(!showConversationList || !isMobile) && activeConversation && (
        <div className={`${isMobile ? "w-full" : "w-2/3"} flex flex-col`}>
          {/* Header */}
          <div className="flex items-center p-4 border-b bg-white">
            {isMobile && (
              <button onClick={backToConversations} className="mr-2">
                <ArrowLeft size={20} />
              </button>
            )}
            <img
              src={activeConversation.avatar}
              alt={activeConversation.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-1">
              <h3 className="font-epilogue font-[600] text-base leading-[160%] text-[#25324B]">
                {activeConversation.name}
              </h3>
              {activeConversation.role && (
                <p className="font-epilogue font-[400] text-base leading-[160%] text-[#25324B]">
                  {activeConversation.role}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Phone
                className="text-[#25324B] hover:text-[#4640DE]"
                size={20}
              />
              <Video
                className="text-[#25324B] hover:text-[#4640DE]"
                size={20}
              />
              <MoreVertical
                className="text-[#25324B] hover:text-[#4640DE]"
                size={20}
              />
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto p-4 bg-gray-50"
            style={{ maxHeight: "calc(80vh - 136px)" }}
          >
            <div className="flex flex-col space-y-4">
              {activeConversation.messages?.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.isUser ? "justify-end" : "justify-start"
                  } items-end gap-2`}
                >
                  {!msg.isUser && (
                    <Image
                      src={activeConversation.avatar}
                      alt={msg.sender || activeConversation.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full order-1"
                    />
                  )}
                  <div
                    className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                      msg.isUser
                        ? "bg-[#F8F8FD] text-white rounded-br-none border order-2"
                        : "bg-[#F8F8FD] text-gray-800 rounded-bl-none border order-2"
                    }`}
                  >
                    <p className="font-epilogue font-[500] text-base leading-[160%] text-[#515B6F]">
                      {msg.content}
                    </p>
                    <div
                      className={`text-xs mt-1 ${
                        msg.isUser ? "text-blue-200" : "text-gray-500"
                      } text-right`}
                    >
                      {msg.time}
                    </div>
                  </div>
                  {msg.isUser && (
                    <Image
                      src="/api/placeholder/32/32?user"
                      alt="You"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full order-3"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="p-4 border-t bg-white">
            <div className="flex items-center">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-full py-2 px-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className={`ml-2 rounded-full p-2 ${
                  message.trim()
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
