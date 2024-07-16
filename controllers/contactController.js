const  asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req,res) => {
    // res.send("get all contacts");
    const contacts =await  Contact.find({user_id:req.user.id});   // manages the conatct for differnet user id only when login with that user his conatcts will ne displayed 
    res.status(200).json(contacts);
 });

 //@desc Get a contact for id
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req,res) => {
    // res.send("get all contacts");
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json(contact)
 });

 //@desc create  contacts
//@route post /api/contacts
//@access private

const createContact = asyncHandler(async(req,res) => {
    
    console.log("the request body is :" ,req.body);
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact=await Contact.create({
        name,email,phone,user_id:req.user.id
    });
    res.status(201).json(contact);
 });

 //@desc update a contact
//@route put /api/contacts/:id
//@access private

const updateContact = asyncHandler(async(req,res) => {
    // res.send("get all contacts");
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if(contact.user_id.toString() !==req.user.id){
        req.status(403);
        throw new Error("A user don't have permission to update others contacts")
    }


    const updateContact=await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});

    res.status(200).json(updateContact);
 });

//@desc delete  contact for id 
//@route delete /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    if(contact.user_id.toString() !==req.user.id){
        req.status(403);
        throw new Error("A user don't have permission to update others contacts")
    }
    await Contact.findByIdAndDelete(req.params.id);  // or allso we can use await Contact.deleteOne({_id:req.params.id});
    res.status(200).json({ message: "Contact deleted successfully" });
});

 //@desc delete all contacts
//@route delete /api/contacts
//@access private

const deleteContacts = asyncHandler(async (req,res) => {
    // res.send("get all contacts");
    if(Contact.user_id.toString() !==req.user.id){
        req.status(403);
        throw new Error("A user don't have permission to update others contacts")
    }
    // await Contact.deleteMany({});
    await Contact.remove();
    res.status(200).json("the contacts are deleted successfully",Contact);
 });


 module.exports={
    getContacts,
    deleteContacts,
    deleteContact,
    updateContact,
    createContact,
    getContact
};
