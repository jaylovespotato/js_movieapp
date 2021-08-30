import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import './favorite.css'
import { Popover } from 'antd'
import {IMAGE_BASE_URL} from '../../Config'

function FavoritePage() {



    const [Favorites, setFavorites] = useState([])
    
    // 영화정보를 몽고디비에서 가져오기

    useEffect(() => {
        

        fetchFavordMovie()


    }, [])

    const fetchFavordMovie = () =>{
        Axios.post('/api/favorite/getFavorite',{userFrom: localStorage.getItem('userId')})
        .then(response =>{
            if(response.data.success){
                console.log(response.data)
                setFavorites(response.data.favorites)
            }else{
                alert('영화 정보를 가져오는 데 실패했습니다.')
            }
        })

    }

    const onClickDelete = (movieId, userFrom)=>{
        const variables = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(response=>{
            if(response.data.success){
                fetchFavordMovie()
            }else{
                alert('리스트에서 지우는 데 실패했습니다')
            }
        })
    }


    const renderCards = Favorites.map((favorite, idx)=>{

        const content=(
            <div>
                {favorite.moviePost?
                <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} />
                :'No Image'
                }
            </div>
        )

        return(
        <tr key={idx}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>    
            </Popover>
            
            <td>{favorite.movieRunTime}</td>
            <td><button onClick={ () => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td>
        </tr>)

    })

    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <th>Remove From Favorites</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
            
        </div>
    )
}

export default FavoritePage
