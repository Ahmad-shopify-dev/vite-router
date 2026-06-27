import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Welcome from './pages/Welcome.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Services from './components/Services.jsx'
import Settings from './components/Settings.jsx'
import Posts from './components/Posts.jsx'
import Post from './components/Post.jsx'
import PostEdit from './components/PostEdit.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    // YOU CAN DEAL WITH THE NESTED PATHS
    path: '/dashboard',
    Component: Dashboard,
    children: [
      {
        path: "posts",
        Component: Posts,
        children: [
          {
            path: ":id",
            Component: Post
          },
          {
            path: ":id/edit",
            Component: PostEdit
          }
        ]
      },
      {
        path: 'services',
        Component: Services
      },
      {
        path: 'settings',
        Component: Settings
      },
      // YOU CAN CRATE PREFIX PATHS
      // ACCESS -> /somepath/first_child_path
      // {
      //   path: "/somepath",
      //   children: [
      //     {
      //       path: "first_child_path",
      //       Component: "Some Component"
      //     },
      //     {
      //       path: "second_child_path",
      //       Component: "Some Component"
      //     }
      //   ]
      // },
      // {
      //   GET REST OF THE THINGS AS PARAMS
      //   path: "/somepath/*"
      //   NOW YOU CAN ADD WHATEVER YOU WANT WILL BE TREATED AS PARAMS
      // },
      // TO RUN MIDDLEWARE
      // {
      //   path: "dashboard",
      //   middleware: [authMiddleware],
      //   children: [
      //     {
      //       path: "user",
      //       middleware: [sessionMiddleware]
      //     }
      //   ]
      // }
    ]
  },
  {
    path: "/welcome",
    Component: Welcome,
    loader: async ({params}) => {
      // here you can get the path params
      const postReq = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      const postResp = await postReq.json();
      return postResp;
    },
  },
  {
    // 404 PATH REDIRECT
    path: "*",
    element: <PageNotFound />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)

