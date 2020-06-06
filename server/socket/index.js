const { Room, User } = require("../db/models");

// const rooms = Room.getRoomsForSockets()
const onlineUsers = {};

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id, " has made a persistent connection to the server!");

    // debugging
    socket.on("LOG_STATE", () => {
      console.log("ONLINE USERS ARE ", onlineUsers);
      console.log("ROOMS ARE ", socket.rooms);
    });

    socket.on("ADD_MESSAGE", (message) => {
      io.to(message.roomId).emit("ADD_MESSAGE", message);
    });

    socket.on("CREATE_ROOM", (room) => {
      const ownerId = room.owners[0];
      socket.emit("CREATE_ROOM", room);
      if (ownerId in onlineUsers) {
        socket.join(room._id);
      }
    });

    socket.on("ADD_BUDDY_TO_ROOM", (buddy) => {
      io.emit("ADD_BUDDY_TO_ROOM", buddy);
      // handle so those that are added are connected to new room
      const userId = buddy._id;
      if (userId in onlineUsers) {
        io.to(onlineUsers[userId]).emit("GET_ROOMS", userId);
        io.to(onlineUsers[userId]).emit("JOIN_ROOMS", buddy);
      }
    });

    socket.on('REMOVED_BUDDY_FROM_ROOM', (roomId, userId) => {
      console.log('removing buddy from room')
      if(userId in onlineUsers) {
        io.to(onlineUsers[userId]).emit("GET_ROOMS", userId)
        // remove current room if buddy has it open
        io.to(onlineUsers[userId]).emit("REMOVE_CURRENT_ROOM", roomId)
      }
    })

    socket.on("GET_USER", (user) => {
      if (!(user._id in onlineUsers)) {
        onlineUsers[user._id] = socket.id;
      }
      const buddies = user.buddies || [];
      buddies.forEach((buddyId) => {
        if (!(buddyId in onlineUsers)) return;
        const buddySocket = onlineUsers[buddyId];
        console.log("telling your buddies you are online ", buddySocket);
        io.to(buddySocket).emit("GOT_CONNECTED_BUDDY", user._id);
        //add buddy to list of user's online buddies
        io.to(onlineUsers[user._id]).emit("GOT_CONNECTED_BUDDY", buddyId);
      });

      if (!user.rooms) return;
      user.rooms.forEach((room) => {
        socket.join(room);
        socket.emit("JOINED_ROOM", room);
        console.log(user.userName, " has joined rooms ", socket.rooms);
      });
    });

    // handle meeting items
    socket.on("DISPATCH_ITEM_ACTION", (roomId, itemOrItems, actionType) => {
      io.to(roomId).emit("DISPATCH_ITEM_ACTION", itemOrItems, actionType);
    });

    socket.on("disconnect", async () => {
      const onlineIds = Object.values(onlineUsers);
      let userId;
      for (let k in onlineUsers) {
        if (onlineUsers[k] === socket.id) userId = k;
        console.log("current user disconnect has id of ", userId);
      }
      const user = await User.findById(userId);
      const buddies = user.buddies || [];
      buddies.forEach((id) => {
        console.log("checking disconnecting users buddies if they are online");
        if (id in onlineUsers) {
          let buddySocketId = onlineUsers[id];
          socket.to(buddySocketId).emit("GOT_DISCONNECTED_BUDDY", userId);
        }
      });
      const clientId = Object.keys(onlineUsers).find(
        (key) => onlineUsers[key] === socket.id
      );
      console.log("found client id is", clientId);
      delete onlineUsers[clientId];
      console.log("deleted last user.  online users are ", onlineUsers);
    });

    socket.on("logout", async () => {
      let userId;
      for (let k in onlineUsers) {
        if (onlineUsers[k] === socket.id) userId = k;
      }
      const user = await User.findById(userId);
      const buddies = user.buddies || [];
      buddies.forEach((id) => {
        if (id in onlineUsers) {
          let buddySocketId = onlineUsers[id];
          socket.to(buddySocketId).emit("GOT_DISCONNECTED_BUDDY", userId);
        }
      });
    });

    console.log("online users are ", onlineUsers);
  });
};
