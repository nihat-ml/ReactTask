import { Route, Routes, Link } from "react-router-dom"
import Home from "./pages/Home"
import Product from "./pages/Product"
import NotFound from "./pages/NotFound"
import ProductDetail from "./pages/Detail"
import 'bootstrap/dist/css/bootstrap.min.css'
import ProductEdit from "./pages/Edit"


function App() {
  

  return (
    <>
    <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Product">Product</Link>
          </li>
        </ul>
      </nav>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Product" element={<Product />} />
      <Route path="/Detail/:id" element={<ProductDetail />} />
      <Route path="/Edit/:id" element={<ProductEdit />} />
      
      <Route path="*" element={<NotFound />}/>
    </Routes>
    </>
  )
}

export default App
