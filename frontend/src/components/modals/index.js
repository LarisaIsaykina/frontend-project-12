import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const modals = {
  addChat: Add,
  removeChat: Remove,
  renameChat: Rename,
};

const getModal = (modalName) => modals[modalName];

export default getModal;
