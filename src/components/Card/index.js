import React from 'react';
import ContentLoader from "react-content-loader";

import AppContext from '../../context';

import styles from './Card.module.scss';

function Card({id,
    title, 
    imageUrl, 
    price, 
    onFavorite, 
    onPlus, 
    favorited = false, 
    loading = false}) {
   const {isItemAdded} = React.useContext(AppContext);
   const [isFavorite, setIsFavorite] = React.useState(favorited);

   const onClickPlus = () => {
       onPlus({id, title, imageUrl, price});  
   };

   const onClickFavorite = () => {
      onFavorite({id, title, imageUrl, price});
      setIsFavorite(!isFavorite);
   };
   // console.log(onFavorite({id, title, imageUrl, price}));
   return (
      <div className={styles.card}> 
         {
            loading ? (<ContentLoader 
            speed={2}
            width={158}
            height={228}
            viewBox="0 0 158 228"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
               <rect x="0" y="104" rx="3" ry="3" width="150" height="15" /> 
               <rect x="0" y="0" rx="5" ry="5" width="150" height="91" /> 
               <rect x="0" y="126" rx="3" ry="3" width="93" height="15" /> 
               <rect x="74" y="146" rx="0" ry="0" width="27" height="0" /> 
               <rect x="0" y="163" rx="8" ry="8" width="80" height="24" /> 
               <rect x="118" y="155" rx="8" ry="8" width="32" height="32" />
           </ContentLoader>) : (
           <>
            <div className={styles.favorite} onClick={onClickFavorite}>
                  <img src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'} alt="Unliked"/>
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                   <div className="d-flex flex-column">
                          <span>Цена:</span>
                          <b>{price}</b>
                    </div>
               <img 
               className={styles.plus} 
               onClick={onClickPlus} 
               src={isItemAdded(id) ? '/img/btn-check.svg' : '/img/btn-plus.svg'} alt="Plus"
               />
                   
            </div>
           </> 
            ) }
</div>  
   );
}




export default Card;