const db = require('../config/db');

const getEvent = async (req, res) => {
    try {
        const data = await db.query(
            'SELECT * FROM events ORDER BY event_date ASC'
        );
        res
          .status(200)
          .json({ data: data.rows });
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
};
const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await db.query('SELECT * FROM events WHERE id= $1',[id]);
        if (!data.rows[0]) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json({ data: data.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
};
const createEvent = async (req, res) => {
    try {
        const { title, description, location, event_date, capacity } = req.body;
        const event = await db.query(
          "INSERT INTO events (title, description, location, event_date, capacity) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          [title, description, location, event_date, capacity],
        );
        res.status(201).json({ message: 'Event created', data: event.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
};
const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, location, event_date, capacity } = req.body;
        const data = db.query(
          "UPDATE events SET title=$1, description=$2, location=$3, event_date=$4, capacity=$5 WHERE id=$6 RETURNING *",
          [title, description, location, event_date, capacity]
        );
        res.status(200).json({ data: data.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
};
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const data = db.query(
          "DELETE FROM events WHERE id = $1",[id]
        );
        res
          .status(200)
          .json({ message: "Event Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    };

};



module.exports = {
    getEvent,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};