const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


module.exports = {
  // Users

  // Get a single user from the database given their email.

  getUserWithEmail: (email) => {
    return pool.query(`
      SELECT *
      FROM users
      WHERE email = $1
  `, [email])
      .then((res) => {
        return res.rows[0];
      })
      .catch((err) => {
        return err;
      });
  },

  // Get a single user from the database given their id.

  getUserWithId: (id) => {
    return pool.query(`
    SELECT * 
    FROM users
    WHERE id = $1
  `, [id])
      .then((res) => {
        return res.rows[0];
      })
      .catch((err) => {
        return err;
      });
  },

  // Add a new user to the database.

  addUser: (user) => {
    return pool.query(`
  INSERT INTO users (
    name, email, password) 
    VALUES($1, $2, $3)
    RETURNING *;
  `, [user.name, user.email, user.password])
      .then((res) => {
        return res.rows[0];
      })
      .catch((err) => {
        return err;
      });
  },

  // Reservations

  // Get all reservations for a single user.

  getAllReservations: (guest_id, limit = 10) => {
    return pool.query(`
  SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id 
  WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT 10;
  `, [guest_id])
      .then((res) => {
        return res.rows;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // Properties

  // Get all properties.

  getAllProperties: (options, limit = 10) => {

    const queryParams = [];

    let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    LEFT JOIN property_reviews ON properties.id = property_id
    `;

    if (options.city) {
      queryParams.push(`%${options.city}%`);
      queryString += `WHERE city LIKE $${queryParams.length} `;
    }
    if (options.minimum_price_per_night) {
      queryParams.push(`${options.minimum_price_per_night * 100}`);
      queryString += `${queryParams.length === 1 ? 'WHERE' : 'AND'}  cost_per_night > $${queryParams.length}`;
    }

    if (options.maximum_price_per_night) {
      queryParams.push(`${options.maximum_price_per_night * 100}`);
      queryString += `${queryParams.length === 1 ? 'WHERE' : 'AND'}  cost_per_night < $${queryParams.length}`;
    }

    if (options.minimum_rating) {
      queryParams.push(`${options.minimum_rating}`);
      queryString += ` GROUP BY properties.id 
    HAVING AVG(property_reviews.rating) >= $${queryParams.length} `;
    } else {
      queryString += `GROUP BY properties.id`;
    }

    queryParams.push(limit);
    queryString += `
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;

    return pool.query(queryString, queryParams)
      .then(res => res.rows);
  },

  // Add a property to the database

  addProperty: function (property) {
    return pool.query(`
    INSERT INTO properties (
    title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, province, city, country, street, post_code) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
  `, [
      property.title,
      property.description,
      property.owner_id,
      property.cover_photo_url,
      property.thumbnail_photo_url,
      property.cost_per_night,
      property.parking_spaces,
      property.number_of_bathrooms,
      property.number_of_bedrooms,
      property.province,
      property.city,
      property.country,
      property.street,
      property.post_code])
      .then((res) => {
        return res.rows;
      })
      .catch((err) => {
        return err;
      });
  }
};