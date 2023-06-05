"use client"
import Header from '../components/Header';

function testReq() {
  fetch('/api/test', {
    method: "POST",
    body: JSON.stringify({data: 'nothing'}),
    headers: {
      "Content-Type": "application/json",
      'Accept': "application/json"
    }
  });
}

export default function Home() {

  
  return (
    <div>
      <Header /> 
      <button onClick={testReq}>Send test email</button>
    </div>
  ); 
}
