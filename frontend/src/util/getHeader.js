const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

export default getAuthHeader;
