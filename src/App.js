import './App.css';
import { useEffect, useState } from "react"
import axios from "axios"
import MovieCard from './components/MovieCard';
import YouTube from 'react-youtube'
import MyInfo from './components/MyInfo';

function App() {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original"
  const API_URL = "https://api.themoviedb.org/3"
  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [selectedMovie, setSelectedMovie] = useState({})
  const [playTrailer, setPlayTrailer] = useState(false)
  const [myinfo, setMyinfo] = useState(false)

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search/movie" : 'discover/movie'

    const { data: { results } } = await axios.get(`${API_URL}/${type}`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        query: searchKey
      }
    })
    await selectMovie(results[0])
    // setSelectedMovie(results[0])
    setMovies(results)
  }

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`,
      {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
          append_to_response: 'videos'
        }
      })
    return data
  }

  const selectMovie = async (movie) => {
    setPlayTrailer(false)
    const data = await fetchMovie(movie.id)
    console.log(data);
    setSelectedMovie(data)
  }


  useEffect(() => {
    fetchMovies()
  }, []);

  const renderMovies = () => (
    movies.map(movie => (
      <MovieCard
        key={movie.id}
        movie={movie}
        selectMovie={selectMovie}
      />
    ))
  )

  const searchMovies = (e) => {
    e.preventDefault()
    fetchMovies(searchKey)

  }
  const renderTrailer = () => {
    const trailer = selectedMovie.videos.results.find(vid => vid.name === 'Official Trailer')
    const key = trailer ? trailer.key : selectedMovie.videos.results[0].key
    return <YouTube
      videoId={key}
      containerClassName={"youtube-container"}
      opts={{
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          controls: 0,
          cc_load_policy: 0,
          fs: 0,
          iv_load_policy: 0,
          modestbranding: 0,
          rel: 0,
          showinfo: 0,
        }
      }}
    />
  }

  return (
    <div className="App">
      <header className='header'>
        <div className='header-content max-center'>
          <span>Movie Trailer App</span>
          <MyInfo />
          <form onSubmit={searchMovies}>
            <input type='text' onChange={(e) => setSearchKey(e.target.value)} />
            <button type={'submit'}  >Search</button>
          </form>
        </div>
      </header>

      <div className='hero' style={{ backgroundImage: `url('${IMAGE_PATH}${selectedMovie.backdrop_path}')` }}>
        <div className='hero-content max-center' >
          {playTrailer ? <button className={"button button--close"} onClick={() => setPlayTrailer(false)}>Close</button> : null}
          {selectedMovie.videos && playTrailer ? renderTrailer() : null}
          <button className={'button'} onClick={() => setPlayTrailer(true)}>Play Trailer</button>
          <h1 className={'hero-title'}>{selectedMovie.title}</h1>
          {selectedMovie.overview ? <p className={'hero-overview'}>{selectedMovie.overview}</p> : null}
        </div>

      </div>


      <div className='container max-center'>
        {renderMovies()}
      </div>
    </div >
  );
}

export default App;
