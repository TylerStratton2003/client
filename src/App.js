import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [gameData, setGameData] = useState([]);
  const [title, setTitle] = useState('')
  const [tag1, setTag1] = useState('')
  const [tag2, setTag2] = useState('')

  useEffect(() => {
    // This effect will run whenever gameData is updated
    console.log('GameData updated:', gameData);
  }, [gameData]);

  const submitHandler = e => {
    axios.get('http://localhost:8080/title',{ params: {title: title}}).then((response) => {
      console.log(response.data)
      setGameData(response.data)
      console.log(gameData)
      setTitle('')
    })
  }

  const submitOther = e => {
    axios.get('http://localhost:8080/tags',{ params: {tag1: tag1, tag2: tag2}}).then((response) => {
      console.log(response.data)
      setGameData(response.data)
      console.log(gameData)
      setTag1('')
      setTag2('')
    })
  }

  const submitNORM = e => {
    axios.get('http://localhost:8080').then((response) => {
      console.log(response.data)
      setGameData(response.data)
      console.log(gameData)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Vapor: Game Recommendation System</p>
        <button onClick={submitNORM}>Show All</button>
        <form onSubmit={submitHandler}>
          <label for="search">Search:</label>
          <input type="text" name="search" id="search" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter game name..."></input>
          <div>
            <input type="submit" value="Search"></input>
          </div>
        </form>
        <form onSubmit={submitOther}>
          <label for="tag1">Tag 1:</label>
          <input type="text" name="tag1" id="tag1" value={tag1} onChange={(e) => setTag1(e.target.value)}></input>
          <label for="tag2">Tag 2:</label>
          <input type="text" name="tag2" id="tag2" value={tag2} onChange={(e) => setTag2(e.target.value)}></input>
          <label for="win">Windows:</label>
          <input type="submit" value="Search"></input>
        </form>
      </header>
      <div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Release Date</th>
              <th>Windows</th>
              <th>Mac</th>
              <th>Linux</th>
              <th>Rating</th>
              <th>Positive Ratio</th>
              <th>User Reviews</th>
              <th>Price</th>
              <th>Steam Deck</th>
            </tr>
          </thead>
          <tbody>
            {gameData.map((game) => (
              <tr key={game.app_id}>
                <td>{game.title}</td>
                <td>{game.date_release}</td>
                <td>{game.win ? 'Yes' : 'No'}</td>
                <td>{game.mac ? 'Yes' : 'No'}</td>
                <td>{game.linux ? 'Yes' : 'No'}</td>
                <td>{game.rating}</td>
                <td>{game.positive_ratio}</td>
                <td>{game.user_reviews}</td>
                <td>{game.price_original}</td>
                <td>{game.steam_deck ? 'Yes' : 'No'}</td>
              </tr>
            ))}
            {gameData.length === 0 && <tr><td colSpan="10">No data available</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}



export default App;
