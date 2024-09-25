import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { ProtectedRoute } from "./providers/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Register />
  }, // обьект маршрута
  {
    path: '/dashboard',
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>
  },
  {
    path: '*',
    element: <div>404 error</div>
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
