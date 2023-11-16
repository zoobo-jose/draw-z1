const http = require('http');
const mongoose=require('mongoose');
const app= require('./app');
mongoose.connect('mongodb+srv://eric:passwordpassword@cluster0.my5omv4.mongodb.net/?retryWrites=true&w=majority',
{}).then(()=>{
    console.log("=== > mongo DB connected");
})
.catch((error)=>{
    console.log("=== > mongo DB not connected",error);
})
app.set('port',process.env.PORT||3000);
const server= http.createServer(app);
server.listen(process.env.PORT||3000);