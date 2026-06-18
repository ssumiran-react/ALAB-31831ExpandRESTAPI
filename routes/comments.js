import express from 'express'
const router = express.Router();

import comments from '../data/comments.js';
import error from '../utilities/error.js';

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "comments/:id",
        rel: ":id",
        type: "GET",
      },
    ];
    if (comments) 
        res.json({ comments, links });
    else 
        next();
    
  })
  .post((req, res, next) => {
    res.send("");
  });

// router
//   .route("/:id")
//   .get((req, res, next) => {
//     const post = posts.find((p) => p.id == req.params.id);

//     const links = [
//       {
//         href: `/${req.params.id}`,
//         rel: "",
//         type: "PATCH",
//       },
//       {
//         href: `/${req.params.id}`,
//         rel: "",
//         type: "DELETE",
//       },
//     ];

//     if (post) res.json({ post, links });
//     else next();
//   })
//   .patch((req, res, next) => {
//     const post = posts.find((p, i) => {
//       if (p.id == req.params.id) {
//         for (const key in req.body) {
//           posts[i][key] = req.body[key];
//         }
//         return true;
//       }
//     });

//     if (post) res.json(post);
//     else next();
//   })
//   .delete((req, res, next) => {
//     const post = posts.find((p, i) => {
//       if (p.id == req.params.id) {
//         posts.splice(i, 1);
//         return true;
//       }
//     });

//     if (post) res.json(post);
//     else next();
//   });



export default router