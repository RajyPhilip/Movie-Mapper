import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react'
import { ThemeContext } from '../App';
import './styles.css'

const Search = (props)=>{
    const {theme} = useContext(ThemeContext);
    const {getSearchData,apiCall,setApiCall} = props ;
    const [inputValue,setInputValue] = useState('') ;

    const handleInputValue = (e)=>{

        const {value} = e.target ; 
        setInputValue(value) ;
        
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        getSearchData(inputValue)
    }
    useEffect(()=>{
        
        if(apiCall){
            setInputValue('')
            setApiCall(false)
        }
    },[apiCall])
    console.log(apiCall) ;
    return(
        <form onSubmit={handleSubmit} className="Search">
            <input name="search" onChange={handleInputValue} value={inputValue} placeholder="Search Movies" id="search"/>
            <button style={theme ?{backgroundColor:"#12343b"}:{}} type="submit">Search</button>
        </form>
    )
}

export default Search