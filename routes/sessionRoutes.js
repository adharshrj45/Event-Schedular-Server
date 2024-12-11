const express = require('express');
const {
  createSession,
  updateSession,
  deleteSession,
  getSessionsByEvent,
  getSessionById
} = require('../controller/sessionController');

const router = express.Router();

// Create a session for an event
router.post('/:eventId', createSession);

// Update a session
router.put('/:sessionId', updateSession);

// Delete a session
router.delete('/:sessionId', deleteSession);

// Get sessions for a specific event
router.get('/:eventId', getSessionsByEvent);

router.get('/edit/:sessionId', getSessionById);

module.exports = router;
