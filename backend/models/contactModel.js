const pool = require('../services/db');

const Contact = {
  /**
   * Create a new contact if not already existing (based on name + email).
   * @param {Object} contact - Contact data.
   * @param {string} contact.name - Full name of the contact.
   * @param {string} contact.company - Company name.
   * @param {string} contact.role - Role or title at the company.
   * @param {string} contact.email - Email address.
   * @returns {Promise<Object>} The newly created contact record.
   */
  async create({ name, company, role, email }) {
    try {
      // Prevent duplicate contacts based on name + email
      const existing = await pool.query(
        'SELECT * FROM contacts WHERE name=$1 AND email=$2',
        [name, email]
      );

      if (existing.rows.length > 0) {
        const error = new Error('Contact with this name and email already exists');
        error.status = 409; // Conflict
        throw error;
      }

      // Insert new contact
      const result = await pool.query(
        'INSERT INTO contacts (name, company, role, email) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, company, role, email]
      );

      return result.rows[0];
    } catch (err) {
      if (!err.status) {
        err.status = 500;
        err.message = 'Failed to create contact';
      }
      throw err;
    }
  },

  /**
   * Update an existing contact's information.
   * @param {number} id - ID of the contact to update.
   * @param {Object} contact - Updated contact data.
   * @returns {Promise<Object>} The updated contact record.
   */
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

  /**
   * Get all contacts in the system, ordered by newest first.
   * @returns {Promise<Array>} Array of contact records.
   */
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

  /**
   * Get a single contact by ID.
   * @param {number} id - Contact ID.
   * @returns {Promise<Object>} The contact record.
   */
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

  /**
   * Delete a contact by ID.
   * @param {number} id - Contact ID to delete.
   * @returns {Promise<Object>} Confirmation message.
   */
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

