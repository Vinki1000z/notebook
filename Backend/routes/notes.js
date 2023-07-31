const express = require("express");
const router = express.Router();
const note = require("../models/notes_schema");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//  endpoint
// /api/note/getalnotes
router.get("/allnotes", fetchuser, async (req, res) => {
  const allnote = await note.find({ user: req.user.id });
  // console.log(allnote.json());
  res.json(allnote);
});

// endpoint
//  /api/notes/createnote
router.post(
  "/createnote",
  body("title", "Title Must Be Of 5 Char").isLength({ min: 5 }),
  body("description", "description Must Be Of 5 Char").isLength({ min: 5 }),
  fetchuser,
  async (req, res) => {
    // const silence = new Kitten({ name: 'Silence' });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { description, title } = req.body;
      const new_note = new note({
        title: title,
        description: description,
        user: req.user.id,
      });
      await new_note.save();
      // res.send(new_note);
      res.json({msg:"Note Created Successfully",role:"success"})
    } catch (error) {
      res.json({msg:error.message ,role:"warning"})

      // res.status(400).json({ error: error.message });
    }
  }
);

//  endpoint
//  /api/notes/editnote
router.put("/editnote/:id", fetchuser, async (req, res) => {
  // res.send("hii");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, description } = req.body;
    let UpadtedNote = {};

    let exist = await note.findById(req.params.id);
    if (exist.user.toString() !== req.user.id) {
      return res.send("Not Allowed");
    }
    if (!exist) {
      return res.send("NO such note available");
    }
    if (title) {
      UpadtedNote.title = title;
    }
    if (description) {
      UpadtedNote.description = description;
    }
    // main point
    // let user=await Notes.findById(req.params.id).select("user");
    //  declated above
    // console.log("this is note id")
    // do this insted of doing above
    // console.log(note.user.toString())
    UpadtedNote = await note.findByIdAndUpdate(req.params.id, UpadtedNote, {
      new: true,
    });
    console.log(UpadtedNote);
    res.send("data is updated");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//  endpoint
//  /api/notes/delet
router.delete("/delete/:id", fetchuser, async (req, res) => {
  try {
    let exist = await note.findById(req.params.id);
    if (exist.user.toString() !== req.user.id) {
       res.json({msg:"Not Allowed",role:"warning"})
    }
    if (!exist) {
      res.json({msg:"Not Such Note Is Present",role:"warning"})
    }
    await note.findByIdAndRemove(req.params.id);
    res.json({msg:"Note Is Deleted",role:"success"})

  } catch (error) {
    res.json({msg:error.message ,role:"warning"})
  }
});
// endpoint
//  /api/note/allnote
router.get("/allnote", fetchuser, async (req, res) => {
  try {
    let exist = await note.findById(req.params.id);
    if (exist.user.toString() !== req.user.id) {
      return res.send("not allowed");
    }
    if (!exist) {
      return res.send("NO such note available");
    }
    await note.findByIdAndRemove(req.params.id);
    res.send("data is deleted");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
