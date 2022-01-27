import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';



function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setcartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {

   async function fetchData() {
     setIsLoading(true);

     const cartResponse = await axios.get('https://61b47e6459c6ac0017301145.mockapi.io/cart');
     const favoritesResponse = await axios.get('https://61b47e6459c6ac0017301145.mockapi.io/favorites');
     const itemResponse = await axios.get('https://61b47e6459c6ac0017301145.mockapi.io/items');

     setIsLoading(false);
  
     setCartItems(cartResponse.data);
     setFavorites(favoritesResponse.data);
     setItems(itemResponse.data);
   }
  //  (local function fetchData(): Promise<void>
    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))){
       setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        axios.post('https://61b47e6459c6ac0017301145.mockapi.io/cart', obj);
        setCartItems(prev => [...prev, obj]);
      }
      
    } catch (error) {
      alert('Не удалось добавить')
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://61b47e6459c6ac0017301145.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id));
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://61b47e6459c6ac0017301145.mockapi.io/favorites/${obj.id}`);  
      setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('https://61b47e6459c6ac0017301145.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data]);
        
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты')
    }
  };
  

  const onChangeSearchInput = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  }

   const isItemAdded = (id) => {
     return cartItems.some((obj) => Number(obj.id) === Number(id));
   };

  return (
    <AppContext.Provider 
     value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, setcartOpened, setCartItems }}>
      <div className="wrapper clear">
      
      {cartOpened && (<Drawer items={cartItems} onClose={() => setcartOpened(false)} onRemove={onRemoveItem} />)} 
      
      <Header onClickCart={() => setcartOpened(true)} />

     <Routes>
      <Route path="/" element={
        <Home
        items={items} 
        cartItems={cartItems}
        searchValue={searchValue} 
        setSearchValue={setSearchValue}
        onChangeSearchInput={onChangeSearchInput}
        onAddToFavorite={onAddToFavorite}
        onAddToCart={onAddToCart}
        isLoading={isLoading}
       />
      } exact>
      </Route>
      </Routes>

      <Routes>
      <Route path="/Favorites" element={
        <Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>
      } exact>
      </Route>
      </Routes>
           
      
      </div>
    </AppContext.Provider>
  );
}

export default App;
