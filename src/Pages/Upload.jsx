import React,{useState} from 'react'
import { Buffer } from 'buffer'

function Upload() {
  const [pic,setPic] = useState(null)


  const handleSubmit=(e)=>{
    e.preventDefault()
    // console.log(pic)  
    let buffer = new Buffer(pic)
    // console.log(buffer.toString("base64"))
  }

  const handleChange = (e)=>{
     
    //   console.log(pic)
    // let buffer = new Buffer(pic.data)
    // buffer.toString("base64")
    // console.log(buffer)
    const reader = new FileReader()
    // const avat =  reader.readAsDataURL(pic)
    // console.log(avat.result)
    reader.addEventListener("load",()=>{
      setPic(reader.result)
    })
    reader.readAsDataURL(e.target.files[0])
    console.log(pic)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file"  onChange={handleChange} />
        <input type="submit" value="submit" disabled={pic?false:true} />
      </form>

      <img src={pic} alt="yh" />
    </div>
  )
}

export default Upload