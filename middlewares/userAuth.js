const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
try {
    console.log("heyy from auth middleware");
    next()
} catch (error) {
    console.log(error);
}







}
module.exports = authMiddleware