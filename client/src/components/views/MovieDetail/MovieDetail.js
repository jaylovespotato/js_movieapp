import { Row } from 'antd'
import React, {useEffect, useState, Fragment} from 'react'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config'
import GridCards from '../commons/GridCards'
import MainImage from '../LandingPage/Sections/MainImage'
import Favorite from './Sections/Favorite'
import MovieInfo from './Sections/MovieInfo'

function MovieDetail(props) {


    const movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ToggleActor, setToggleActor] = useState(false)

    useEffect(() => {
        
        const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        
        const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`

        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            
                console.log(response)
                setMovie(response)
            })


        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            
                // console.log(response)
                setCasts(response.cast)

            })
    
        
    }, [])

    const handleToggle=(e)=>{
        setToggleActor(!ToggleActor)
    }
    

    return (
        
            <div style={{width: '100%', margin:'0'}}>
                    {/* Header */}
                {<MainImage 
                    image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                />
                }


            {/* Body */}
            <div style={{width:'85%', margin: '1rem auto' }}>

                <div style={{display:'flex', justifyContent:'flex-end'}}>

                    <Favorite
                        movieInfo={Movie}
                        movieId={movieId}
                        userFrom ={localStorage.getItem('userId')}
                        
                    >

                    </Favorite>
                </div>
                
                
                {/* MovieInfo */}
                <MovieInfo 
                    movie = {Movie}
                />

                <br/>

                {/* Actor Grid */}

                <div style={{display:'flex', justifyContent:'center', margin:'2rem'}}>
                    <button onClick={handleToggle}> Toggle Actor View</button>

                </div>

                {ToggleActor &&
                    <Row gutter={[16,16]}>
                    {Casts && Casts.map((cast, index) =>(
                        <Fragment key={index}>

                            <GridCards
                                
                                image={cast.profile_path?
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    
                                characterName={cast.name}
                            />
                        </Fragment>
                    ))}
                    </Row>
                }
            </div>
        </div>
    )
}

export default MovieDetail
