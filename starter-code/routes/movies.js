const express = require('express');
const Movies = require('../models/Movies');
const router = express.Router();


router.get('/movies', (req, res) => {
    Movies.find()
    .then((allTheMoviesFromDB) => {
        res.render('celebrities/index', {movies: allTheMoviesFromDB});  
    })
    .catch((err) => {
        res.render('error', { err });
    })
});




router.get('/movies/new', (req, res) => {
    Movies.find()
    .then((allTheMoviesFromDB) => {
        res.render('movies/new', {movies: allTheMoviesFromDB});
    })
});


router.post('/movies/new', (req, res) => {
   let {title, genre, plot} = req.body;
   Movies.create({
       title,
       genre,
       plot
   }).then(() => {
       res.redirect('/movies/index');
   })
   .catch((err) => {
    res.render('/movies/new');
})
});

router.post('/movies/:id/delete', (req, res) => {
    let moviesId = req.params.id;
    Movies.findByIdAndRemove(moviesId, {
        isDeleted: true
    }).then(() => {
        res.redirect('/movies');
    })
    .catch((err) => {
        res.render('error', {err});
    })
});

router.get('/movies/:id/edit', (req, res) => {
    let moviesId = req.params.id;
    Movies.findById(moviesId)
    .then(theMovieFound => {
        res.render('movies/edit', { movies: theMovieFound});
    })
    .catch(err => {
        res.render('error', { err });
    })
  });
  
  //POST I'm persisting the changes on the database
  router.post('/movies/:id/edit', (req, res) => {
    let moviesId = req.params.id;
    let { title, genre, plot} = req.body;
    Movies.findByIdAndUpdate(moviesId, {
      title,
      genre,
      plot
    }).then(() => {
      res.redirect(`/movies/${moviesId}`);
    });
  });


  router.get('/movies/:id', (req, res) => {
    let moviesId = req.params.id;
    Movies.findById(moviesId)
    .then((theMovieFound) => {
        res.render('movies/show', {movies: theMovieFound});
    })
    .catch((err) => {
        res.render('error', {err});
    })
});



module.exports = router;