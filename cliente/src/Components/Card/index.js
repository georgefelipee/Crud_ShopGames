import './card.css'
import FormDialog from '../dialog'
import React from 'react';

export default function Card(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickCard = ()=>{
    setOpen(true)
  }

  return (
    <>
      <FormDialog open={open} 
      setOpen={setOpen} 
      id={props.id}
      name={props.name} 
      cost={props.cost} 
      category={props.category}
      listGames={props.listGames}
      setListGames={props.setListGames}
      />
      <div className="card--container" onClick={() => handleClickCard()}>
        <h1 className="card--title"> {props.name} </h1>
        <p className="card--cost">R$  {`${props.cost}`} </p>
        <p className="card--category">{props.category} </p>
      </div>
    </>

  )
}
