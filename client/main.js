PlayersList = new Mongo.Collection('players');

Template.template.helpers({
    'player': function () {
        var currentUserId = Meteor.userId();
        return PlayersList.find({ createdBy: currentUserId }, { sort: { score: -1, name: 1 } });
    },
    'selectedClass': function () {
        var playerID = this._id;
        var selectedPlayer = Session.get('selectedPlayer');
        if (playerID == selectedPlayer)
        { return "selected" }
    },
    'selectedPlayer': function () {
        var selectedPlayer = Session.get('selectedPlayer');
        return PlayersList.findOne({ _id: selectedPlayer });
    }
});
Template.template.events({
    'click .player': function () {
        var playerID = this._id;
        Session.set('selectedPlayer', playerID);
        console.log(playerID);
    },
    'click .increment': function () {
        var selectedPlayer = Session.get('selectedPlayer');
        Meteor.call('incrementScore',selectedPlayer);
        //PlayersList.update({ _id: selectedPlayer }, { $inc: { score: 5 } });
    },
    'click .decrement': function () {
        var selectedPlayer = Session.get('selectedPlayer');
        Meteor.call('decrementScore',selectedPlayer);
       // PlayersList.update({ _id: selectedPlayer }, { $inc: { score: -5 } });
    },
    'click .remove': function () {
        var selectedPlayer = Session.get('selectedPlayer');
        console.log('remove click');
         console.log(selectedPlayer);
        Meteor.call('removePlayer',selectedPlayer);
       // PlayersList.remove({ _id: playerToRemove });
    }
});
Template.addPlayerForm.events({
    'submit form': function (event) {
        event.preventDefault();
        var newPlayerName = event.target.playerName.value;      
        Meteor.call('createPlayer',newPlayerName);
        event.target.playerName.value = "";        
    }
});

Meteor.subscribe('thePlayers');

