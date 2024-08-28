module.exports = {

  getHomePage: (req,res) => {

    let querySQL = `SELECT * FROM designers`;

    db.query(querySQL,(err, result) => {

      if (err) {

        console.log(err.message);
        return res.status(500).send(`<h1>ERROR: ${err.message} \n
             while performing \n
             ${querySQL}</h1>`);

      }

      res.render('index.ejs', {
        title: 'Fragrances',
        fragrance: result,
        hostingDir
      })

    })
  },
}

