PlayersList = new Mongo.Collection('players');
Meteor.publish('thePlayers', function () {
    console.log('return mongo');
    var currentUserId = this.userId;
    return PlayersList.find({ createdBy: currentUserId });
});
Meteor.methods({
    'createPlayer': function (playerNameVar) {
        check(playerNameVar, String);
        var currentUserId = Meteor.userId();
        if (currentUserId) {
            console.log('dfvavafv');
            PlayersList.insert({ name: playerNameVar, score: 0, createdBy: currentUserId });
        }
    },
    'removePlayer': function (selectedPlayer) {
        debugger;
        check(selectedPlayer, String);
        console.log('sdfvsdf');
        var currentUserId = Meteor.userId();
        PlayersList.remove({ _id: selectedPlayer, createdBy: currentUserId });
    },
    'incrementScore': function (selectedPlayer) {
        var currentUserId = Meteor.userId();
        PlayersList.update({ _id: selectedPlayer, createdBy: currentUserId}, { $inc: { score: 5 } });
    },
    'decrementScore': function (selectedPlayer) {
        var currentUserId = Meteor.userId();
        PlayersList.update({ _id: selectedPlayer, createdBy:currentUserId }, { $inc: { score: -5 } });
    }
});