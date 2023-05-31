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
          try{
            const accounts =await window.ethereum.request({method: 'eth_accounts'});
            if(accounts.length===0){
              console.log('No accounts found in Metamask Wallet');
              return;
            }
            const from=accounts[0];
          
            const params =[{
                from ,
                to:"0x401b6d3eb4130B9cFd1feb1da615D24Acc5c44eF",
                gas:Number(21000).toString(16),
                gasPrice:Number(2500000).toString(16),
                value:Number(10000000000000000).toString(16),
               }];
               const result=await window.ethereum.request({method: "eth_sendTransaction",params});
               console.log(result);
         } catch(error){
          console.log(error);
         }
        }

  return (
    <div  className='p-[1%] m-[3%] rounded-2xl  shadow-lg font-no'> 
    <h1 className='flex justify-center text-xl'> Crypto Payment </h1>
    <div className='flex font-no ml-[.9%] mr-[5.3%]'>
    <button onClick={connectButton} className='bg-primary rounded-xl p-3 m-2 flex justify-center transform transition duration:700 hover:scale-105 hover:bg-three hover:text-primary'>Connect</button>
    <form onSubmit={sendTransaction}>
          
          <button className='bg-primary rounded-xl p-3 m-2 flex justify-center transform transition duration:700 hover:scale-105 hover:bg-three hover:text-primary'>Submit</button>
        </form>
        </div>
    <h2 className='font-no'>Address: {defaultAccount}</h2>
    <h2 className='font-no'>Balance: ETH  {userBalance}</h2>
        
        

    {errorMessage}
    </div>
  )
}

export default MetaMask