// @flow

import axios, { AxiosPromise } from 'axios';
import { Event, Artist, Organiser } from './modelService.js';
const url_base = 'http://localhost:4000/organiser';
// axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
// console.log(localStorage.getItem('token'));
const config = {
  headers: {
    'x-access-token': localStorage.getItem('token'),
  },
};
export class OrganiserService {
  static createEvent(event: Event) {
    console.log(event);
    let url = url_base + '/event';
    return axios.post<Object>(url, event, config);
  }
  static updateEvent(event: Event) {
    console.log(event);
    let url = url_base + '/event/' + event.event_id;
    return axios.put<Object>(url, event, config);
  }

  static deleteEvent(id: number): AxiosPromise<Event> {
    console.log('Service delete startet');
    let url = url_base + '/event/' + id;
    return axios.delete<Object>(url, config);
  }

  static getEvent(id: number): AxiosPromise<Event> {
    let url = url_base + '/event/' + id;
    return axios.get(url, config);
  }

  static getOrganiser(): AxiosPromise<Organiser> {
    let url = url_base + '/myprofile';
    return axios.get<Organiser>(url, config);
  }
  static editOrganiser(organiser: Organiser): AxiosPromise<Organiser> {
    let url = url_base + '/myprofile';
    return axios.put<Object>(url, organiser, config);
  }
  static getLocations(): AxiosPromise<Location[]> {
    let url = url_base + '/location';
    return axios.get(url, config);
  }
  static postLocation(location: Location) {
    let url = url_base + '/location';
    return axios.post(url, location, config);
  }
  static inviteArtist(email: string, event_id) {
    let url = url_base + '/artist/' + event_id;
    return axios.post(url, { email: email }, config);
  }
  static getMyEvents(): AxiosPromise<Event[]> {
    let url = url_base + '/myevents';
    return axios.get(url, config);
  }
  static getArtists(event_id: number): AxiosPromise<Artist[]> {
    let url = url_base + '/artist/' + event_id;
    return axios.get(url, config);
  }
  static updateArtistEvent(artist: Artist, event_id: number) {
    let data = {
      event_id: event_id,
      contract: artist.contract,
      notes: artist.notes,
      accepted: artist.accepted,
    };
    let url = url_base + '/artist/' + artist.user_id;
    return axios.put(url, data, config);
  }

  static getRiders(artist_id: number, event_id: number) {
    let url = url_base + '/' + event_id + '/artist/' + artist_id + '/riders';
    return axios.get(url, config);
  }

  static postRider(event_id: number) {
    let url = url_base + '/' + event_id + '/artist';
    return axios.post(url, event_id, config);
  }
}