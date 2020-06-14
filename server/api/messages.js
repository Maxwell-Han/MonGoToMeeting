const router = require('express').Router()
const { Room, User, Message } = require('../db/models/')

const toObj = arr => {
  const res = {}
  arr.forEach(el => res[el._id] = el)
  return res
}

router.get('/', async (req, res, next) => {
  try {
    const data = await Message.find()
    const parsedData = toObj(data)
    res.json(parsedData)
  } catch (error) {
    console.log(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const userId = req.body.userId
    const userName =  req.body.userName
    const roomId = req.body.roomId
    const text = req.body.text
    const data = {userId, userName, roomId, content: text}
    const message = await Message.create(data)
    const room = await Room.findById(roomId)
    await room.messages.push(message)
    await room.save()
    res.json(message)
  } catch (err) {
    console.log('there was an error ', err)
  }
})

module.exports = router
