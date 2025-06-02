import { useState, useRef, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './App.css'

function App() {
  const bottomRef = useRef(null);

  const [question, setQuestion] = useState('');
  const [answer,setAnswer]=useState();
  const [loading,setLoading]=useState(false);
  const [chat, setChat] = useState([{ role: 'bot', text: 'Hi there  !, how can I help you?' }]);

  
  const askGemini = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer('');
    const updatedChat = [...chat, { role: 'user', text: question }];
    setChat(updatedChat);

    try {
      const res = await fetch(`https://chat-bot-backend1.onrender.com/ask?q=${encodeURIComponent(question)}`);
      const data = await res.json();
      setAnswer(data.answer || 'No response from AI.');
      setQuestion('');
      setChat([...updatedChat, { role: 'bot', text: data.answer }]);
    } catch (err) {
      setChat([...updatedChat, { role: 'model', text: 'Error fetching response.' }]);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
  if (bottomRef.current) {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}, [chat]);


  return (
    <>
    <div className='root'>
    <div className='box'>
      <div style={{backgroundColor:"rgb(146, 156, 148)", borderRadius:"16px"}}>
        <h1> &nbsp;AI Chatbot</h1> 
      </div>
      <div className='chat-area'>
  {chat.map((msg, i) => (
    <div
      key={i}
      style={{
        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          backgroundColor: msg.role === 'user' ? '#DCF8C6' : '#E0E0E0',
          padding: '10px 14px',
          borderRadius: '16px',
          maxWidth: '75%',
          wordBreak: 'break-word',
          textAlign: 'left',
        }}
      >
        {msg.text.split(/```(?:\w+)?/).map((block, index) => (
  index % 2 === 1 ? (
    <pre key={index} style={{ backgroundColor: '#1e1e1e', color: '#fff', padding: '10px', borderRadius: '8px', overflowX: 'auto' }}>
      <code>{block}</code>
    </pre>
  ) : (
    <span key={index}>{block}</span>
  )
))}
      </div>
    </div>
  ))}
   <div ref={bottomRef}></div>
</div>
<div className='input-area'>
      <TextField value={question} className='text' id="outlined-basic" label="Ask a Question" variant="outlined" onChange={(e)=>setQuestion(e.target.value)}   onKeyDown={(e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // prevents form submission/reload
      askGemini();
    }
  }}/>
          <Button variant="contained" onClick={askGemini} color="primary"  style={{ marginTop: '1rem' }}>Ask</Button>
          </div>
    </div>
    </div>
      </>
  )
}

export default App
