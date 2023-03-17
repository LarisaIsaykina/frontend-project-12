// const loadUser = async () => {
//   const { token } = localStorage.getItem("userId");

//   if (!token) {
//     dispatch({
//       type: ERROR,
//     });
//   }
//   setAuthToken(token);

//   try {
//     const res = await axios("/api/auth");

//     dispatch({
//       type: USER_LOADED,
//       payload: res.data.data,
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };
