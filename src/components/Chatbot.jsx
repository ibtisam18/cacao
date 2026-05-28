import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaPhoneAlt,
  FaVolumeUp,
  FaVolumeMute
} from 'react-icons/fa';

const Chatbot = () => {

  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text:
        'Hi there! 👋 Welcome to Cacao — your chocolate paradise. How can I help you today?'
    }
  ]);

  const [input, setInput] =
    useState('');

  const [isTyping, setIsTyping] =
    useState(false);

  const [voiceEnabled, setVoiceEnabled] =
    useState(true);

  const messagesEndRef =
    useRef(null);

  // =====================================================
  // AUTO SCROLL
  // =====================================================

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });

  }, [messages, isTyping]);

  // =====================================================
  // BOT SPEAKING
  // =====================================================

  const speakText = (text) => {

    if (!voiceEnabled) return;

    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";

    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;

    const voices =
      window.speechSynthesis.getVoices();

    if (voices.length > 0) {

      speech.voice = voices[0];

    }

    window.speechSynthesis.speak(speech);

  };

  // =====================================================
  // QUICK REPLIES
  // =====================================================

  const suggestions = [

    '🍫 What chocolates do you have?',

    '💳 How do I pay?',

    '🚚 Do you deliver?',

    '📦 How do I add a product?',

    '🏢 About Cacao',

    '📞 Contact us',

  ];

  // =====================================================
  // BOT REPLIES
  // =====================================================

  const getBotReply = (text) => {

    const lower = text.toLowerCase();

    if (
      lower.includes('chocolate') ||
      lower.includes('product')
    )

      return "We offer premium handcrafted chocolates 🍫 including Vizzio Cacao, Elbrus, Criollo, and Cluizel. Visit our Products page to see them all!";

    if (
      lower.includes('pay') ||
      lower.includes('mpesa') ||
      lower.includes('payment')
    )

      return "We use M-Pesa STK Push 📲 for payments. Just enter your Safaricom number at checkout and confirm the PIN prompt on your phone.";

    if (
      lower.includes('deliver') ||
      lower.includes('shipping')
    )

      return "Yes! 🚚 We deliver across Kenya. Orders are processed within 24 hours of payment confirmation.";

    if (
      lower.includes('add') ||
      lower.includes('sell') ||
      lower.includes('upload')
    )

      return "To add a product, sign in and go to the Add Product page from the navbar. Fill in the name, description, price, and upload a photo!";

    if (
      lower.includes('about') ||
      lower.includes('cacao') ||
      lower.includes('who')
    )

      return "🍫 Cacao is a Kenyan premium chocolate brand dedicated to bringing you the finest artisan chocolates sourced from sustainable farms.";

    // CONTACTS
    if (
      lower.includes('contact') ||
      lower.includes('phone') ||
      lower.includes('whatsapp') ||
      lower.includes('instagram') ||
      lower.includes('tiktok')
    )

      return `
You can contact us directly 📞

Tap on any icon below to reach us on:

📱 Phone Call

💬 WhatsApp

📸 Instagram

🎵 TikTok
`;

    if (
      lower.includes('price') ||
      lower.includes('cost') ||
      lower.includes('ksh')
    )

      return "Our chocolates range from Ksh 1,000 to Ksh 2,000. Check the Products page for exact pricing on each item!";

    if (
      lower.includes('sign') ||
      lower.includes('login') ||
      lower.includes('account')
    )

      return "You can Sign Up or Sign In from the top of the page. An account lets you buy products and add your own!";

    if (
      lower.includes('hi') ||
      lower.includes('hello') ||
      lower.includes('hey')
    )

      return "Hello! 😊 Great to have you here. Ask me anything about Cacao chocolates, payments, or delivery!";

    if (lower.includes('thank'))

      return "You're welcome! 🍫 Enjoy your chocolate experience with Cacao!";

    if (
      lower.includes('bye') ||
      lower.includes('goodbye')
    )

      return "Goodbye! 👋 Come back anytime. We're always here to help!";

    return "I'm not sure about that 🤔 — try asking about our products, payment, delivery, or contact info!";
  };

  // =====================================================
  // SEND MESSAGE
  // =====================================================

  const handleSend = (
    questionText = null
  ) => {

    const finalInput =
      (questionText || input).trim();

    if (!finalInput) return;

    setMessages(prev => [

      ...prev,

      {
        sender: 'user',
        text: finalInput
      }

    ]);

    setInput('');

    setIsTyping(true);

    setTimeout(() => {

      const reply =
        getBotReply(finalInput);

      setMessages(prev => [

        ...prev,

        {
          sender: 'bot',
          text: reply
        }

      ]);

      speakText(reply);

      setIsTyping(false);

    }, 800);
  };

  // =====================================================
  // ENTER KEY
  // =====================================================

  const handleKeyDown = (e) => {

    if (e.key === 'Enter')
      handleSend();

  };

  // =====================================================
  // SPEECH TO TEXT
  // =====================================================

  const startVoiceInput = () => {

    window.speechSynthesis.cancel();

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert(
        "Speech recognition is not supported in your browser. Please use Google Chrome."
      );

      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {

      const transcript =
        event.results[0][0].transcript;

      setInput(transcript);

      handleSend(transcript);

    };

    recognition.onerror = () => {

      alert(
        "Microphone permission denied or speech not detected."
      );

    };

  };

  // =====================================================
  // STYLES
  // =====================================================

  const styles = {

    container: {

      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F9F2E7',
      padding: '20px',

    },

    box: {

      width: '100%',
      maxWidth: '700px',
      height: '620px',
      background: '#4e3629',
      borderRadius: '16px',
      padding: '20px',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      boxShadow:
        '0 8px 32px rgba(0,0,0,0.3)',

    },

    header: {

      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',

    },

    backBtn: {

      background: '#C68E17',
      border: 'none',
      borderRadius: '8px',
      color: '#fff',
      padding: '6px 14px',
      cursor: 'pointer',
      fontSize: '0.85rem',

    },

    voiceBtn: {

      position: 'fixed',
      right: '20px',
      bottom: '20px',
      width: '65px',
      height: '65px',
      borderRadius: '50%',
      backgroundColor: '#C68E17',
      color: '#fff',
      border: 'none',
      fontSize: '1.4rem',
      cursor: 'pointer',
      boxShadow:
        '0 4px 12px rgba(0,0,0,0.3)',
      zIndex: 999,

    },

    messages: {

      flex: 1,
      overflowY: 'auto',
      marginBottom: '10px',
      paddingRight: '4px',

    },

    userMsg: {

      background: '#FFB74D',
      padding: '10px 14px',
      margin: '5px 0 5px auto',
      borderRadius:
        '14px 14px 2px 14px',
      maxWidth: '75%',
      color: '#000',
      width: 'fit-content',

    },

    botMsg: {

      background: '#E0CDA9',
      padding: '10px 14px',
      margin: '5px auto 5px 0',
      borderRadius:
        '14px 14px 14px 2px',
      maxWidth: '75%',
      color: '#000',
      width: 'fit-content',
      whiteSpace: 'pre-line',

    },

    typingMsg: {

      background: '#E0CDA9',
      padding: '10px 14px',
      margin: '5px auto 5px 0',
      borderRadius:
        '14px 14px 14px 2px',
      color: '#555',
      fontStyle: 'italic',
      width: 'fit-content',

    },

    suggestions: {

      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      marginBottom: '10px',

    },

    suggBtn: {

      background: '#6F4F1F',
      color: '#FFC107',
      border: '1px solid #FFC107',
      borderRadius: '20px',
      padding: '4px 12px',
      fontSize: '0.78rem',
      cursor: 'pointer',

    },

    inputRow: {

      display: 'flex',
      gap: '8px',

    },

    input: {

      flex: 1,
      padding: '10px 14px',
      borderRadius: '10px',
      border: 'none',
      outline: 'none',
      fontSize: '0.95rem',

    },

    speakBtn: {

      padding: '10px 18px',
      background: '#FFB74D',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '0.95rem',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',

    }

  };

  return (

    <div style={styles.container}>

      <div style={styles.box}>

        {/* HEADER */}
        <div style={styles.header}>

          <h3 style={{ margin: 0 }}>
            💬 Cacao Bot
          </h3>

          <button
            style={styles.backBtn}
            onClick={() =>
              navigate('/main')
            }
          >
            ← Back
          </button>

        </div>

        {/* MESSAGES */}
        <div style={styles.messages}>

          {messages.map((m, i) => (

            <div
              key={i}
              style={
                m.sender === 'user'
                  ? styles.userMsg
                  : styles.botMsg
              }
            >
              {m.text}
            </div>

          ))}

          {isTyping && (

            <div style={styles.typingMsg}>
              Cacao Bot is typing...
            </div>

          )}

          <div ref={messagesEndRef} />

        </div>

        {/* QUICK SUGGESTIONS */}
        <div style={styles.suggestions}>

          {suggestions.map((s, i) => (

            <button
              key={i}
              style={styles.suggBtn}
              onClick={() =>
                handleSend(s)
              }
            >
              {s}
            </button>

          ))}

        </div>

        {/* CONTACT BUTTONS */}
        <div
          className="d-flex justify-content-center gap-4 mb-3"
        >

          <a
            href="tel:+254700123456"
            style={{ color: "#fff" }}
          >
            <FaPhoneAlt size={28} />
          </a>

          <a
            href="https://wa.me/254700123456"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#25D366" }}
          >
            <FaWhatsapp size={28} />
          </a>

          <a
            href="https://instagram.com/cacaochocolate"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#E1306C" }}
          >
            <FaInstagram size={28} />
          </a>

          <a
            href="https://tiktok.com/@cacaochocolate"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#fff" }}
          >
            <FaTiktok size={28} />
          </a>

        </div>

        {/* INPUT */}
        <div style={styles.inputRow}>

          <input
            style={styles.input}
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Tap Speak and talk..."
          />

          {/* SPEAK BUTTON */}
          <button
            style={styles.speakBtn}
            onClick={startVoiceInput}
          >

            <FaVolumeUp />

            Speak

          </button>

        </div>

      </div>

      {/* VOICE TOGGLE */}
      <button
        style={styles.voiceBtn}
        onClick={() =>
          setVoiceEnabled(!voiceEnabled)
        }
      >

        {voiceEnabled
          ? <FaVolumeUp />
          : <FaVolumeMute />
        }

      </button>

    </div>

  );
};

export default Chatbot;