// Chatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! 👋 Welcome to Cacao — your chocolate paradise. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [buttonHover, setButtonHover] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (questionText = null) => {
    const finalInput = questionText || input;
    if (!finalInput.trim()) return;

    const userMessage = { sender: 'user', text: finalInput };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    setIsTyping(true);

    let botReply = "Sorry, I didn't understand that.";
    const lowerInput = finalInput.toLowerCase();

    if (lowerInput.includes("chocolate")) {
      botReply = "We offer premium handcrafted chocolate made with love 🍫.";
    } else if (lowerInput.includes("products")) {
      botReply = "Check out our products page for a variety of chocolate treats.";
    } else if (lowerInput.includes("buy") || lowerInput.includes("purchase")) {
      botReply = "You can buy chocolates directly from our product page with M-Pesa payment!";
    } else if (lowerInput.includes("about")) {
      botReply = "Cacao is all about quality chocolate, made in Kenya with passion.";
    } else if (lowerInput.includes("location") || finalInput === "Where are you located?") {
      botReply = "We're located in Nairobi, Kenya. You can visit our store or order online!";
    } else if (lowerInput.includes("contact")) {
      botReply = "You can contact us through the contact form on our website or email us at info@cacao.co.ke.";
    } else if (lowerInput.includes("delivery") || finalInput === "Do you deliver?") {
      botReply = "Yes, we deliver! Enjoy fast, reliable delivery across Kenya.";
    } else if (lowerInput.includes("payment") || lowerInput.includes("mpesa")) {
      botReply = "We accept M-Pesa and other mobile money payments for your convenience.";
    } else if (lowerInput.includes("halal")) {
      botReply = "Yes, our chocolates are halal certified and safe for consumption.";
    } else if (lowerInput.includes("vegan")) {
      botReply = "We offer vegan-friendly options! Just check the label or ask us.";
    } else if (
      lowerInput.includes("store hours") ||
      lowerInput.includes("open") ||
      lowerInput.includes("close")
    ) {
      botReply = "Our store is open from 9 AM to 7 PM, Monday to Saturday.";
    } else if (
      lowerInput.includes("thank you") ||
      lowerInput.includes("thanks") ||
      lowerInput.includes("bye")
    ) {
      botReply = "You're welcome! Have a sweet day with Cacao 🍫😊.";
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
      setIsTyping(false);
      if (isSpeaking) {
        speakMessage(botReply);
      }
    }, 1000);

    setInput('');
  };

  const speakMessage = (message) => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
  };

  const handleGoBack = () => {
    navigate('/main');
  };

  const toggleSpeech = () => {
    setIsSpeaking(prev => !prev);
  };

  const quickQuestions = [
    "What is Cacao about?",
    "Tell me about your products",
    "Where are you located?",
    "What are your store hours?",
    "Can I buy online?",
    "Do you deliver?",
    "How can I contact you?",
    "What payment methods do you accept?",    
    "Thank you",
    "Bye",
  ];
  

  return (
    <div style={styles.container}>
      <div
        style={isClicked ? { ...styles.chatbotContainer, animation: 'glowOnClick 0.6s ease-out' } : styles.chatbotContainer}
        onClick={() => setIsClicked(true)}
      >
        <div style={styles.chatbotHeader}>💬 Cacao Bot</div>
        <div style={styles.chatbotMessages}>
          {messages.map((msg, index) => (
            <div key={index} style={msg.sender === 'bot' ? styles.botMessage : styles.userMessage}>
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div style={styles.botMessage}>
              <span style={styles.typingIndicator}>...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div style={styles.chatbotInput}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about Cacao..."
            style={styles.inputField}
          />
          <button
            onClick={() => handleSend()}
            style={buttonHover ? styles.sendButtonHover : styles.sendButton}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
          >
            Send
          </button>
        </div>

        <div style={styles.quickButtonsContainer}>
          {quickQuestions.map((question, i) => (
            <button
              key={i}
              style={styles.quickButton}
              onClick={() => handleSend(question)}
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      <button onClick={handleGoBack} style={styles.goBackButton}>Go Back</button>
      <button onClick={toggleSpeech} style={styles.speechButton}>
        {isSpeaking ? "Stop Speaking" : "Start Speaking"}
      </button>

      <style>
        {`
          @keyframes glow {
            0% { box-shadow: 0 0 10px rgba(255, 165, 0, 0.7); }
            50% { box-shadow: 0 0 20px rgba(255, 165, 0, 1); }
            100% { box-shadow: 0 0 10px rgba(255, 165, 0, 0.7); }
          }

          @keyframes headerGlow {
            0% { text-shadow: 0 0 5px rgba(255, 165, 0, 0.8); }
            50% { text-shadow: 0 0 10px rgba(255, 165, 0, 1); }
            100% { text-shadow: 0 0 5px rgba(255, 165, 0, 0.8); }
          }

          @keyframes glowOnClick {
            0% { box-shadow: 0 0 20px rgba(255, 165, 0, 0.9); }
            100% { box-shadow: 0 0 20px rgba(255, 165, 0, 0.5); }
          }

          @keyframes botMessageGlow {
            0% { box-shadow: 0 0 5px rgba(255, 165, 0, 0.7); }
            50% { box-shadow: 0 0 15px rgba(255, 165, 0, 1); }
            100% { box-shadow: 0 0 5px rgba(255, 165, 0, 0.7); }
          }

          @keyframes buttonGlow {
            0% { background-color: #FFB74D; }
            50% { background-color: #FF9800; }
            100% { background-color: #FFB74D; }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#F9F2E7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  chatbotContainer: {
    width: '100%',
    maxWidth: '800px',
    height: '600px',
    background: 'linear-gradient(135deg, #6f4f28, #4e3629)',
    borderRadius: '16px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Arial', sans-serif",
    color: '#fff',
    overflow: 'hidden',
    animation: 'glow 2s infinite',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.3s ease',
  },
  chatbotHeader: {
    backgroundColor: '#4e3629',
    color: '#fff',
    padding: '16px',
    fontSize: '22px',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: '8px',
    marginBottom: '20px',
    animation: 'headerGlow 1.5s infinite',
  },
  chatbotMessages: {
    flex: 1,
    overflowY: 'auto',
    padding: '10px',
    maxHeight: '380px',
    marginBottom: '20px',
  },
  botMessage: {
    backgroundColor: '#E0CDA9',
    padding: '16px',
    borderRadius: '12px',
    margin: '12px 0',
    maxWidth: '85%',
    animation: 'fadeIn 0.5s ease-in-out, botMessageGlow 1.5s infinite alternate',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },
  userMessage: {
    backgroundColor: '#FFB74D',
    color: '#fff',
    padding: '16px',
    borderRadius: '12px',
    margin: '12px 0',
    maxWidth: '85%',
    alignSelf: 'flex-end',
    animation: 'fadeIn 0.5s ease-in-out',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  chatbotInput: {
    display: 'flex',
    alignItems: 'center',
  },
  inputField: {
    flex: 1,
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid #ccc',
    marginRight: '20px',
    fontSize: '16px',
    outline: 'none',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  sendButton: {
    backgroundColor: '#FFB74D',
    color: '#fff',
    border: 'none',
    padding: '16px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    animation: 'buttonGlow 1.5s infinite alternate',
  },
  sendButtonHover: {
    backgroundColor: '#FF9800',
    color: '#fff',
    border: 'none',
    padding: '16px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
  },
  typingIndicator: {
    fontSize: '20px',
    fontStyle: 'italic',
    color: '#ccc',
  },
  goBackButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#FFB74D',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  speechButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#FFB74D',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  quickButtonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '10px',
    gap: '10px',
  },
  quickButton: {
    backgroundColor: '#FFCC80',
    color: '#4e3629',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
};

export default Chatbot;
