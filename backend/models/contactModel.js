const pool = require('../services/db');

const Contact = {
  async create({ name, company, role, email }) {
    try {
      // Check if a contact with same name + email already exists
      const existing = await pool.query(
        'SELECT * FROM contacts WHERE name=$1 AND email=$2',
        [name, email]
      );

      if (existing.rows.length > 0) {
        const error = new Error('Contact with this name and email already exists');
        error.status = 409; // Conflict
        throw error;
      }

      const result = await pool.query(
        'INSERT INTO contacts (name, company, role, email) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, company, role, email]
      );
      return result.rows[0];
    } catch (err) {
      // If already given a status, bubble it up
      if (!err.status) {
        err.status = 500; // Internal Server Error
        err.message = 'Failed to create contact';
      }
      throw err;
    }
  },

  async update(id, { name, company, role, email }) {
    try {
      const result = await pool.query(
        'UPDATE contacts SET name=$1, company=$2, role=$3, email=$4 WHERE id=$5 RETURNING *',
        [name, company, role, email, id]
      );

      if (result.rows.length === 0) {
        const error = new Error('Contact not found');
        error.status = 404;
        throw error;
      }

      return result.rows[0];
    } catch (err) {
      if (!err.status) {
        err.status = 500;
        err.message = 'Failed to update contact';
      }
      throw err;
    }
  },

  async getAll() {
    try {
      const result = await pool.query('SELECT * FROM contacts ORDER BY id DESC');
      return result.rows;
    } catch (err) {
      err.status = 500;
      err.message = 'Failed to fetch contacts';
      throw err;
    }
  },

  async getById(id) {
    try {
      const result = await pool.query('SELECT * FROM contacts WHERE id=$1', [id]);

      if (result.rows.length === 0) {
        const error = new Error('Contact not found');
        error.status = 404;
        throw error;
      }

      return result.rows[0];
    } catch (err) {
      if (!err.status) {
        err.status = 500;
        err.message = 'Failed to fetch contact';
      }
      throw err;
    }
  },

  async delete(id) {
    try {
      const result = await pool.query('DELETE FROM contacts WHERE id=$1 RETURNING *', [id]);

      if (result.rows.length === 0) {
        const error = new Error('Contact not found');
        error.status = 404;
        throw error;
      }

      return { message: 'Contact deleted successfully' };
    } catch (err) {
      if (!err.status) {
        err.status = 500;
        err.message = 'Failed to delete contact';
      }
      throw err;
    }
  },
};

module.exports = Contact;
