const express = require('express')
const app = express();
const path = require('path');
const port = 3000 || 4000
const userModel = require('./models/user.model');

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.get('/', async (req, res) => {
  try {
    // Latest 4 users fetch karo, naya user upar
    const showUsers = await userModel
      .find()
      .sort({ _id: -1 })   // descending order, newest first
      .limit(4);           // sirf 4 users

    res.render("index", { users: showUsers });
  } catch (err) {
    console.log(err);
    res.send("Error");
  }
})

app.post('/create', async (req, res) => {
  const data = req.body;
  const user = await userModel.create({
    name: data.name,
    age: data.age,
    number: data.number,
    role: data.role,
    email: data.email,
    image: data.image,
  })
  res.redirect('/')
})

app.get('/read', async (req, res) => {
  const users = await userModel.find() // ya sare user ko fetch kara ga hamera liya
  res.render('read', { users });
})

app.get('/delete/:id' , async (req,res)=>{
  try{
    const deleteduser = await userModel.findOneAndDelete({_id:req.params.id})
    res.redirect("/read");
  }catch(err) {
     console.log(err);
    res.status(500).send("Server Error ❌");
  }

})

app.get('/edit/:id', async (req, res) => {
  const userUpdate = await userModel.findById(req.params.id)
  res.render('edit' , {userUpdate})
})

app.post('/update/:id' , async (req,res)=>{
  const data = req.body
  const id = req.params.id
  const updatedUser = await userModel.findOneAndUpdate({_id : id} , {$set : data} , {new : true})
  
  res.redirect('/read')
})

app.listen(port, (req, res) => {
  console.log(`your server is running in the port ${port}`)
})