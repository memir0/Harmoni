//@flow
import {Event, User, Location, Organiser} from "./modelDao";

const Dao = require("./dao.js");


module.exports = class OrganiserDao extends Dao {

    getEvent(
        event_id: number,
        callback: (status: string, data: Object) => mixed
    ) {
        let email: string = "org@email.com";
        var queryString = "SELECT e.* FROM event e LEFT JOIN event_organisers eo ON e.event_id = eo.event_id WHERE eo.organiser_email = ? AND e.event_id = ?";
        super.query(queryString, [email, event_id], callback);
    }

    editEvent(
        event: Event,
        callback: (status: string, data: Event) => mixed
    ) {
        super.query(
            "UPDATE event SET name=?,image=?,description=?,start=?,status=?,is_public=?,location_id=?, venue=?, end=? WHERE event_id=?",
            [
                event.name,
                event.image,
                event.description,
                event.start,
                event.status,
                event.is_public,
                event.location_id,
                event.venue,
                event.end,
                event.event_id
            ],
            callback
        );
    }

    deleteEvent(
        event_id: number,
        callback: (status: string, data: Object) => mixed
    ) {
        super.query(
            "DELETE FROM event WHERE event_id=?",
            [event_id],
            callback
        );
    }

    postEvent(
        event: Event,
        callback: (status: string, data: Event) => mixed
    ) {
        super.query(
            "INSERT INTO event (name, description, image, start, status, is_public, location_id, venue, end) VALUES (?,?,?,?,?,?,?,?)",
            [
                event.name,
                event.description,
                event.image,
                event.start,
                event.status,
                event.is_public,
                event.location_id,
                event.venue,
                event.end
            ],
            callback
        );
    }

    // Get all groups based on an organiser id.
    getGroup(
        event_id: number,
        callback: (status: string, data: Object) => mixed
    ) {
        let email = "test@test.com"; // Change with VERIFY
        let queryString = "SELECT * FROM volunteer_type WHERE organiser_email = ? AND volunteer_type_id = ?";
        super.query(queryString, [email, event_id], callback);
    }

    // Get all ticket types based on an event id.
    getEventTickets(
        event_id: number,
        callback: (status: string, data: Object) => mixed
    ) {
        let queryString = "SELECT et.price, tt.* FROM event_ticket et LEFT JOIN ticket_type tt ON et.ticket_type_id = tt.ticket_type_id WHERE et.event_id = ?";
        super.query(queryString, [event_id], callback);
    }


    getArtist(
        email: string,
        callback: (status: string, data: Object) => mixed
    ) {
        var queryString = "SELECT a.* FROM artist a LEFT JOIN user u ON u.user_id = a.user_id WHERE u.email = ?";
        super.query(queryString, [email], callback);
    }
    // Creates event organiser
    postEventOrganiser(
        event_id: number,
        callback: (status: string, data: number) => mixed
    ) {
        let email: string = "org@email.com";
        super.query(
            "INSERT INTO event_organiser VALUES (?,?)",
            [
                event_id,
                email
            ],
            callback
        );
    }
    // Deletes organisers for an event
    deleteEventOrganisers(
        event_id: number,
        callback: (status: string, data: Object) => mixed
    ) {
        super.query(
            "DELETE FROM event_organiser WHERE event_id = ?",
            [event_id],
            callback
        );
    }
    // Deletes volunteers for an event
    deleteEventVolunteers(
        event_id: number,
        callback: (status: string, data: Object) => mixed
    ) {
        super.query(
            "DELETE FROM event_volunteer WHERE event_id = ?",
            [event_id],
            callback
        );
    }
    // Deletes artists for an event
    deleteEventArtists(
        event_id: number,
        callback: (status: string, data: Object) => mixed
    ) {
        super.query(
            "DELETE FROM event_artist WHERE event_id = ?",
            [event_id],
            callback
        );
    }
    // Deletes files for an event
    deleteEventFiles(
        event_id: number,
        callback: (status: string, data: Object) => mixed
    ) {
        super.query(
            "DELETE FROM event_file WHERE event_id = ?",
            [event_id],
            callback
        );
    }
    // Deletes tickettypes for an event
    deleteEventTickets(
        event_id: number,
        callback: (status: string, data: Object) => mixed
    ) {
        super.query(
            "DELETE FROM event_ticket WHERE event_id = ?",
            [event_id],
            callback
        );
    }
    // Deletes riders for an event
    deleteEventRiders(
        event_id: number,
        callback: (status: string, data: Object) => mixed
    ) {
        super.query(
            "DELETE FROM rider WHERE event_id = ?",
            [event_id],
            callback
        );
    }
    // Deletes schedule for an event
    deleteEventSchedule(
        event_id: number,
        callback: (status: string, data: Object) => mixed
    ) {
        super.query(
            "DELETE FROM schedule WHERE event_id = ?",
            [event_id],
            callback
        );
    }
};
