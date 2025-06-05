function shuffleCards() {

    const cards = [
        {
            name: "dog",
            image: "./images/memory/dog.jpg",
        },
        {
            name: "cat",
            image: "./images/memory/cat.jpg",
        },
        {
            name: "fish",
            image: "./images/memory/fish.jpg",
        },
        {
            name: "horse",
            image: "./images/memory/horse.jpg",
        },
        {
            name: "cow",
            image: "./images/memory/cow.jpg",
        },
        {
            name: "kangaroo",
            image: "./images/memory/kangaroo.jpg",
        },
        {
            name: "bird",
            image: "./images/memory/bird.jpg",
        },
        {
            name: "bunny",
            image: "./images/memory/bunny.jpg",
        },
        {
            name: "lizard",
            image: "./images/memory/lizard.jpg",
        },
    ];


    const doubleCards = [...cards, ...cards].map((card, id) => ({
        ...card,
        id: id,
        flipped: false,
        matched: false,
    }));

    let currentIndex = doubleCards.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [doubleCards[currentIndex], doubleCards[randomIndex]] = [
            doubleCards[randomIndex],
            doubleCards[currentIndex],
        ];
    }

    return doubleCards;
}

export default shuffleCards