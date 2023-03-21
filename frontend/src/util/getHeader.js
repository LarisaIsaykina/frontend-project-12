const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId) {
    console.log('userId.token', userId.token);
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

export default getAuthHeader;
