const Event = require("../models/Event");

const createEvent = async (req, res) => {
  const { title, description, date, location } = req.body;
  try {
    const newEvent = new Event({ title, description, date, location });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const getEventById = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    
    const trimmedId = id.trim();
  try {
    const event = await Event.findById(trimmedId);
    if(!event) return res.status(404).json({message:"Event not found"})
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const updateEvent= async (req, res) => {
    const { id } = req.params;
    const trimmedId = id.trim();
    try {
      const updatedEvent = await Event.findByIdAndUpdate(trimmedId,req.body,{new:true});
      console.log(updatedEvent)
      if(!updatedEvent) return res.status(404).json({message:"Event not found"})
      res.status(200).json(updatedEvent);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
};

const deleteEvent= async (req, res) => {
    const { id } = req.params;
    const trimmedId = id.trim();
    try {
      const deletedEvent = await Event.findByIdAndDelete(trimmedId);
      if(!deletedEvent) return res.status(404).json({message:"Event not found"})
      res.status(200).json({message:"event deleted successfully"});
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = { 
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
};
