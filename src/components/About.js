import React, {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'

const About = () => {
    const a = useContext(NoteContext);
    console.log(a)
  return (
    <div>
        <h1>About</h1>
    </div>
  )
}

export default About