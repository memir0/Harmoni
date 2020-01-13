import * as React from 'react';
import { Component } from 'react';
import Footer from '../components/Footer/Footer';
import Menu from '../components/Menu/Menu';
import EventList from '../components/event/EventList/EventList';
import ProfileOrganiser from '../components/profile/ProfileOrganiser/ProfileOrganiser';
import Filter from '../components/Filter/Filter';
import EventDeleted from '../components/event/EventDeleted/EventDeleted';

export default class Main extends Component {
    render() {
        return (
            <div>
            <EventDeleted />
            </div>
        )
    }
}