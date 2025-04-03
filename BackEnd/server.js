const express = require("express");
const cors = require("cors");
const session = require("express-session");

const {
  userExists,
  getEmployerData,
  getEmployeeData,
} = require("./db/USER_DB");


const authRoutes = require("./Routes/authRoute");
const userRoutes = require("./Routes/userRoute");
const jobRoutes = require("./Routes/jobRoute");

const app = express();
const port = 3001;

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", ///////////// <--- CHANGE THIS TO DOMAIN
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

app.use(express.json()); // turns incoming to json

app.use(
  session({
    secret: "BmEkM%Dj`tcyT_q^)Q#N;pU?5yeavqX{2Z:{JKF{", // NOTE TO SELF, CHANGE THE SECRET
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 86400000, // Session expires in 1 day (in milliseconds)
      sameSite: "strict"
    },
  })
);

app.use('/auth', authRoutes) // login, logout, register (all post)

app.use('/user', userRoutes) // getProfileInfo (get), editProfile (put) /user/getProfileInfo

app.use('/jobs', jobRoutes) // getJobs (get), postJobs (post) /jobs/getJobs

// just temporary get, to see if the server is running
app.get("/temp", (req, res) => {
  res.send("Hello!")
  console.log("Welcome to the JobsInMalta API");
}); /// EXAMPLE OF SESSION

app.put("/editUser", (req, res) => { // <--- Still have to make
  // edit user
  console.log("User editting attempt:", JSON.stringify(req.body));
  if (req.session.user_id && userExists(req.session.user_id).success) {
    if (req.session.role === "employer") {
      // editEmployer()
    } else if (req.session.role === "employee") {
      // editEmployee(req.body)
    } else if (req.session.role === "admin") {
      // editAdmin()
    }
    // check what user wants to edit
    // edit what user wanted to edit
    // return a promise
  } else {
    // user isnt logged in
  }
});



app.put("/jobs", (req, res) => { // <--- STILL have to make
  // edit a job listing
  //// ADD VALIDATION TO CHECK IF THEY ARE AN EMPLOYER ACCOUNT.
  //// ADD VALIDATION TO CHECK IF THEY;RE THE CORRECT OWNER.
  console.log("Job editting attempt:", JSON.stringify(req.body));
  const job_id = parseInt(req.body.id);
  const user_id = parseInt(req.body.user_id);
});

app.delete("/jobs", (req, res) => { // <--- STILL have to make
  // delete a job listing
});

// REMOVE LOCALHOST ONCE YOU GET DOMAIN: TODO
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); // REMOVE LOCALHOST ONCE YOU GET DOMAIN: TODO
});
