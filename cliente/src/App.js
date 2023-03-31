import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Card from './Components/Card';

function App() {

  const[values, setValues]= useState() // pegar um objeto values contendo name,cost,category
  const [listGames,setListGames] = useState()
  console.log(listGames)
  useEffect(()=>{
    // carregar todos os itens cadastrados no banco de dados
    axios.get('http://localhost:3001/getCards').then((response)=>{
      setListGames(response.data)
    })
  },[])

  const handleClickButton = (evento) =>{
    
    axios.post("http://localhost:3001/register",{
      name: values.name,
      cost: values.cost,
      category: values.category
    }).then(()=> {
      setListGames([
        ...listGames,
      {
        name: values.name,
        cost:values.cost,
        category:values.category
      }])
    } )
    evento.preventDefault()
    
  }

  const handleChangeValues = value => {
    
    setValues(prevValue => ({
        ...prevValue,
        //pega o 'name' do input
        [value.target.name]: value.target.value
    }));
    }

return (

  <div className="app--container">
      
      <form onSubmit={handleClickButton}>
          <div className='register--container'>
        <h1 className='register--title'> Games Shop </h1>
        <input 
        required
        type="text" 
        name='name' 
        placeholder='Nome' 
        className='register--input' 
        onChange={handleChangeValues}
        />
        <input 
        required
        type="text" 
        name='cost' 
        placeholder='Preço' 
        className='register--input' 
        onChange={handleChangeValues}
        />
        <input 
        required
        type="text" 
        name='category' 
        placeholder='Categoria' 
        className='register--input' 
        onChange={handleChangeValues}
        />
        <button 
        className='register--button'
        >
          Cadastrar </button>

      </div> 
      
      <section className='register--card'>
        { typeof listGames !== "undefined" && listGames.map((game) => {  // se 'listGames' for diferente de undefined, retorna o map do componente card com as propriedas do objeto game
          return <Card 
          listGames={listGames}
          setListGames={setListGames}
          key={game.idgames} 
          id={game.idgames} 
          name={game.name} 
          cost={game.cost} 
          category={game.category} 
          /> 
         }
        )} 
      </section>

    </form>
         
    
      
        
       
  </div>
);
}

export default App;
