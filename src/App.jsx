import {createBrowserRouter,RouterProvider} from"react-router-dom"
import MCQPage from "./pages/MCQPage"
import ScorePage from "./pages/ScorePage"
import HomePage from "./pages/HomePage"
import MainLayout from "./layout/MainLayout"


function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<MainLayout/>,
      children:[
        {
          path:'/',
          element:<HomePage/>
        },
        {
          path:'/quiz',
          element:<MCQPage/>
        },
        {
          path:'/score',
          element:<ScorePage/>
        }
      ]
    },
  ])  

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
