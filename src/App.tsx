import { useEffect, useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  const obj = {
    name: 'zhangsan',
    age: 12,
  }
  useEffect(() => {
    setTimeout(() => {
      setCount(count + 1)
    }, 1000)
  })

  useEffect(() => {
    for (const item of Object.entries(obj))
      console.log(item)
  }, [])

  return <>
    <h1>Hello React111, Count: {count}</h1>
  </>
}
