import { fetchALLMovies } from "./services/omdbApi"


const App = () => {
 
   fetchALLMovies("the")

  return (
    <div>App</div>
  )
}

export default App