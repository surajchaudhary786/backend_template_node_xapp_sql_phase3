const Admin=require('./../models/table2');    //import the user table here   //This model will be used to create objects in post method

const db = require("./../config/database"); //to import config file


exports.view = async function (req, res) {
    let query = `SELECT * FROM table2s`;
    const [results] = await db.query(query);
    console.log(results);
    res.render("admin.ejs", { project: results }); //This project will contain rows which will dynamically shown in home.ejs
  };

exports.form = (req, res) => {
    res.render("ad_sign_up.ejs");
};

exports.post = async (req, res) => {
    try {
        console.log("try")
        Admin.create({          //{see the first line user}
            ad_name: req.body.name, //req.body.(check in the form attribute name of name)
            p_word: req.body.pass, //req.body.(check in the form attribute name of email)
        });
        res.redirect("/admin/");   //if you use redirect it must be handled in api or else use render
    } catch {
        console.log("catch")
      res.redirect("/sign_up");
    }
  };