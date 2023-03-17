import { useEffect } from "react";
import io from "socket.io-client";

const socket = io();

// return () => {
//   socket.off("connect");
//   socket.off("disconnect");
// };

export default socket;
