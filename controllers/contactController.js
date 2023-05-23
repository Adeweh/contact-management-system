const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");


const getContacts = asyncHandler( async(req, res) =>{
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(201).json(contacts);
});

const getContact = asyncHandler( async(req, res) =>{
    const contact = await Contact.findById (req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

const createContact = asyncHandler( async(req, res) =>{
    console.log("Request body is :",req.body);
    const { name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("Fields must be filled");
    }
    const contact = await Contact.create(
        {
            name,
            email,
            phone,
            user_id: req.user.id
        }
    );
    res.status(201).json(contact);
});

const updateContact =asyncHandler( async(req, res) =>{
    const contact = await Contact.findById (req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user_id){
        res.status(403);
        throw new Error("No permission to update");

    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact)});

const deleteContact =asyncHandler( async (req, res) =>{
    const contact = await Contact.findById (req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user_id){
        res.status(403);
        throw new Error("No permission to delete");

    }
    await Contact.deleteOne({ _id: req.params.id});
    res.status(200).json(contact);
});


module.exports = {getContacts, getContact, createContact, updateContact, deleteContact}
