'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _itemSchema = require('../../models/itemSchema');

var _itemSchema2 = _interopRequireDefault(_itemSchema);

var _userSchema = require('../../models/userSchema');

var _userSchema2 = _interopRequireDefault(_userSchema);

var _passwordHash = require('password-hash');

var _passwordHash2 = _interopRequireDefault(_passwordHash);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var router = _express2.default.Router();

router.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.set('superSecret', _config2.default.secret);

router.route('/item').post(function (req, res, next) {

  var item = new _itemSchema2.default();
  item.owner = req.body.owner;
  item.description = req.body.description;
  item.condition = req.body.condition;
  item.category = req.body.category;
  item.url = req.body.url;

  item.save(function (err, item) {
    if (err) {
      return next(err);
    } else {
      res.json(item);
    }
  });
}).get(function (req, res, next) {
  _itemSchema2.default.find().populate('owner').exec(function (err, item) {
    if (err) {
      next(err);
    } else {
      res.json(item);
    }
  });
});

router.route('/item').get(function (req, res, next) {
  _itemSchema2.default.findById(req.params.item._id, function (err, item) {
    if (err) {
      next(err);
    } else {
      res.json(item);
    }
  });
});

router.route('/user').post(function (req, res, next) {

  var user = new _userSchema2.default();
  user.name = req.body.name;
  user.email = req.body.email;
  user.neighborhood = req.body.neighborhood;
  user.password = _passwordHash2.default.generate(req.body.password);
  user.profile = req.body.profile;
  user.bio = req.body.bio;

  user.save(function (err, user) {
    if (err) {
      next(err);
    } else {
      res.json(user);
    }
  });
}).get(function (req, res, next) {
  _userSchema2.default.find().exec(function (err, users) {
    if (err) {
      next(err);
    } else {
      res.json(users);
    }
  });
});

router.post('/authenticate', function (req, res, next) {
  console.log('Authenticating....', req.body.email);
  // find the user
  _userSchema2.default.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) {
      next(err);
    } else if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (!_passwordHash2.default.verify(req.body.password, user.password)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = _jsonwebtoken2.default.sign(user, app.get('superSecret'), {
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

router.use(function (req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    _jsonwebtoken2.default.verify(token, app.get('superSecret'), function (err, decoded) {
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

exports.default = router;