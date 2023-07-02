import React,{useState} from 'react'
import "./Create.css"
import a from "../../assets/a.png"
import b from "../../assets/b.png"
import c from "../../assets/c.png"
import d from "../../assets/d.png"
import e from "../../assets/e.png"
import f from "../../assets/f.png"
const Create = ({onCreate}) => {
    const [Input,setInput]=useState('');

    const [selectcolor,setselectColor]=useState('');

    const handleInputChange=(e)=>{
        setInput(e.target.value);
    };

    const handleColorChange=(color)=>{
        setselectColor(color);
    };
    
    const handleCreates=(e)=>{
       
        e.preventDefault();
        onCreate(Input,selectcolor);
        setInput('');
        setselectColor(''); 
    };


  return (
    <div className='.create'>
        <p className='Cp1'>Create New Notes group</p>
        <div className='C__input'>
            <span className='Cs1'>Group Name</span>
            <input type='text' className='Cinput' placeholder='Enter your group name....' required
            value={Input} onChange={handleInputChange}
            ></input>
        </div>
        <div className='C__buttons'>
            <span className='Cs1'>Choose colour</span>
            <div className='buttons' >
                <button onClick={() => handleColorChange('#6691FF')} ><img src={a} alt='a' height={"20px"} width={"20px"}></img></button>
                <button onClick={() => handleColorChange('#B38BFA')} ><img src={b} alt='b' height={"20px"} width={"20px"}></img></button>
                <button onClick={() => handleColorChange('#FF79F2')} ><img src={c} alt='c' height={"20px"} width={"20px"}></img></button>
                <button onClick={() => handleColorChange('#43E6FC')} ><img src={d} alt='d' height={"20px"} width={"20px"}></img></button>
                <button onClick={() => handleColorChange('#F19576')} ><img src={e} alt='e' height={"20px"} width={"20px"}></img></button>
                <button onClick={() => handleColorChange('#0047FF')} ><img src={f} alt='f' height={"20px"} width={"20px"}></img></button>
            </div>
        </div>
        <div className='C__create'>
            <button onClick={handleCreates}>Create</button>
        </div>
    </div>
  )
}

export default Create