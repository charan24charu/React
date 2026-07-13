import React, { useState } from 'react'
import axios from 'axios'

const App = () => {
  let [state,setState]=useState({
    name:"",
    email:""
  })
  let {name,email}=state
  let handleChange=(e)=>{
    let {name,value}=e.target
    setState({...state,[name]:value})
  }
  let handleSubmit=async()=>{
    try{
      let payload={name,email}

      await axios.post("http://localhost:5000/users",payload)
    }catch(err){
      console.log(err)
    }
  }


  return (
    <div>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="">Name:</label>
          <input type="text" name="name" id="" onChange={handleChange}/>
          <br />
          <label htmlFor="">Email:</label>
          <input type="email" name="email" id="" onChange={handleChange}/>
          <br />
         
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  )
}

export default App