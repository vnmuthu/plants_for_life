import React from 'react';
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import './App.css';

const GET_PLANTS = gql`
  {
    plants {
      id
      common_name
      family_common_name
      year
      image_url
    }
  }
`

const Plant = ({ plant: { common_name, family_common_name, year, image_url } }) => (
  <div className="Card">
    <div>
      <img alt={common_name} className="Card--avatar" src={image_url} width="300" />
      <h2 className="Card--name">{common_name}</h2>
      <p>{family_common_name}</p>
      <p><i>{year}</i></p>
    </div>
  </div>
)

function App() {
  const { loading, error, data } = useQuery(GET_PLANTS)

  if (error) return <h1>Something went wrong!</h1>
  if (loading) return <h1>Loading...</h1>

  return (
    <main className="App">
      <h1>Plants for life</h1>
      {data.plants.map(plant => (
        <Plant key={plant.id} plant={plant} />
      ))}
    </main>
  )
}

export default App
