const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ options: false }));

app.listen(PORT, () => {
  console.log(`your server is running on PORT ${PORT}`);
});
