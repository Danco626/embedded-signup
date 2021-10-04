//sets the marketing value to app_metadata then removes it from user_metadata before creating the user
//this hook can be used to POST marketing and T&C state to Mattel web hooks when users are created
module.exports = function (user, context, cb) {  
  const response = {};

  user.app_metadata = {marketing: user.user_metadata.marketing};
  user.user_metadata = {};
  response.user = user;

  cb(null, response);
};