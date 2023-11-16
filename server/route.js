const express = require('express');
const router= express.Router();
const projet_ctr= require('./controller/projet.controller');

router.post("/projet/create",projet_ctr.create);

router.get("/projets",projet_ctr.getAll);

router.put("/projet/update",projet_ctr.update);

router.delete("/projet/delete",projet_ctr.delete);

module.exports= router;