import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes/router'
//import singleEmail from '../routes/singleEmail'

const app = express()
app.use(express.json())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) =>
  res.send({ message: ' Welcome to EPIC Mail API' })
)
// configuration of router
app.use('/api/v2', routes)
//app.use('/api/v1', singleEmail)

// Error handling
app.use((req,res,next)=>{
  const error=new Error("Sorry the requested resource could not be found.");
  error.status=404;
  next(error);
})

// catch errors
// app.use((error,req,res,next)=>{
//   res.status(error.status || 500);
//   res.json({
//       error:{
//           message:error.message
//       }
//   })
// })

// eslint-disable-next-line no-undef
const port = process.env.PORT || 4000
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening to port ${port}`))

export default app