const router = require('express').Router()
const { User, Room } = require('../db/models/')
const io = require('../socket')

const toObj = arr => {
  const res = {}
  arr.forEach(el => res[el._id] = el)
  return res
}

router.get('/', async (req, res, next) => {
  try {
    const data = await User.find()
    const parsedData = toObj(data)
    res.json(parsedData)
  } catch (error) {
    console.log(error)
  }
})

router.get('/testSocket', async (req, res, next) => {
  console.log(io)
  const rooms = await Room.getRoomsForSockets()
  res.json(rooms)
})

router.get('/:userId/buddies/', async (req, res, next) => {
  console.log('GET buddies')
  try {
    const userId = req.params.userId
    const buddies = await User.getBuddies(userId)
    res.json(toObj(buddies))
  } catch (err) {
    console.log('there was an error ', err)
  }
})

router.get('/:userId/rooms/', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const rooms = await Room.find({ users: userId})
    console.log('get rooms  user is ', userId, ' rooms are ', rooms)
    res.json(toObj(rooms))
  } catch (err) {
    console.log('there was an error ', err)
  }
})

router.post('/:userId/buddies/', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const buddyId = req.body.buddyId
    console.log('the buddyId is ', buddyId, ' the body is ', req.body)
    const user = await User.findById(userId)
    if(!user.buddies.includes(buddyId)) user.buddies.push(buddyId)
    await user.save()
    const buddy = await User.findById(buddyId).select('_id email userName')
    res.json(buddy)
  } catch (err) {
    console.log('there was an error ', err)
  }
})

router.post('/', async (req, res, next) => {
  res.send('this is the POST route!')
  try {
    await User.create(req.body)
  } catch (err) {
    console.log('there was an error ', err)
  }
})

router.put('/', async (req, res, next) => {
  res.send('this is the PUT route!')
})


module.exports = router
