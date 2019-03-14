let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let bears = [{'id':5935512001,'name':'Somchai','surname':'Khemklad','Major':'CoE','GPA':3.32},
             {'id':5935512002,'name':'YAYA','surname':'Rakngam','Major':'SE','GPA':3}    
];

let bearIndex=5935512003;

router.route('/bears')
   // get all bears
   .get( (req, res) =>  res.json(bears) ) 

   // insert a new bear
   .post( (req, res)=> {
       var bear = {};
       bear.id =  bearIndex++;
       bear.name = req.body.name
       bear.surname = req.body.surname
       bear.Major = req.body.Major
       bear.GPA = req.body.GPA
       bears.push(bear);
       res.json( {message: 'Bear created!'} )
   })

router.route('/bears/:bear_id')
   .get ( (req,res) => res.json(bears[req.params.bear_id]))  // get a bear

   .put ( (req,res) => {                               // Update a bear
       var id = req.params.bear_id
       bears[id].name = req.body.name;   
       bears[id].surname = req.body.surname;   
       bears[id].Major = req.body.Major;
       bears[id].GPD = req.body.GPA;
       res.json({ message: 'Bear updated!' + req.params.bear_id});
   })

   .delete ( (req,res) => {                   // Delete a bear
       delete     bears[req.params.bear_id]
       res.json({ message: 'Bear deleted: ' + req.params.bear_id});
   })


router.route('/bears').get((req, res) =>  res.json(bears) );

app.use("*", (req,res) => res.status(404).send('404 Not found') );
app.listen(80,  () => console.log("Server is running") );