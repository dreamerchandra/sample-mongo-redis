/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Readme from './README.md'

const Home = () => {
  const [readme, setReadme] = useState('')
  console.log(Readme)
  useEffect(() => {
    setReadme(Readme)
  }, [])
  return (
    <div>
      <ReactMarkdown>{readme}</ReactMarkdown>
    </div>
  )
}

Home.inject = ['README.md']
export default Home
