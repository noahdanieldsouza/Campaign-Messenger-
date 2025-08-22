const db = require('../services/db');

const Message = {
  async create({ contact_id, message_type, content }) {
    try {
      const result = await db.query(
        `INSERT INTO messages (contact_id, message_type, content)
         VALUES ($1, $2, $3) RETURNING *`,
        [contact_id, message_type, content]
      );

      if (result.rows.length === 0) {
        const error = new Error('Failed to create message');
        error.status = 500;
        throw error;
      }

      return result.rows[0];
    } catch (err) {
      if (!err.status) {
        err.status = 500;
        err.message = 'Failed to create message';
      }
      throw err;
    }
  },

  async getByContactId(contact_id) {
    try {
      const result = await db.query(
        `SELECT * FROM messages WHERE contact_id = $1 ORDER BY created_at DESC`,
        [contact_id]
      );

      if (result.rows.length === 0) {
        const error = new Error('No messages found for this contact');
        error.status = 404;
        throw error;
      }

      return result.rows;
    } catch (err) {
      if (!err.status) {
        err.status = 500;
        err.message = 'Failed to fetch messages';
      }
      throw err;
    }
  },

  async getAnalytics() {
    try {
      // Total messages
      const totalMessagesRes = await db.query(`SELECT COUNT(*) FROM messages`);
      const totalMessages = parseInt(totalMessagesRes.rows[0].count, 10);

      if (isNaN(totalMessages)) {
        const error = new Error('Failed to calculate message analytics');
        error.status = 500;
        throw error;
      }

      // Messages by date
      const messagesByDateRes = await db.query(`
        SELECT TO_CHAR(created_at::date, 'YYYY-MM-DD') as date, COUNT(*) as count
        FROM messages
        GROUP BY date
        ORDER BY date DESC
      `);
      const messagesByDate = {};
      messagesByDateRes.rows.forEach(row => {
        messagesByDate[row.date] = parseInt(row.count, 10);
      });

      // Top contacts by message count
      const topContactsRes = await db.query(`
        SELECT
          contacts.id AS contact_id,
          contacts.name,
          contacts.company,
          COUNT(messages.id) AS message_count
        FROM messages
        JOIN contacts ON messages.contact_id = contacts.id
        GROUP BY contacts.id, contacts.name, contacts.company
        ORDER BY message_count DESC
        LIMIT 5
      `);

      return {
        totalMessages,
        messagesByDate,
        topContacts: topContactsRes.rows
      };
    } catch (err) {
      if (!err.status) {
        err.status = 500;
        err.message = 'Failed to fetch analytics';
      }
      throw err;
    }
  }
};

module.exports = Message;

