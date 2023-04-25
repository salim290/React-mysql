import express from "express";
import mysql from "mysql";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());



const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mqttpy'
});


app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/mqttpy", (req, res) => {
  const q = "SELECT id, topic, value , DATE_FORMAT(time,'%a, %Y %M %e %H:%i:%s') AS newtime FROM mqttpy";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/mqttpy", (req, res) => {
  const q = "INSERT INTO mqttpy(`message`) VALUES (?)";

  const values = [
    req.body.title,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/mqttpy/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM mqttpy WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
app.delete("/mqttpy", (req, res) => {

  const q = "TRUNCATE TABLE mqttpy";

  db.query(q, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/mqttpy/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE mqttpy SET `message`= ? WHERE id = ?";

  const values = [
    req.body.message,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(1884, () => {
  console.log("Connected to backend.");
});
