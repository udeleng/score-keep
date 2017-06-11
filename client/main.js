import React from 'react';
import ReactDom from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Players } from './../imports/api/players';

const renderPlayers = ( playersList ) => {
    return playersList.map(( player ) => {
        return (
            <p key={player._id}>
                { player.name } has { player.score } point(s).
                <button onClick={() => Players.remove({_id: player._id})}>X</button>
            </p>
        );
    });
};

const handleSubmit = (e) => {
    let playerName = e.target.playerName.value;
    e.preventDefault();
    if (playerName) {
        e.target.playerName.value = '';
        Players.insert({
            name: playerName,
            score: 0
        });
    }
};

Meteor.startup(() => {
    Tracker.autorun(() => {
        let players = Players.find().fetch();
        let title = 'Score Keep';
        let name = 'Moshe';
        let jsx = (
            <div>
                <h1>{ title }</h1>
                <p>Hello {name}!</p>
                <p>This is my second p.</p>
                { renderPlayers( players ) }
                <form onSubmit={handleSubmit}>
                    <input type="text" name="playerName" placeholder="Player name"/>
                    <button>Add Player</button>
                </form>
            </div>
        );
        ReactDom.render(jsx, document.getElementById('app'));
    });
});