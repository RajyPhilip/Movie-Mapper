import { useContext } from 'react';
import { ThemeContext } from '../../App';
import './styles.css'


const FavoriteItem = (props)=>{
   
    const {item,removeFromFavorites} = props ;
    const {theme} = useContext(ThemeContext);
    return(
        <div className='fav-item'>
            <div>
                <img className='item-image' src={item.Poster} />
            </div>
            <p style={theme ?{color:"#12342b"}:{}}>{item.title} </p>
            <button style={theme ?{backgroundColor:"#12343b"}:{}} type='button' onClick={removeFromFavorites} >Remove to Favorites</button>
        </div>
    )
}

export default FavoriteItem ;