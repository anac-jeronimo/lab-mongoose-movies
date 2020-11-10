const express = require('express');
const Celebrity = require('../models/Celebrity');
const router = express.Router();


router.get('/celebrities', (req, res) => {
    Celebrity.find()
    .then((allTheCelebsFromDB) => {
        res.render('celebrities/index', {celebrity: allTheCelebsFromDB});  
    })
    .catch((err) => {
        res.render('error', { err });
    })
});




router.get('/celebrities/new', (req, res) => {
    Celebrity.find()
    .then((allTheCelebsFromDB) => {
        res.render('celebrities/new', {celebrity: allTheCelebsFromDB});
    })
});


router.post('/celebrities/new', (req, res) => {
   let {name, occuppation, catchphrase} = req.body;
   Celebrity.create({
       name,
       occuppation,
       catchphrase
   }).then(() => {
       res.redirect('/celebrities/index');
   })
   .catch((err) => {
    res.render('/celebrities/new');
})
});

router.post('/celebrities/:id/delete', (req, res) => {
    let celebrityId = req.params.id;
    Celebrity.findByIdAndRemove(celebrityId, {
        isDeleted: true
    }).then(() => {
        res.redirect('/celebrities');
    })
    .catch((err) => {
        res.render('error', {err});
    })
});

router.get('/celebrities/:id/edit', (req, res) => {
    let celebritiesId = req.params.id;
    Celebrity.findById(celebritiesId)
    .then(theCelebFound => {
        res.render('celebrities/edit', { celebrities: theCelebFound});
    })
    .catch(err => {
        res.render('error', { err });
    })
  });
  
  //POST I'm persisting the changes on the database
  router.post('/celebrities/:id/edit', (req, res) => {
    let celebritiesId = req.params.id;
    let { name, occupation, catchPhrase} = req.body;
    Celebrity.findByIdAndUpdate(celebritiesId, {
      name,
      occupation,
      catchPhrase
    }).then(() => {
      res.redirect(`/celebrities/${celebritiesId}`);
    });
  });


  router.get('/celebrities/:id', (req, res) => {
    let celebrityId = req.params.id;
    Celebrity.findById(celebrityId)
//    .populate('name')
    .then((theCelebrityFound) => {
        res.render('celebrities/show', {celebrities: theCelebrityFound});
    })
    .catch((err) => {
        res.render('error', {err});
    })
});



module.exports = router;
