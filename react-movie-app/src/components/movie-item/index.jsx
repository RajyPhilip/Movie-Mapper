import { useContext } from 'react';
import { ThemeContext } from '../../App';
import './styles.css'


const MovieItem = (props)=>{

    const {item,addToFavorites} = props ;
    const {theme} = useContext(ThemeContext);
    return(
        <div className='movie-item'>
            <div>
                <img className='item-image' src={item.Poster} />
            </div>
            <p style={theme ?{color:"#12342b"}:{}}>{item.title} </p>
            <button style={theme ?{backgroundColor:"#12342b"}:{}} type='button' onClick={addToFavorites} >Add to Favorites</button>
        </div>
    )
}

export default MovieItem ;