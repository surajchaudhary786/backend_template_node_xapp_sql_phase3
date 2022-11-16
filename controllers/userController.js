const User = require("./../models/table1"); //import the user table here   //This model will be used to create objects in post method

const db = require("./../config/database"); //to import config file

exports.view = async function (req, res) {
  let query = `SELECT * FROM table1s`;
  const [results] = await db.query(query);
  console.log(results);
  res.render("user.ejs", { project: results }); //This project will contain rows which will dynamically shown in home.ejs
};

exports.form = (req, res) => {
  res.render("us_sign_up.ejs");
};

exports.post = async (req, res) => {
  try {
    // USING NODE SEQUELIZE -------------------------------------------------------->

    // User.create({
    //   //{see the first line user}
    //   u_name: req.body.name, //req.body.(check in the form attribute name of name)
    //   email: req.body.email, //req.body.(check in the form attribute name of email)
    //   age: req.body.age,
    //   mobile: req.body.mobile,
    // });

    // USING SQL QUERY -------------------------------------------------------------->

    let query = `INSERT INTO table1s(u_name,email,age,mobile) VALUES('${req.body.name}' , '${req.body.email}' , ${req.body.age} , '${req.body.mobile}')`;
    await db.query(query);

    res.redirect("/user/"); //if you use redirect it must be handled in api or else use render
  } catch (err) {
    console.log(err);
  }
};

exports.ulhelp = (req, res) => {
  res.render("us_sign_up_help.ejs");
};

exports.deleteUser = async (req, res) => {
  //USING NODE?EXPRESS----------->

  // let userid = req.params.id;
  // await User.destroy({
  //   where:{
  //     u_id:userid
  //   }
  // });

  // USING SQL QUERY------------->

  let query = `DELETE FROM table1s WHERE u_id=${req.params.id}`;
  await db.query(query);

  res.redirect("/user/");
};

exports.redirectUpdatePage = async (req, res) => {
  // console.log(req.params.id);
  res.render("us_update_form.ejs", { val: req.params.id });
};

exports.updateUser = async (req, res) => {
  // USING NODE?EXPRESS----------->

  // await User.update({u_name : req.body.name ,email : req.body.email, age : req.body.age , mobile : req.body.mobile},{
  //   where:{
  //     u_id : req.params.id,
  //   }
  // })

  // USING SQL QUERY------------->

  let query = `UPDATE table1s SET u_name = '${req.body.name}' , email = '${req.body.email}' , age = ${req.body.age} , mobile = '${req.body.mobile}' WHERE u_id=${req.params.id}`;
  await db.query(query);

  res.redirect("/user/");
};

exports.searchUser = async (req, res) => {
  console.log(req.body.search);
  let query = `SELECT * FROM table1s WHERE u_name LIKE "%${req.body.search}%"`;
  const [results] = await db.query(query);
  console.log(results);
  res.render("us_searched_list.ejs", { project: results }); //This project will contain rows which will dynamically shown in home.ejs
};
