import React,{useState,useEffect} from 'react'
import "./HomePage.css"
import Create from '../Create/Create'
import Lock from '../../assets/Lock.png'
import Content from '../Content/Content'
import { v4 as uuidv4 } from 'uuid';
function HomePage() {

   const [Component, setComponent] = useState(false);
   
   const handleClick = () => {
    setComponent(true);
  };

  const[selectedlist,setSelectedlist]=useState('');

  const[showcontent,setShowcontent]=useState(false);

  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const handleListSelection = (list,index) => {
    setSelectedlist(list);
    setShowcontent(true);
    setSelectedItemIndex(index);
  };
  
  const getLocalItems=()=>{
     const list =localStorage.getItem('lists');
    // if(list!=='' && list!==null){
    //   return JSON.parse(list);
    // }
    // else{
    //   return [];
    // }
    if (list !== undefined && list !== null) {
      try {
        return JSON.parse(list);
      } catch (error) {
        return [];
      }
    } else {
      return [];
    }
  };
  
  const [data,setData]=useState(getLocalItems());
  
  const handelGetData = (Input, selectcolor) => {
    const newData = {
      id: uuidv4(),
      name: Input,
      color: selectcolor
    };   
      setData( [...data, newData]);
      setComponent(false);
  };

  useEffect(()=>{
    localStorage.setItem('lists',JSON.stringify(data));
  },[data]);

  // const clearLocalStorage = () => {
  //   localStorage.removeItem('lists');
  //   setData([])
  // }
  

  return (
    //  <Content/>
  
    <div className='HomePage'>
         <div className='HomePage__left'>
            <p className='Hpl1'>Pocket Notes</p>
            <div className='Hdiv'><button className='H__button' onClick={handleClick}>+   Create Notes group</button></div>
           {data.map((item,index)=>(
            <div key={index}    style={{
              background: selectedItemIndex === index ? '#F7ECDC' : 'transparent',
            }} className='Homepage__list' onClick={()=>handleListSelection(item,index)}>
                <li className="Hpl3"style={{'--bg-color':item.color}}>{item.name && item.name.substring(0,2)}</li>
                <li className='Hpl2'>{item.name}</li>
               </div>
            ))}
          
        </div>
                
            {Component && (
        <div className="CreateOverlay">
          <Create onCreate={handelGetData} />
        </div>
       )}
       {showcontent?(<div className='Content__select'><Content listId={selectedlist.id}
            listname={selectedlist.name}
            Color={selectedlist.color}
            /></div>):(
        <div className='HomePage__right'>
            <p className='Hpr1'>Pocket Notes</p>
            <p className='Hpr2'>Send and receive messages without keeping your phone online.</p>
            <p className='Hpr2'>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
            <div className='Hpr3'>
                <img src={Lock} alt='lock' width={"17"} height={"22"} ></img>
                <p>end-to-end encrypted</p>
            </div>
        </div> )         
      }  
    
    </div>
  )  
}

export default HomePage
