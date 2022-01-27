import { Link } from 'react-router-dom';

function Header(props) {
   return (
      <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
       <Link to="/">
        <img width={40} height={40} src="/img/logo.png" alt="логотип"/>
         <div>
              <h3 className="text-uppercase">React Sneakers</h3>
              <p className="opacity-5">Магазин лучших кроссовок</p>
        </div>
        </Link>

      </div>
      <ul className="d-flex">
          <li onClick={props.onClickCart} className="mr-30 сart">
              <img width={20} height={20} src="/img/cart.svg" alt="Корзина"/>
              <span>1205 руб.</span>
          </li>

          <li className="mr-20 сart">
          <Link to="/favorites">
          <img width={20} height={20} src="/img/heart.svg" alt="Закладки"/>
          </Link>
          </li>
         
          <li>
              <img width={20} height={20} src="/img/user.svg" alt="Пользователь"/>
          </li>
      </ul>
    </header>
   );
}



export default Header;