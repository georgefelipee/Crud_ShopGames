const express = require('express');
const app = express()
const mysql = require('mysql')
const cors = require('cors')
//
const  db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"crudgames"
});
//
app.use(cors())
app.use(express.json()) //transformar os dados do front em JSON
app.listen(3001,()=>{
    console.log("Rodando Servidor")
})
//Registrando o Game //CREATE ->
app.post('/register',(req,res)=>{
    const { name } = req.body;  //igual req.body.name
    const { cost } = req.body;
    const { category } = req.body;

    let SQL = "INSERT INTO games( name, cost, category ) VALUES ( ?,?,? )"
    db.query(SQL,[name,cost,category],(err,result) =>{
        if(err) console.log(err)
        else res.send(result)
    })
})
//Carregando no front os games cadastrados //READ ->
app.get('/getCards',(req,res)=>{

    let SQL = "SELECT * from games"
    db.query(SQL,(err,result)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})
//Editando arquivos //UPDATE ->
app.put('/edit',(req,res)=> {
    const {id} = req.body;
    const {name} = req.body;
    const {cost} = req.body;
    const {category} = req.body;

    let SQL = "UPDATE games SET name= ?, cost=?, category=? WHERE idgames= ? "

    db.query(SQL,[name,cost,category,id],(err,result)=>{
        if(err) console.log(err)
        else(res.send(result))
    })
})
//Deletando ->
app.delete('/delete/:id',(req,res)=>{
    const { id } = req.params

    let SQL = "DELETE FROM games WHERE idgames= ?"

    db.query(SQL,[id],(err,result)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})
