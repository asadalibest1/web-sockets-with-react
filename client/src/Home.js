import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(10).substring(1);
  return s4() + s4() + '-' + s4();
};

const Home = () => {

  const navigate = useNavigate();
  useEffect(() => {
    navigate("/live-editor/" + getUniqueID() + "/" + getUniqueID())
  }, [])

  return (
    <div />
  )
}

export default Home