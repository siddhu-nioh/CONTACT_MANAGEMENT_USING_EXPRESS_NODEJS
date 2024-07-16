const express=require("express");
const router=express.Router();
const {getContacts,
    deleteContacts,
    deleteContact,
    updateContact,
    createContact,
    getContact}=require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

    router.use(validateToken);
router.route('/').get(getContacts).delete(deleteContacts).post(createContact);

 router.route('/:id').get(getContact).delete(deleteContact).put(updateContact); // in this way when having same route recfsuce some lines of code 

//  router.route('/').post(createContact);

//  router.route('/:id').put(updateContact);

//  router.route('/:id').delete(deleteContact);

//  router.route('/').delete(deleteContacts);

 module.exports=router;