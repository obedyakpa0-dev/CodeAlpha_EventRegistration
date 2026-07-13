const db = require('../config/db');

const register = async (req, res) => {
    try {
        const user = req.user.id;
        const event = req.params.eventId;
        const result = await db.query('SELECT * FROM events WHERE id = $1', [event]);
        if (!result.rows[0]) return res.status(404).json({ message: 'Event Not Found' });

        const duplicate = await db.query('SELECT * FROM registrations WHERE user_id=$1 AND event_id=$2', [user, event]);
        if (duplicate.rows[0]) return res.status(400).json({ message: 'Event Already Registration' });

        const registration = await db.query('INSERT INTO registrations (user_id, event_id) VALUES ($1, $2) RETURNING *', [user, event]);
        res.status(201).json({ message: 'registration Complete', data: registration.rows[0] });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' });
    };
};


const getRegistration = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await db.query('SELECT r.*, e.title, e.event_date, e.location FROM registrations r JOIN events e ON r.event_id = e.id WHERE r.user_id = $1', [userId]);
        res.status(200).json({ data: result.rows });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' });
    }
}
const cancelRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const result = await db.query('DELETE FROM registrations WHERE id = $1 AND  user_id =$2 RETURNING *', [id, userId]);
        if (!result.rows[0]) return res.status(404).json({ message: 'Registration Not Found' })
        res.status(200).json({message: 'Registration Cancelled'})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { register, getRegistration, cancelRegistration };