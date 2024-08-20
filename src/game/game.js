class Game {
  constructor() {
    this.lockMode = false;
    this.firstCard = null;
    this.secondCard = null;
    this.characters = [
      "Mascara_Africana",
      "Berimbau",
      "Baoba",
      "tambor-africano",
      "Pente_Afro",
      "Mancala",
      "cocar",
      "Orixa_Oxossi",
      "Mascara_Tikar",
      "Ceramica_Marajoara",
    ];
    this.cards = [];
  }

  setCard(id) {
    let card = this.cards.filter((card) => card.id === id)[0];

    if (card.flipped || this.lockMode) {
      return false;
    }

    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }
  }

  checkMatch() {
    if (!this.firstCard || !this.secondCard) {
      return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
  }

  clearCards() {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  }

  unflipCards() {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  }

  checkGameOver() {
    return this.cards.filter((card) => !card.flipped).length === 0;
  }

  createCards() {
    this.cards = [];

    this.characters.forEach((character) => {
      this.cards.push(...this.createPair(character));
    });

    this.shuffleCards();
    return this.cards;
  }

  createPair(character) {
    return [
      {
        id: this.createId(character),
        icon: character,
        flipped: false,
      },
      {
        id: this.createId(character),
        icon: character,
        flipped: false,
      },
    ];
  }

  createId(character) {
    return character + parseInt(Math.random() * 1000);
  }

  shuffleCards() {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.cards[randomIndex], this.cards[currentIndex]] = [
        this.cards[currentIndex],
        this.cards[randomIndex],
      ];
    }
  }
}

export default new Game();
