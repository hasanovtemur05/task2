import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";
  
  import App from "../App";
import { Home } from "../modules";

  const Index = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<App />}>
             <Route index element={<Home/>}/>
        </Route>
      )
    );
  
    return <RouterProvider router={router} />;
  };
  
  export default Index;
  