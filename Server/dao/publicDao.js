import "./modelDao";
import {Event, Organiser, User} from "./modelDao";
const Dao = require("./dao.js");

module.exports = class PublicDao extends Dao {
  getPublicEvents(sortMethod: string, callback) {
    super.query(
      "SELECT e.*, l.address, l.name as location_name, l.postcode FROM event e LEFT JOIN location l ON l.location_id = e.location_id WHERE e.is_public IS TRUE ORDER BY ?",
      [sortMethod],
      callback
    );
  }

  getPublicEvent(event_id: number, callback) {
    super.query(
      "SELECT e.*, l.address, l.name as location_name, l.postcode FROM event e LEFT JOIN location l ON l.location_id = e.location_id WHERE e.is_public IS TRUE AND e.event_id = ?",
      [event_id],
      callback
    );
  }

  postUser(
      user: User, hash: string, salt: string,
      callback: (status: string, data: Event) => mixed
  ) {
    super.query(
        "INSERT INTO user (email, name, hash, salt) VALUES(?,?,?,?)",
        [
          user.email, user.name,
            hash,salt
            //hent passord hash og salt
        ],
        callback
    );
  }

  postOrganiser(
      organiser: Organiser, hash: string, salt: string,
      callback: (status: string, data: Event) => mixed
  ) {
    super.query(
        "INSERT INTO organiser (organiser_email, hash, salt, name, image, website) VALUES(?,?,?,?,?,?)",
        [
            organiser.organiser_email,
            hash,
            salt,
            organiser.name,
            organiser.image,
            organiser.website
        ],
        callback
    );
  }

  getUserHashAndSalt(
    email: string,
    callback: (status: string, data: Object) => mixed
  ) {
    super.query("Select hash, salt from user WHERE email = ?", email, callback);
  }

  getOrganiserHashAndSalt(
    email: string,
    callback: (status: string, data: Object) => mixed
  ) {
    super.query(
      "Select hash, salt from organiser WHERE organiser_email = ?",
      email,
      callback
    );
  }
};
