const router = require("express").Router();
const { Room, User, MeetingItem } = require("../db/models/");

const toObj = (arr) => {
  const res = {};
  arr.forEach((el) => (res[el._id.toString()] = el));
  return res;
};

router.get("/:roomId/items", async (req, res, next) => {
  console.log("GET api/rooms/roomId/items: getting all of your meetings items");
  try {
    const roomId = req.params.roomId;
    const { items } = await Room.findById(roomId).select("items");
    res.json(toObj(items));
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  console.log("GET api/rooms: getting all of your rooms");
  try {
    const data = await Room.find();
    const parsedData = toObj(data);
    res.json(parsedData);
  } catch (err) {
    next(err);
  }
});

router.post("/:roomId/items", async (req, res, next) => {
  console.log("POST api/rooms/roomId/items: creating new meeting item");
  try {
    const roomId = req.params.roomId;
    const room = await Room.findById(roomId);
    const { name, description, status, defaultView } = req.body;
    const newItem = await room.addItem({
      roomId,
      name,
      description,
      status,
      defaultView: defaultView === "" ? "rating" : defaultView,
    });
    res.json(newItem);
  } catch (err) {
    next(err);
  }
});

router.put("/:roomId/items/:itemId/rating", async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const itemId = req.params.itemId;
    console.log('RATING IS NOW ', req.body.rating)
    await Room.findOne({ _id: roomId }).findOneAndUpdate(
      { "items._id": itemId },
      {
        $set: {
          "items.$.rating": req.body.rating,
        },
      },
      {new: true}
    )
    const {items} = await Room.findOne(
      { _id: roomId, "items._id": itemId },
      { "items.$": 1 }
    );
    res.json(items[0]);
  } catch (err) {
    next(err);
  }
});

router.put("/:roomId/items/:itemId", async (req, res, next) => {
  console.log("PUT api/rooms/roomId/items/:itemId ", req.body.status);
  try {
    const roomId = req.params.roomId;
    const itemId = req.params.itemId;
    const _room = await Room.findById(roomId).findOneAndUpdate(
      { "items._id": itemId },
      {
        $set: {
          "items.$.inFocus": req.body.inFocus,
          "items.$.status": req.body.status ? req.body.status : "open",
        },
      }
    );
    const { items } = await Room.findById(roomId).select("items");
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.get("/:roomId/users", async (req, res, next) => {
  console.log("GET api/rooms/roomId/users: getting all of your rooms users");
  try {
    const roomId = req.params.roomId;
    const { users: userIds } = await Room.findById(roomId).select("users");
    const userData = await User.findUsersByIds(userIds);
    res.json(toObj(userData));
  } catch (err) {
    next(err);
  }
});

// delete room
router.delete("/:roomId", async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    await Room.deleteRoom(roomId);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

// delete user from room
router.delete("/:roomId/:userId", async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const userId = req.params.userId;
    const { users } = await Room.findOneAndUpdate(
      { _id: roomId },
      { $pull: { users: userId } },
      { new: true }
    )
      .select("users")
      .populate("users");
    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { rooms: roomId } },
      { new: true }
    );
    res.json(toObj(users));
  } catch (err) {
    next(err);
  }
});

router.get("/:roomId/messages", async (req, res, next) => {
  console.log(
    "GET api/rooms/roomId/messages: getting all of your rooms messages"
  );
  try {
    const roomId = req.params.roomId;
    const { messages } = await Room.findById(roomId).select("messages");
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

router.put("/:roomId/user", async (req, res, next) => {
  console.log("this is the rooms PUT /user route!");
  try {
    const roomId = req.params.roomId;
    const userId = req.body.userId;
    const room = await Room.findById(roomId);
    console.log(roomId, userId, room);
    await room.addUser(userId);
    const buddy = await User.findById(userId);
    res.json(buddy);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  console.log("this is the POST route!");
  try {
    const userId = req.body.ownerId;
    const roomName = req.body.roomName;
    const room = await Room.createRoomWithOwner(roomName, userId);
    res.json(room);
  } catch (err) {
    next(err);
  }
});

router.post("/:roomId", async (req, res, next) => {
  console.log("rooms POST a message");
  try {
    const roomId = req.params.roomId;
    const room = await Room.findById(roomId);
    const newMessage = await room.addMessage(req.body);
    res.json(newMessage);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
