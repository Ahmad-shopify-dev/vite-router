import React from 'react'
import { useLoaderData } from 'react-router'

function Welcome() {

  const post = useLoaderData();

  return (
    <div>
      Welcome Module

      {
        post ? <p>{post.title}</p> : null
      }
    </div>
  )
}

export default Welcome
