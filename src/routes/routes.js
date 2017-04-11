import Item from '../../models/itemSchema';
import User from '../../models/userSchema';
import hash from 'password-hash';
import jwt from 'jsonwebtoken';
import config from '../../config';
import express from 'express';

let app = express();
let router =  express.Router();


router.use(function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.set('superSecret', config.secret);

router.route('/item')
  .post(function(req, res, next){

    let item = new Item();
    item.owner = req.body.owner;
    item.description = req.body.description;
    item.condition = req.body.condition;
    item.category = req.body.category;
    item.url = req.body.url;

    item.save(function(err, item) {
      if(err) {
        return next(err);
      }
      else {
        res.json(item);
      }
    });
  })
  .get(function(req, res, next){
    Item.find().populate('owner').exec(function(err, item){
      if(err){
        next(err);
      } else {
        res.json(item);
      }
    });
  });

router.route('/item')
  .get(function(req, res, next){
    Item.findById(req.params.item._id, function(err, item){
      if(err){
        next(err);
      } else {
        res.json(item);
      }
    });
  });



router.route('/user')
  .post(function(req, res, next) {

    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.neighborhood = req.body.neighborhood;
    user.password = hash.generate(req.body.password);
    user.profile = req.body.profile;
    user.bio = req.body.bio;


    user.save(function(err, user) {
      if(err) {
        next(err);
      }
      else {
        res.json(user);
      }
    });
  })
  .get(function(req, res, next){
    User.find().exec(function(err, users){
      if(err){
        next(err);
      } else {
        res.json(users);
      }
    });
  });



router.post('/authenticate', function(req, res, next) {
          // find the user
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) {
      next(err);
    } else if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (!hash.verify(req.body.password, user.password)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        let token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 86400 // expires in 24 hours
        });

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          id: user._id,
          name: user.name,
          email: user.email,
          neighborhood: user.neighborhood,
          bio: user.bio,
          profile: user.profile

        });
      }

    }

  });
});

router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
});

export default router;
