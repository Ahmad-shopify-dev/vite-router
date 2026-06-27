import React from 'react'
import { useLocation, useParams } from 'react-router'

function Post() {

    const location = useLocation();

  return (
    <div>
      { location.state?.post && <p>{location.state?.post[0].title}</p> }
    </div>
  )
}

export default Post
