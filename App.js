import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('chats');
  const [activeChat, setActiveChat] = useState('ahmed');
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [callType, setCallType] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [callSeconds, setCallSeconds] = useState(0);
  const [callStatus, setCallStatus] = useState('calling');
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [mood, setMood] = useState('happy');
  const [notifications, setNotifications] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'You',
    status: 'Available',
    mood: 'happy',
    bio: 'Living life one chat at a time 😊'
  });
  const messagesEndRef = useRef(null);
  const recordingIntervalRef = useRef(null);
  const callIntervalRef = useRef(null);

  const fakeReplies = [
    'That sounds great! 😊',
    'I totally agree with you! 👍',
    'Absolutely! 🎉',
    'Let me think about that 🤔',
    'Looking forward to it! 🙌',
    'Perfect! 💯',
    'No worries, all good! ✨',
    'Haha, nice one! 😂',
    'Thanks for letting me know! 👋',
    'See you soon! 🚀'
  ];

  // Smart AI Response Generator - Context-aware answers
  const generateSmartAIResponse = (userMessage, chatPersonName = 'AI Assistant') => {
    const msg = userMessage.toLowerCase().trim();
    
    // Personalization based on who is replying
    const getPersonalizedGreeting = () => {
      if (chatPersonName.includes('Ahmed')) return 'Bro, ';
      if (chatPersonName.includes('Fatima')) return 'Hey! ';
      if (chatPersonName.includes('Ali')) return 'Buddy, ';
      if (chatPersonName.includes('Zara')) return 'Hi! ';
      if (chatPersonName.includes('Hassan')) return 'Hey there, ';
      if (chatPersonName.includes('Ayesha')) return 'Hey! ';
      return 'Hey! ';
    };
    
    const personalization = getPersonalizedGreeting();
    const isAI = chatPersonName === 'AI Assistant';
    
    // Greeting related
    if (msg.match(/^(hello|hi|hey|assalam|salam|assalamu|السلام)/i)) {
      if (isAI) return 'Assalam o alaikum! 👋 I\'m your AI Assistant. How can I help you today?';
      return personalization + 'I\'m doing great! How about you? 😊';
    }
    
    // Time & Schedule related
    if (msg.match(/time|what time|when|what\'s the time|current time/i)) {
      const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      if (isAI) return `The current time is ${currentTime}. 🕐 What else do you need?`;
      return `It's ${currentTime} right now! ⏰ Why, do you have somewhere to be?`;
    }
    
    // Date related
    if (msg.match(/date|today|what day|what\'s today/i)) {
      const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      if (isAI) return `Today is ${today}. 📅 Anything you\'d like to plan for today?`;
      return `Today's ${today}. 📅 Got any plans?`;
    }
    
    // Help & General Questions
    if (msg.match(/help|can you help|i need help|assist/i)) {
      if (isAI) return 'Of course! I\'m here to help. 💪 What do you need assistance with? Please describe your issue or question in detail.';
      return personalization + 'Of course, I\'ll help! What\'s the issue? 💪';
    }
        // Coffee recipe specific
    if (msg.match(/how to make coffee|coffee recipe|make coffee|prepare coffee/i)) {
      const coffeeRecipes = [
        '☕ **BLACK COFFEE** (Simplest):\n1. Heat water to 90-96°C\n2. Use 1 tablespoon coffee per cup\n3. Pour hot water over coffee grounds\n4. Wait 4-5 minutes\n5. Pour into cup\n✨ Serve immediately!',
        '🥛 **CAPPUCCINO**:\n1. Heat 1 cup milk\n2. Brew 1-2 shots espresso\n3. Steam the milk until foamy\n4. Pour espresso into cup\n5. Add steamed milk + foam (1:1 ratio)\n✨ Top with cocoa powder!',
        '🍶 **ICED COFFEE**:\n1. Brew strong coffee (double strength)\n2. Pour into glass with ice cubes\n3. Add cold milk or cream\n4. Add 1-2 teaspoons sugar (optional)\n5. Stir well\n✨ Add a straw!',
        '🎂 **LATTE**:\n1. Brew 1-2 shots espresso\n2. Steam 1 cup milk until smooth\n3. Pour espresso into cup\n4. Add steamed milk (4:1 ratio)\n5. Top with small amount of foam\n✨ Creamy & smooth!'
      ];
      const recipe = coffeeRecipes[Math.floor(Math.random() * coffeeRecipes.length)];
      if (isAI) return recipe;
      return personalization + 'Great choice! Here\'s how to make it:\n\n' + recipe;
    }
    // How to / Instructions
    if (msg.match(/how to|how do i|how can i|teach me|guide me/i)) {
      if (isAI) return 'Great! I\'d love to guide you through that. 📚 Can you tell me specifically what you want to learn or what task you\'re trying to accomplish?';
      return personalization + 'I can show you! What exactly do you want to learn? 📚';
    }
    
    // What is / Definitions
    if (msg.match(/what is|what are|what\'s|define|meaning of|explain/i)) {
      if (isAI) return 'Great question! 🤔 What would you like to know about?';
      return personalization + 'That\'s a good question! I can explain it. 🤔 What topic?';
    }
    
    // Weather related
    if (msg.match(/weather|rain|temperature|cold|hot|climate|forecast/i)) {
      if (isAI) return 'I don\'t have real-time weather data. 🌤️ I recommend checking a weather app or website for your location. What city are you in?';
      return personalization + 'I don\'t have live weather updates, but you can check Google Weather! 🌤️';
    }
    
    // Project/Work/Task related
    if (msg.match(/project|work|task|deadline|assignment|job|code/i)) {
      if (isAI) return 'Excellent! I can definitely help with that. 💼 Please tell me more details about your project - what you\'re working on and where you need help?';
      return personalization + 'Cool! Tell me more about what you\'re working on. 💼';
    }
    
    // Meeting/Schedule related
    if (msg.match(/meeting|schedule|appointment|calendar|booking|reserve/i)) {
      if (isAI) return 'Perfect! 📅 I\'d be happy to help you schedule that. What time works best for you, and who else should be involved?';
      return personalization + 'Let\'s schedule it! When are you free? 📅';
    }
    
    // Name/Identity
    if (msg.match(/what\'s your name|who are you|what is your name|your name/i)) {
      if (isAI) return 'I\'m your AI Assistant! 🤖 I\'m here to help you with questions, tasks, and anything else you need. What can I assist you with?';
      return 'It\'s me, ' + chatPersonName + '! 😄 You already know who I am!';
    }
    
    // Thanks/Appreciation
    if (msg.match(/thanks|thank you|appreciate|grateful|thx|ty/i)) {
      if (isAI) return 'You\'re welcome! 😊 Happy to assist. Is there anything else I can help you with?';
      return personalization + 'No problem! Always happy to help! 😊';
    }
    
    // Jokes/Fun
    if (msg.match(/joke|funny|make me laugh|laugh|humor/i)) {
      const jokes = [
        'Why don\'t scientists trust atoms? Because they make up everything! 😄',
        'I told my computer I needed a break, and now it won\'t stop sending me Kit-Kat ads! 🤖',
        'Why did the coffee file a police report? It got mugged! ☕',
        'Why do programmers prefer dark mode? Because light attracts bugs! 💻',
        'How many programmers does it take to change a light bulb? None, that\'s a hardware problem! 💡'
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
    
    // How are you / Status
    if (msg.match(/how are you|how\'s it going|how\'s things|sup|what\'s up/i)) {
      if (isAI) return 'I\'m doing great, thanks for asking! 😄 I\'m ready to help you with anything you need. What can I do for you?';
      return personalization + 'I\'m doing good! What about you? 😄';
    }
    
    // Yes/No confirmation
    if (msg === 'yes' || msg === 'yeah' || msg === 'yep') {
      if (isAI) return 'Great! What would you like me to help you with next? 👍';
      return personalization + 'Awesome! 👍';
    }
    if (msg === 'no' || msg === 'nope') {
      if (isAI) return 'No problem! Is there something else I can help you with instead? 😊';
      return personalization + 'All good! Let me know if you need anything. 😊';
    }
    
    // Default context-aware response
    if (msg.length > 0) {
      const keywords = msg.split(' ').slice(0, 3).join(' ');
      if (isAI) return `That\'s interesting! 👍 So you\'re asking about "${keywords}". Could you provide more details so I can give you a better answer?`;
      return personalization + `Interesting! Tell me more about "${keywords}"? 👂`;
    }
    
    return personalization + 'What\'s up? 😊';
  };

  const aiReplies = [
    'That\'s interesting! I can help you with that.',
    'I understand. What would you like to know more about?',
    'Great question! Let me think about it.',
    'I can assist you with that right away.',
    'That\'s a good point! Here\'s what I think...',
    'Would you like more information about this?',
    'I agree! Is there anything else you\'d like to discuss?',
    'Interesting perspective! I have some thoughts on this.'
  ];

  const allContacts = [
    { id: 'ahmed', name: 'Ahmed Khan', avatar: 'AK', type: 'chats', lastMessage: 'Great! Let\'s meet up soon', time: '10:32 AM', unread: 2, status: 'Online' },
    { id: 'fatima', name: 'Fatima Ali', avatar: 'FA', type: 'chats', lastMessage: 'Yes, just finished it!', time: '9:15 AM', unread: 0, status: 'Last seen 5m ago' },
    { id: 'ali', name: 'Ali Hassan', avatar: 'AH', type: 'chats', lastMessage: 'Hi Ali! How\'s it going?', time: '8:45 AM', unread: 1, status: 'Online' },
    { id: 'zara', name: 'Zara Malik', avatar: 'ZM', type: 'chats', lastMessage: 'Thanks for the update!', time: '7:30 AM', unread: 0, status: 'Last seen 1h ago' },
    { id: 'Hassan', name: 'Hassan Raza', avatar: 'HR', type: 'chats', lastMessage: 'See you tomorrow!', time: '6:45 AM', unread: 0, status: 'Online' },
    { id: 'ayesha', name: 'Ayesha Ahmed', avatar: 'AA', type: 'chats', lastMessage: 'Perfect timing!', time: '5:30 AM', unread: 0, status: 'Last seen 2h ago' },
    { id: 'group1', name: 'Development Team', avatar: 'DT', type: 'groups', members: 12, lastMessage: 'Meeting at 3 PM!', time: '9:00 AM', status: '12 members' },
    { id: 'group2', name: 'Friends Forever', avatar: 'FF', type: 'groups', members: 8, lastMessage: 'Trip planning discussion', time: '8:30 AM', status: '8 members' },
    { id: 'group3', name: 'Office Group', avatar: 'OG', type: 'groups', members: 15, lastMessage: 'Project deadline extended', time: '7:15 AM', status: '15 members' },
    { id: 'channel1', name: 'Tech News', avatar: 'TN', type: 'channels', subscribers: 5000, lastMessage: 'Latest tech updates', time: '11:00 AM', status: '5K subscribers' },
    { id: 'channel2', name: 'Web Development', avatar: 'WD', type: 'channels', subscribers: 3200, lastMessage: 'React tips and tricks', time: '10:30 AM', status: '3.2K subscribers' },
    { id: 'channel3', name: 'Pakistan Updates', avatar: 'PU', type: 'channels', subscribers: 8500, lastMessage: 'Breaking news', time: '9:45 AM', status: '8.5K subscribers' },
    { id: 'ai', name: 'AI Assistant', avatar: '🤖', type: 'ai', lastMessage: 'Ask me anything!', time: 'Always', status: 'Online 24/7' }
  ];

  const getChatInfo = (chatId) => {
    return allContacts.find(c => c.id === chatId) || { name: 'Chat', avatar: 'C', status: '' };
  };

  const [messages, setMessages] = useState({
    ahmed: [
      { id: 1, text: 'Assalam o alaikum! How are you?', sender: 'other', timestamp: '10:30 AM', status: 'read' },
      { id: 2, text: 'Wa alaikum assalam! I am good, thanks!', sender: 'user', timestamp: '10:31 AM', status: 'read' },
      { id: 3, text: 'Great! Let\'s meet up soon', sender: 'other', timestamp: '10:32 AM', status: 'read' }
    ],
    fatima: [
      { id: 1, text: 'Did you complete the project?', sender: 'other', timestamp: '9:15 AM', status: 'read' },
      { id: 2, text: 'Yes, just finished it!', sender: 'user', timestamp: '9:20 AM', status: 'read' }
    ],
    ali: [
      { id: 1, text: 'Hey buddy!', sender: 'other', timestamp: '8:45 AM', status: 'read' },
      { id: 2, text: 'Hi Ali! How\'s it going?', sender: 'user', timestamp: '8:50 AM', status: 'read' }
    ],
    zara: [
      { id: 1, text: 'The meeting is rescheduled', sender: 'other', timestamp: '7:30 AM', status: 'read' },
      { id: 2, text: 'Thanks for the update!', sender: 'user', timestamp: '7:35 AM', status: 'read' }
    ],
    ai: [
      { id: 1, text: 'Hello! I\'m your AI Assistant. How can I help you today?', sender: 'other', timestamp: '12:00 PM', user: 'AI Assistant', status: 'read' }
    ],
    group1: [
      { id: 1, text: 'Everyone, meeting at 3 PM!', sender: 'other', timestamp: '09:00 AM', user: 'Admin', status: 'read' },
      { id: 2, text: 'Got it! See you then', sender: 'user', timestamp: '09:05 AM', status: 'read' }
    ]
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeChat, activeTab, isTyping]);

  // Call timer
  useEffect(() => {
    if (showCallModal) {
      setCallSeconds(0);
      setCallStatus('calling');
      const statusTimer = setTimeout(() => setCallStatus('connected'), 3000);
      callIntervalRef.current = setInterval(() => {
        setCallSeconds(s => s + 1);
      }, 1000);
      return () => {
        clearTimeout(statusTimer);
        clearInterval(callIntervalRef.current);
      };
    }
  }, [showCallModal]);

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      recordingIntervalRef.current = setInterval(() => {
        setRecordingSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(recordingIntervalRef.current);
    }
    return () => clearInterval(recordingIntervalRef.current);
  }, [isRecording]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const text = inputValue.trim();
    setInputValue('');

    setMessages(prev => {
      const current = prev[activeChat] || [];
      const newMsg = {
        id: Date.now(),
        text,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };
      return { ...prev, [activeChat]: [...current, newMsg] };
    });

    // Simulate delivered after 1s
    setTimeout(() => {
      setMessages(prev => {
        const current = prev[activeChat] || [];
        const updated = current.map(m =>
          m.sender === 'user' && m.status === 'sent' ? { ...m, status: 'delivered' } : m
        );
        return { ...prev, [activeChat]: updated };
      });
    }, 1000);

    // Simulate read after 2.5s
    setTimeout(() => {
      setMessages(prev => {
        const current = prev[activeChat] || [];
        const updated = current.map(m =>
          m.sender === 'user' && m.status === 'delivered' ? { ...m, status: 'read' } : m
        );
        return { ...prev, [activeChat]: updated };
      });
    }, 2500);

    // Show typing indicator
    setIsTyping(true);

    // Simulate reply
    setTimeout(() => {
      setIsTyping(false);
      const personName = getChatInfo(activeChat).name;
      const randomReply = generateSmartAIResponse(text, personName);
      
      setMessages(prev => {
        const current = prev[activeChat] || [];
        const replyMsg = {
          id: Date.now() + 1,
          text: randomReply,
          sender: 'other',
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          user: personName,
          status: 'read'
        };
        return { ...prev, [activeChat]: [...current, replyMsg] };
      });
    }, 2000 + Math.random() * 1500);
  };

  const handleVoiceMessage = () => {
    setShowVoiceModal(true);
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    const duration = recordingSeconds > 0 ? recordingSeconds : Math.floor(Math.random() * 59) + 1;
    setMessages(prev => {
      const current = prev[activeChat] || [];
      const voiceMsg = {
        id: Date.now(),
        text: '',
        voiceDuration: duration,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };
      return { ...prev, [activeChat]: [...current, voiceMsg] };
    });
    setShowVoiceModal(false);
  };

  const handleCall = (type) => {
    setCallType(type);
    setShowCallModal(true);
  };

  const handleEndCall = () => {
    setShowCallModal(false);
    setCallType('');
    setIsMuted(false);
    setIsSpeakerOn(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredContacts = allContacts.filter(c => {
    if (c.type !== activeTab) return false;
    return c.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const currentChatInfo = getChatInfo(activeChat);

  const renderContactItem = (item) => {
    const isActive = activeChat === item.id;
    const isGroup = item.type === 'groups';
    const isChannel = item.type === 'channels';
    const isAi = item.type === 'ai';

    return (
      <div
        key={item.id}
        className={`contact-item ${isActive ? 'active' : ''}`}
        onClick={() => setActiveChat(item.id)}
      >
        <div className={`contact-avatar ${isGroup ? 'group' : ''} ${isAi ? 'ai' : ''}`}>
          {item.avatar}
        </div>
        <div className="contact-info">
          <div className="contact-header">
            <h3>{item.name}</h3>
            <span className="time">{item.time}</span>
          </div>
          <p>
            {isGroup && `${item.members} members • `}
            {isChannel && `${item.subscribers.toLocaleString()} subscribers • `}
            {item.lastMessage}
          </p>
        </div>
        {item.unread > 0 && <div className="unread-badge">{item.unread}</div>}
      </div>
    );
  };

  const getStatusIcon = (status) => {
    if (status === 'sent') return <span className="tick grey">✓</span>;
    if (status === 'delivered') return <span className="tick grey">✓✓</span>;
    if (status === 'read') return <span className="tick blue">✓✓</span>;
    return null;
  };

  return (
    <div className={`chat-container ${theme}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Chat UI</h2>
          <div className="sidebar-icons">
            <button className="icon-btn" title="Create Group" onClick={() => setShowCreateGroup(!showCreateGroup)}>
              <span>➕</span>
            </button>
            <button className="icon-btn" title="Settings" onClick={() => setShowSettings(!showSettings)}>
              <span>⋮</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button className={`tab-btn ${activeTab === 'chats' ? 'active' : ''}`} onClick={() => setActiveTab('chats')}>
            💬 Chats
          </button>
          <button className={`tab-btn ${activeTab === 'channels' ? 'active' : ''}`} onClick={() => setActiveTab('channels')}>
            📢 Channels
          </button>
          <button className={`tab-btn ${activeTab === 'groups' ? 'active' : ''}`} onClick={() => setActiveTab('groups')}>
            👥 Groups
          </button>
          <button className={`tab-btn ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => { setActiveTab('ai'); setActiveChat('ai'); }}>
            🤖 AI
          </button>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <span className="search-clear" onClick={() => setSearchQuery('')}>✕</span>
          )}
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="settings-panel">
            <div className="settings-item" onClick={() => setShowProfile(!showProfile)}>
              👤 Profile
            </div>
            <div className="settings-item" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </div>
            <div className="settings-item" onClick={() => setNotifications(!notifications)}>
              📱 Notifications: <span>{notifications ? 'On' : 'Off'}</span>
            </div>
            <div className="settings-item" onClick={() => setBlocked(!blocked)}>
              🚫 Blocked: <span>{blocked ? 'Yes' : 'No'}</span>
            </div>
            <div className="settings-item">
              😊 Mood: <span>{mood}</span>
            </div>
          </div>
        )}

        {/* Profile Panel */}
        {showProfile && (
          <div className="profile-panel">
            <div className="profile-avatar-large">{userProfile.name.charAt(0)}</div>
            <h3>{userProfile.name}</h3>
            <p className="status-text">{userProfile.status}</p>
            <p className="bio-text">"{userProfile.bio}"</p>
            <div className="mood-selector">
              <label>Set Mood:</label>
              <select value={mood} onChange={(e) => { setMood(e.target.value); setUserProfile({ ...userProfile, mood: e.target.value }); }}>
                <option value="happy">😊 Happy</option>
                <option value="sad">😢 Sad</option>
                <option value="angry">😠 Angry</option>
                <option value="busy">😤 Busy</option>
                <option value="offline">🛑 Offline</option>
              </select>
            </div>
            <button className="notification-toggle" onClick={() => setNotifications(!notifications)}>
              {notifications ? '🔔 Notifications ON' : '🔕 Notifications OFF'}
            </button>
          </div>
        )}

        {/* Create Group */}
        {showCreateGroup && (
          <div className="create-group-panel">
            <h4>Create Group</h4>
            <input type="text" placeholder="Group name..." />
            <textarea placeholder="Group description..."></textarea>
            <button className="create-btn">Create</button>
          </div>
        )}

        {/* Contacts List */}
        <div className="contacts-list">
          {filteredContacts.length > 0 ? (
            filteredContacts.map(renderContactItem)
          ) : (
            <div className="no-results">No contacts found</div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-main">
        {/* Header */}
        <div className="chat-header">
          <div className="header-info">
            <div className="header-avatar">{currentChatInfo.avatar}</div>
            <div>
              <h2>{currentChatInfo.name}</h2>
              <p className="status">
                {isTyping ? (
                  <span className="typing-text">typing<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></span>
                ) : (
                  currentChatInfo.status
                )}
              </p>
            </div>
          </div>
          <div className="header-icons">
            <button className="icon-btn" title="Voice Call" onClick={() => handleCall('voice')}>
              <span>📞</span>
            </button>
            <button className="icon-btn" title="Video Call" onClick={() => handleCall('video')}>
              <span>📹</span>
            </button>
            <button className="icon-btn" title="Info">
              <span>ℹ️</span>
            </button>
            <button className="icon-btn" title="More">
              <span>⋮</span>
            </button>
          </div>
        </div>

        {/* Call Modal */}
        {showCallModal && (
          <div className="modal-overlay">
            <div className="call-modal">
              <div className="call-avatar">{currentChatInfo.avatar}</div>
              <h2>{currentChatInfo.name}</h2>
              <p className="calling-text">
                {callStatus === 'calling' ? 'Calling...' : `On ${callType === 'voice' ? 'Voice' : 'Video'} Call`}
              </p>
              <div className="call-timer">{formatTime(callSeconds)}</div>
              <div className="call-controls">
                <button className={`call-control-btn ${isMuted ? 'active' : ''}`} onClick={() => setIsMuted(!isMuted)} title="Mute">
                  {isMuted ? '🔇' : '🎤'}
                </button>
                <button className={`call-control-btn ${isSpeakerOn ? 'active' : ''}`} onClick={() => setIsSpeakerOn(!isSpeakerOn)} title="Speaker">
                  {isSpeakerOn ? '🔊' : '🔈'}
                </button>
                <button className="call-control-btn" title="Video" onClick={() => setCallType(callType === 'voice' ? 'video' : 'voice')}>
                  {callType === 'video' ? '📹' : '📷'}
                </button>
              </div>
              <button className="end-call-btn" onClick={handleEndCall}>
                ❌ End Call
              </button>
            </div>
          </div>
        )}

        {/* Voice Message Modal */}
        {showVoiceModal && (
          <div className="modal-overlay">
            <div className="voice-modal">
              <h2>🎤 Recording Voice Message</h2>
              <div className="recording-indicator">
                <span className="pulse"></span>
                <span>Recording</span>
              </div>
              <div className="waveform">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="waveform-bar" style={{ animationDelay: `${i * 0.05}s` }}></div>
                ))}
              </div>
              <div className="timer">{formatTime(recordingSeconds)}</div>
              <div className="voice-buttons">
                <button className="stop-btn" onClick={handleStopRecording}>
                  ⏹️ Stop & Send
                </button>
                <button className="cancel-btn" onClick={() => { setIsRecording(false); setShowVoiceModal(false); }}>
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="messages-container">
          {(messages[activeChat] || []).map((msg) => (
            <div key={msg.id} className={`message ${msg.sender === 'user' ? 'sent' : 'received'}`}>
              {msg.sender === 'other' && activeTab === 'groups' && (
                <span className="sender-name">{msg.user || 'User'}</span>
              )}
              <div className="message-content">
                {msg.voiceDuration ? (
                  <div className="voice-bubble">
                    <button className="voice-play-btn">▶</button>
                    <div className="voice-wave">
                      {[...Array(15)].map((_, i) => (
                        <div key={i} className="voice-wave-bar" style={{ height: `${Math.random() * 20 + 4}px` }}></div>
                      ))}
                    </div>
                    <span className="voice-duration">{formatTime(msg.voiceDuration)}</span>
                  </div>
                ) : (
                  <div className="message-bubble">
                    <div className="message-text">{msg.text}</div>
                    <div className="message-meta">
                      <span className="message-time">{msg.timestamp}</span>
                      {msg.sender === 'user' && getStatusIcon(msg.status)}
                    </div>
                  </div>
                )}
                {msg.sender === 'user' && msg.voiceDuration && (
                  <div className="voice-meta">
                    <span className="message-time">{msg.timestamp}</span>
                    {getStatusIcon(msg.status)}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="message received typing-indicator-msg">
              <div className="message-bubble typing-bubble">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="chat-input-area">
          <button className="attach-btn" title="Attach">
            <span>📎</span>
          </button>
          <button className="emoji-btn" title="Emoji">
            <span>😊</span>
          </button>
          <textarea
            className="message-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            rows="1"
          />
          {inputValue.trim() ? (
            <button className="send-btn" onClick={handleSendMessage} title="Send">
              <span>📤</span>
            </button>
          ) : (
            <button className="send-btn voice-btn" onClick={handleVoiceMessage} title="Send Voice Message">
              <span>🎤</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

