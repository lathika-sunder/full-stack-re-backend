const express = require('express');
const app = express();
const path=require('path')
const dotenv = require('dotenv');
const connect=require('./database/connection')
const cors=require('cors')
const enterprisesRouter=require('./routes/enterprisesRoute')
const individualsRouter=require('./routes/individualsRoute')
const scrapDealersRouter=require('./routes/scrapDealersRoute')
const usersRouter=require('./routes/usersRoute')
const electricProducts=require('./data/electricProducts.json')

app.use(cors())
dotenv.config();

connect()

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1/enterprises',enterprisesRouter)
app.use('/api/v1/individuals',individualsRouter)
app.use('/api/v1/scrap-dealers',scrapDealersRouter)
app.use('/api/v1/users',usersRouter)


app.get('/api/v1/electricProducts',(request,response)=>{
    response.status(200).json(electricProducts);
}
)

app.get('/',(request,response)=>{
    response.status(200).json( {message:"Welcome to the API"})
})

const PORT = process.env.PORT || 4040;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
