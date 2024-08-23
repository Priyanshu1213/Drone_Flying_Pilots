import React, { useState } from 'react'


export default function Loader() {

    const [width, setWidth]=useState(0);
    
    const changer=()=>{
        if(width<100){
            setWidth(width+2)
        }
       
        clearInterval(temp)
    }

   const temp= setInterval(changer,1500)


  return (
    <div className='loader' style={{width:"90%", height:"500px", display:"flex", alignItems:"center", justifyContent:"center",flexDirection:"column"}}>
       <h1>Loading... {width}% </h1> 
        <div className='loading' style={{width:`${width}%`,  display:"flex" , justifyContent:"flex-start",backgroundColor:"green" , height:"10px"} }></div>
    </div>
  )
}
