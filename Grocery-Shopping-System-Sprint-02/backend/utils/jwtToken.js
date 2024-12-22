const getToken = (user, res) => {

    const token = user.getJWTToken();
  
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    return token;
  };
  
  module.exports = getToken;