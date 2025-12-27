const Logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  return;
}

export default Logout;