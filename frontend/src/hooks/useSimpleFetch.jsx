// import React, { useEffect } from "react";
// import axios from "axios";
// import routes from "../contexts/routes";
// import { useDispatch, useSelector } from "react-redux";
// import getAuthHeader from "../util/getHeader";
// import getNormalized from "../util/getNormalized";
// import { actions as usersActions } from "../slices/usersSlice.js";
// import { actions as messagesActions } from "../slices/messagesSlice.js";
// // import { actions as channelsActions } from "../slices/channelsSlice.js";
// // const dispatch = useDispatch();

// // const fetchData = async () => {
// //   const { data } = await axios.get(routes.dataPath(), {
// //     headers: getAuthHeader(),
// //   });

// //   const normalizedData = getNormalized(data);
// //   console.log("normalizedData", JSON.stringify(normalizedData, null, 2));
// //   const { users, channels, messages } = normalizedData.entities;

// //   dispatch(usersActions.addUsers(users));
// //   dispatch(channelsActions.addChannels(channels));
// //   dispatch(messagesActions.addComments(messages));
// // };
