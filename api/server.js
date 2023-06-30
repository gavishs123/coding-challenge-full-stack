require('dotenv').config()
const app =require("./app");

app.listen(process.env.PORT || 3001, (ur) => {
  console.log(`API listening at http://localhost:${3001}`);
});
