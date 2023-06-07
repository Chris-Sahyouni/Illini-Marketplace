"use client"

import {useSession, signIn} from 'next-auth/react';

// function testReq() {
//   fetch('/api/test', {
//     method: "POST",
//     body: JSON.stringify({data: 'nothing'}),
//     headers: {
//       "Content-Type": "application/json",
//       'Accept': "application/json"
//     }
//   });
// }


export default function Home() {

 const { data: session, status } = useSession();

//  const testAuth = async () => {
//   const result = await signIn("credentials", {
//     netId: "CSahyouni",
//     password: "<absolution>123",
//     redirect: true,
//     callbackUrl: "/"
//   }).then(() => {
//     console.log(session);
//   });
// }

  if (status === 'authenticated') {
    return (
      <div>
        <h1>AUTH WORKED!</h1>
      </div>
    );
  }

  return (
    <div>
      <button type="button">test auth</button>
    </div>
  ); 
}
