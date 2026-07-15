import React, { useState } from 'react'
import axios from 'axios'

const App = () => {
  let [state,setState]=useState({
    name:"",
    email:"",
    password:""
  })
  let {name,email,password}=state
  let handleChange=(e)=>{
    let {name,value}=e.target
    setState({...state,[name]:value})

  }
  let handleSubmit=async()=>{
    try{
      let payload={name,email,password}

      await axios.post("http://localhost:3000/users",payload)
    }catch(err){
      console.log(err)
    }
  }


  return (
    <div>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="">Name:</label>
          <input type="text" name="name" id="" onChange={handleChange} placeholder='enter your name' pattern='A-Za-z'/>
          <br />
          <label htmlFor="">Email:</label>
          <input type="email" name="email" id="" onChange={handleChange} placeholder='example@gmail.com'/>
          <br />
          <label htmlFor="">Password:</label>
          <input type="password" name="password" id="" onChange={handleChange} minLength={8} placeholder='Password'/>
         <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  )
}

export default App