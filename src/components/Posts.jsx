import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router';

function Posts() {

    const [posts, setPosts] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    (async(url) => {
        const request = await fetch(url);
        const posts = await request.json();
        setPosts(posts);
    })("https://jsonplaceholder.typicode.com/posts?_limit=5")
  }, []);

  const clickHandler = (id) => {
    const post = posts.filter(post => post.id === id);
    navigate(`/dashboard/posts/${id}`, {
        state: { post }
    })
  }

  return (
    <div>
        {
            posts ? (
                posts.map((post) => (
                    <div key={post.id}>
                        <div>
                            <h2 className="title">{post.title}</h2>
                            <p>{post.body}</p>
                            <button onClick={() => clickHandler(post.id)}>Visit</button>
                        </div>
                    </div>
                ))
            ): (
                <p>Wait to fetch posts</p>
            )
        }
        <Outlet />
    </div>
  )
}

export default Posts
