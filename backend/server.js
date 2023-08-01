const express = require('express')
const cors = require('cors');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const pdffile = fs.readFileSync('sample.pdf');

const app = express()
const port = 5000

app.use(cors());

// To use req.body we will use middleware "app.use"
app.use(express.json());

app.listen(port, () => {
  console.log(`backend listening on port ${port}`)
})

pdfParse(pdffile).then(function (data) {
  // console.log(data.numpages);

  // console.log(data.info);

  return data.text;
})

// To check that connection is working or not
app.get('/msg', (req, res) => {
  pdfParse(pdffile).then(function (data) {
    // console.log(data.numpages);
  
    // console.log(data.info);
  
    // return data.text;
    res.send(data.text);
  });
});