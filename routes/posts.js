import express from 'express'
const router = express.Router();

import posts from '../data/posts.js';
import comments from '../data/comments.js';
import error from '../utilities/error.js';

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "posts/:id",
        rel: ":id",
        type: "GET",
      },
    ];
    if (req.query.userId) {
      const { userId } = req.query;
      const post = posts.filter((p) => p.userId == userId);

      //console.log("user  :", post.length);
      res.json({posts: post, links });
    } else if(posts) {
      res.json({ posts, links });
    }else{
      next();
    }
  })
  .post((req, res, next) => {
    if (req.body.userId && req.body.title && req.body.content) {
      const post = {
        id: posts[posts.length - 1].id + 1,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
      };

      posts.push(post);
      res.json(posts[posts.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const post = posts.find((p) => p.id == req.params.id);

    const links = [
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "PATCH",
      },
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "DELETE",
      },
    ];

    if (post) res.json({ post, links });
    else next();
  })
  .patch((req, res, next) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
          posts[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  })
  .delete((req, res, next) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        posts.splice(i, 1);
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  });

router
  .route("/:id/comments")
  .get((req, res, next) => {
    
    const links = [
      {
        href: `/${req.params.id}/comments`,
        rel: "",
        type: "PATCH",
      },
      {
        href: `/${req.params.id}/comments`,
        rel: "",
        type: "DELETE",
      },
    ];

    const post = posts.find((p) => p.id == req.params.id);
    let comment = comments.filter((c) => c.postId == post.id);

    if (req.query.userId) {
      const { userId } = req.query;
      comment = comments.filter((c) => c.userId == userId);
    }
      
    if (comment) {
      res.json({ comments:comment, links });
    }else if (comments) {
      res.json({ comments, links });
    }else {
      next();
    }
  });

export default router