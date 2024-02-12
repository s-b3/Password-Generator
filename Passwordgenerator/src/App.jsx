import { useState,useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setpassword] = useState("")

  const passwordRef=useRef(null)

  const passwordGenerator = useCallback(() =>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="1234567890"
    if(charAllowed) str+="!@#$%^&*()_~`{}"

    for (let index = 1; index <= length; index++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass +=str.charAt(char)
      
    }
    setpassword(pass)
  },[length,charAllowed,numberAllowed,setpassword])
  
   const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
   },[password])

  useEffect(()=>{passwordGenerator()

  },[length,charAllowed,numberAllowed,passwordGenerator])

  return (
    <>
    
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-40 text-white bg-gray-700 h-96'>
     <h1 className='text-4xl text-center text-white mb-8 pt-5'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" value={password} placeholder="password" readOnly ref={passwordRef}className='text-black outline-none w-full px-3 py-3 ' />
        <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      {/* <div className='flex text-sm gap-x-2'> */}
      <div className='flex-row'>
        <div className='flex items-center gap-x-5 gap-y-10 mb-6 mt-5 '>
          <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}} />
          <label>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-5 gap-y-10 mb-6'>
          <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={() => {setnumberAllowed((prev)=>!prev);}} />
          <label>Numbers</label>
        </div>
        <div className='flex items-center gap-x-5 gap-y-10 mb-6'>
          <input type="checkbox" defaultChecked={charAllowed} id='charrInput' onChange={() => {setcharAllowed((prev)=>!prev);}} />
          <label>Characters</label>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
