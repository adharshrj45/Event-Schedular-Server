const Session = require('../models/Session');

// Create a session for an event
const createSession = async (req, res) => {
  const { eventId } = req.params;
  const { title, startTime, endTime, speaker } = req.body;

  try {
    // Ensure no overlapping sessions for the same event
    const overlappingSession = await Session.findOne({
      eventId,
      $or: [
        { startTime: { $lt: endTime, $gte: startTime } },
        { endTime: { $gt: startTime, $lte: endTime } },
      ],
    });

    if (overlappingSession) {
      return res.status(400).json({ message: 'Session time conflicts with an existing session.' });
    }

    const newSession = new Session({ eventId, title, startTime, endTime, speaker });
    await newSession.save();
    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update a session
const updateSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const updatedSession = await Session.findByIdAndUpdate(sessionId, req.body, { new: true });

    if (!updatedSession) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.status(200).json(updatedSession);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete a session
const deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const deletedSession = await Session.findByIdAndDelete(sessionId);

    if (!deletedSession) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.status(200).json({ message: 'Session deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get all sessions for an event
const getSessionsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const sessions = await Session.find({ eventId });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

const getSessionById = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await Session.findById(sessionId);
    console.log(session);
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

module.exports = { createSession, updateSession, deleteSession, getSessionsByEvent, getSessionById };
