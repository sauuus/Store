import {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./components/Product";
import { fetchProducts, searchProduct, sortProduct, handleSortlth } from "./store/products";
import {
  selectProducts,
  selectProductsLoading
} from "./store/products/selectors";
import 'semantic-ui-css/semantic.min.css'

import "./App.css";
import { BrowserRouter, Route,Switch } from "react-router-dom";



export default function App() {
  const data = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const dispatch = useDispatch();
  const handleFetchProducts = () => {
    dispatch(fetchProducts());
  };

  // const navigate = useNavigate();

  // const navigateToProducts = () => {
  //   navigate(/./ProductDetails);
  // }


  
  //Search functions...
  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value;
    if (!searchTerm) {
      handleFetchProducts();
      return;
    }
    dispatch(searchProduct(searchTerm));
  };

  //Sort functions..
const [isAscending, setIsAscending] = useState(false)
const [lth, setlth] = useState(false)
  const handleSort = () => {
    dispatch(sortProduct(isAscending));
    // const sortedproducts = isAscending
    //   ? sortAscending(products)
    //   : sortDescending(products);
    setIsAscending(!isAscending);
    // setProducts(sortedproducts);
  };

  
  const handlelth = () => {
    dispatch(handleSortlth(lth))
    setlth(!lth)

  }
  
  //fetch products on componenet mount
  useEffect(() => {
    handleFetchProducts();
  }, []);

  if (loading) return "Loading....";

  return (
    <>
    
  
    <div className="menu">
  
    <div className="ui container center">
   
      <div className="row">
        <div className="col">
        <h2>MyStore</h2>

        </div>

  
     <div className="col-md-auto">
          
     <button className="sortbutton bg-dark text-light" onClick={handleSort}> 
    Sort title
    </button></div>
   
    <div className="col col-lg-2" >
    {/* <button onClick={handlelth} > low to high</button> */}
      <select className ="pricebtn mb-2 bg-dark text-light">
         <option value="normal">Sort Price</option>
        <option value="lowtohigh">Low to High</option>
        <option value="hightolow">High to Low</option>

      </select>
      </div>
      <div className="col col-lg-1 p-2 " >
         {/* <button className="icon" onClick={("././Cart")}> Cart+ */}
      {/* <FontAwesomeIcon icon="fa-sharp fa-solid fa-cart-plus" />   */}
      {/* </button> */}
      </div>
     
    
   
     </div>
<BrowserRouter>
<Switch>
  <Route path = "/" element = {
        <div className="container">
        <div className="d-fex p-2">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-group mb-3">
            <input
              type="search"
              className="form-control"
              placeholder="search"
              onChange={handleSearch}
            />
            <button type="submit" className="btn btn-dark">
              search 
            </button>
          </div>
         
       
        </form>
        </div>
           
          {data.map((pd) => (
            <Product product={pd} key={pd.id}/>
          
           
          ))}
        
          </div>
  }></Route>
</Switch>
</BrowserRouter>

        </div>
        </div>
    
    
    
</> 
  );
}
