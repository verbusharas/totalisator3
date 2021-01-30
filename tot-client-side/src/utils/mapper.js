const convertFriendshipsToFriends = (userId, friendships) => {

    const acceptedFriendships = friendships.filter(fs=>fs.isAccepted);
    return acceptedFriendships.map(fs => {
        return fs.requester.id === userId ? fs.receiver : fs.requester;
    });

}

export default convertFriendshipsToFriends;