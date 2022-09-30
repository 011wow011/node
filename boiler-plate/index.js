const express = require('express')
const app = express()
const port = 5000
const { User } = require("./models/User")

const config = require('./config/key')

//application/json
app.use(express.urlencoded({extended: true}));

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://togking:123421ss@cluster0.11ui1bz.mongodb.net/?retryWrites=true&w=majority' ,{
    useNewUrlParser: true
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World! 안녕하세요'))

app.post('/register', (req, res) => {

    //회원 가입 할때 필요한 정보들을 client에서 가져오면
    //데이터 베이스에 넣어준다.
    // {
    //     id: "hello",
    //     password: "123"
    // }

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))