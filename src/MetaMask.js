import React ,{useState}from 'react';
import {ethers} from 'ethers';

const MetaMask = () => {
  const[errorMessage,setErrorMessage]=useState(null);
  const[defaultAccount,setDefaultAccount]=useState(null);
  const[userBalance,setUserBalance]=useState(null);
  const connectButton =()=>{
    if(window.ethereum){
     //metamask is here
     window.ethereum.request({method: 'eth_requestAccounts'})
     .then(result=>{
         accountChangedHandler(result[0]);
     })
    }
    else{
          setErrorMessage('Install Metamask')
         }
     }
     const accountChangedHandler=(newAccount)=>{
      setDefaultAccount(newAccount);
      getUserBalance(newAccount);
          }
          const getUserBalance=(address)=>{
               window.ethereum.request({method:'eth_getBalance', params:[String(address),"latest"]})
               .then(balance=>{
                setUserBalance(ethers.formatEther(balance));
               })
          }
         async function sendTransaction(){
               let params =[{
                from :"0xA947E779B095A61cD94977C3A359036a53f7F850",
                to:"0x401b6d3eb4130B9cFd1feb1da615D24Acc5c44eF",
                gas:Number(21000).toString(16),
                gasPrice:Number(2500000).toString(16),
                value:Number(100000000000000000).toString(16),
               }]
               let result=await window.ethereum.request({method: "eth_sendTransaction",params}).catch((err)=>{
                console.log(err)
               })
         }

  return (
    <div  className='border-2 p-2 m-3 border-blue-600 rounded-2xl '> 
    <h1 className='flex justify-center text-2xl'> MetaMask Connection </h1>

    <h1 className='text-2xl flex justify-center'>Connection using windows.ethereum</h1>
    <button onClick={connectButton} className='bg-primary rounded-xl p-3 m-2 flex justify-center'>conncet</button>
    <h2>Address: {defaultAccount}</h2>
    <h2>Balance: ETH  {userBalance}</h2>
        
        <form onSubmit={sendTransaction}>
          {/* <input type="submit" value="Submit"/> */}
          <button>submit</button>
        </form>

    {errorMessage}
    </div>
  )
}

export default MetaMask