import React, {useState} from 'react'
 
export default function Counter() {
   const [count, setCount] = useState(0);
   const incrementCount=()=>{
    setCount( count+1)
   }
  return (
    <div>
        <button onClick={incrementCount}>Count: {count}</button>
    </div>
  )
}