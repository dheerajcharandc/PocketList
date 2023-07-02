import React,{useEffect, useState} from 'react'
import "./Content.css"
import pic from "../../assets/Submit.png"
import back from "../../assets/back.png"
// import HomePage from '../Homepage/HomePage'
const Content = ({listId,listname,Color}) => {

    const[message,setMessage]=useState('');
    const handleMessageChange=(e)=>{
        e.preventDefault();
        setMessage(e.target.value);    
    }

    const getLocalMessage=()=>{
        const option=localStorage.getItem('options');
        if(option){
            return JSON.parse(option)
        }
        else{
        return [];
        }
    }
    const[messages,setMessages]=useState(getLocalMessage());

    const handleGetData=()=>{
        if (message.trim() !== '') {
            const currentDate = new Date();

            const options = {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            };
      
            const formattedTime = currentDate.toLocaleTimeString('en-US', options);

            const day = currentDate.getDate();
            const month = currentDate.toLocaleString('en-US', { month: 'short' });
            const year = currentDate.getFullYear();
            const formattedDate = `${day} ${month.toUpperCase()} ${year}`;
            const newMessage = {
              text: message,
              timestamp: formattedTime,
              date: formattedDate,
              listId:listId,
            };
      
            setMessages([...messages,newMessage]);
            setMessage('');
          }
    };
    // const clearLocalStorage = () => {
    //     localStorage.removeItem('options');
    //     setMessages([]);
    //   }

    useEffect(()=>{
        localStorage.setItem('options',JSON.stringify(messages));
    },[messages]);


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGetData();
    }
  }
  const filteredMessages = messages.filter((itemss) => {
    return itemss.listId === listId;
  })
  const handleReload = () => {
    window.location.reload();
  };
  
  return (
    <div className='Content'>
        <div className='Conv__top'>
            <button className='back__button' onClick={handleReload}><img src={back} alt='back'></img></button>
            <li className="C__li1 " style={{'--bg__color':Color}}>{listname && listname.substring(0,2)}</li>
            <li className='C__li2'>{listname}</li>
        </div>
        
         {/* {homepage && <HomePage/>} */}
        <div className='Conversation'>
           
            {filteredMessages.map((itemss, index) => {
                return (
                    <div key={index} className='Content__div'>
                        <div className='TimeColumn'>
                            <div className='Time'>{itemss.timestamp}</div>
                            <div className='Date'>{itemss.date}</div>
                        </div>
                        <div className='MessageColumn'>
                            <div className='MessageText'>{itemss.text}</div>
                        </div>
                    </div>
                 );
            })} 
        </div>
        <div className='Conv__bottom'>
                <textarea placeholder='Enter your text here...........'
                 className='Content__input' 
                 required 
                 onChange={handleMessageChange}
                 value={message}
                 onKeyPress={handleKeyPress
                 }
                ></textarea>
                <button className='C__button' onClick={handleGetData}><img src={pic} alt='pic'></img></button>
        </div>
       
    </div>
  )
}

export default Content