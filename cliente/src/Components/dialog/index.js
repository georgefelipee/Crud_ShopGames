import {React,useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { DialogTitle } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from 'axios'

export default function FormDialog(props) {

    const [editValues,setEditValues]= useState({//pega todos os valores editados e os que nao foram editados pelo usuario
      id: props.id,
      name: props.name,
      cost: props.cost,
      category: props.category
    });

    const handleEditGame = ()=>{
      axios.put("http://localhost:3001/edit",{
        id: editValues.id,
        name: editValues.name,
        cost: editValues.cost,
        category: editValues.category
      });
      handleClose()
    }

    const handleDeleteGame= () => {
        axios.delete(`http://localhost:3001/delete/${editValues.id}`)
        handleClose()
    }

    const handleClickOpen = () => {
      props.setOpen(true);
    };
  
    const handleClose = () => {
      props.setOpen(false);
      document.location.reload()
    };
    
    const handleChangeValues = (value) => {
        setEditValues((prevValues) => ({ //pegar os valores editados
          ...prevValues,
          [value.target.id]: value.target.value
      }));
}


  return (
    
      <Dialog 
      open={props.open} 
      onClose={handleClose}>
        <DialogTitle> Editar </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome do Jogo"
            defaultValue={props.name}
            onChange={handleChangeValues}
            type="text"
            fullWidth
            variant="standard"
          />
           <TextField
            autoFocus
            margin="dense"
            id="cost"
            label="Preço"
            defaultValue={props.cost}
            onChange={handleChangeValues}
            type="text"
            fullWidth
            variant="standard"
          />
           <TextField
            autoFocus
            margin="dense"
            id="category"
            defaultValue={props.category}
            onChange={handleChangeValues}
            label="Categoria"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDeleteGame} > Excluir </Button>
          <Button onClick={handleEditGame}>Salvar</Button>
        </DialogActions>
      </Dialog>

  );
}
