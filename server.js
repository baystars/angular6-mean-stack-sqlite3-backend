import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

app.use(cors());
app.use(bodyParser.json());

var db = new sqlite3.Database('data/data.db');
db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS issue (id INTEGER PRIMARY KEY, title TEXT, responsible TEXT, description TEXT, severity TEXT, status TEXT default 'Open')");
});

// curl http://localhost:4000/issues
router.route('/issues').get((req, res) => {
  db.all("SELECT * FROM issue", (err, rows) => {
    if (err) {
      res.json(err);
      res.status(500);
    } else {
      res.json(rows);
      res.status(200);
    }
  });
});

// curl http://localhost:4000/issues/<id>
router.route('/issues/:id').get((req, res) => {
  db.get("SELECT * FROM issue WHERE id = ?", [req.params.id], (err, row) => {
    if (err) {
      res.json(err);
      res.status(500);
    } else {
      res.json(row);
      res.status(200);
    }
  });
});

// curl -H 'Content-Type: application/json' http://localhost:4000/issues/add -d '{"title": "foo", "responsible": "b", "description": "c", "severity": "xxx", "status": "basdf"}'
router.route('/issues/add').post((req, res) => {
    var stmt = db.prepare("INSERT INTO issue(title, responsible, description, severity, status) VALUES(?, ?, ?, ?, ?)");
    stmt.run([req.body.title, req.body.responsible, req.body.description, req.body.severity, req.body.status], (err, row) => {
    if (err){
      res.json(err);
      res.status(400);
      stmt.finalize();
    }
    else {
      res.json('Add successfully');
      res.status(200);
    }
  });
});

// curl -X PUT -H 'Content-Type: application/json' http://localhost:4000/issues/update/1 -d '{"title": "bar", "responsible": "b", "description": "c", "severity": "xxx", "status": "basdf"}'
router.route('/issues/update/:id').post((req, res) => {
  db.get("SELECT * FROM issue WHERE id = ?", [req.params.id], (err, row) => {
    if (err) {
      console.err(err);
      res.status(500);
    } else {
      db.run("UPDATE issue SET title=?, responsible=?, description=?, severity=?, status=? WHERE id=?", [req.body.title, req.body.responsible, req.body.description, req.body.severity, req.body.status, req.params.id], (err, row) => {
        if (err){
          res.json(err);
          res.status(500);
        }
        else {
          res.json('Update successfully');
          res.status(200);
        }
        res.end();
      });
    }
  });
});

// curl -X DELETE  http://localhost:4000/issues/delete/<id>
router.route('/issues/delete/:id').delete((req, res) => {
  db.run("DELETE FROM issue WHERE id = ?", [req.params.id], (err, row) => {
    if (err){
      res.json(err);
      res.status(500);
    }
    else {
      res.json('Removed successfully');
      res.status(202);
    }
    res.end();
  });
});

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));
