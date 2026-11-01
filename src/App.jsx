import { createBrowserRouter, RouterProvider } from 'react-router'
import { Home } from './pages/Home'
import { Journey } from './pages/Journey'
import { Lab } from './pages/Lab'
import { LessonRoute } from './pages/LessonRoute'
import { Lessons } from './pages/Lessons'
import { Playground } from './pages/Playground'
import { Layout } from './shell/Layout'
import { ProgressProvider } from './state/progress'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/lessons', element: <Lessons /> },
      { path: '/lessons/:slug', element: <LessonRoute /> },
      { path: '/lab', element: <Lab /> },
      { path: '/playground', element: <Playground /> },
      { path: '/journey', element: <Journey /> },
      { path: '*', element: <Lessons /> },
    ],
  },
])

export default function App() {
  return (
    <ProgressProvider>
      <RouterProvider router={router} />
    </ProgressProvider>
  )
}
