/* Itens da loja do avatar. Para adicionar um item, acrescente uma linha na categoria. */
LG.shop = {
  categories: [
    { id: 'face', name: 'Rosto', items: [
      { id: 'face-smile', name: 'Sorriso', emoji: '🙂', price: 0 },
      { id: 'face-grin', name: 'Animado', emoji: '😄', price: 0 },
      { id: 'face-cool', name: 'Estiloso', emoji: '😎', price: 30 },
      { id: 'face-nerd', name: 'Nerd', emoji: '🤓', price: 30 },
      { id: 'face-party', name: 'Festeiro', emoji: '🥳', price: 50 },
      { id: 'face-cat', name: 'Gatinho', emoji: '😺', price: 60 },
      { id: 'face-robot', name: 'Robô', emoji: '🤖', price: 80 },
      { id: 'face-alien', name: 'Alienígena', emoji: '👽', price: 100 },
    ] },
    { id: 'hat', name: 'Chapéu', items: [
      { id: 'hat-cap', name: 'Boné', emoji: '🧢', price: 25 },
      { id: 'hat-top', name: 'Cartola', emoji: '🎩', price: 50 },
      { id: 'hat-grad', name: 'Formatura', emoji: '🎓', price: 80 },
      { id: 'hat-crown', name: 'Coroa', emoji: '👑', price: 150 },
      { id: 'hat-wizard', name: 'Mago', emoji: '🧙', price: 120 },
    ] },
    { id: 'pet', name: 'Mascote', items: [
      { id: 'pet-dog', name: 'Cachorro', emoji: '🐶', price: 40 },
      { id: 'pet-cat', name: 'Gato', emoji: '🐱', price: 40 },
      { id: 'pet-owl', name: 'Coruja', emoji: '🦉', price: 70 },
      { id: 'pet-fox', name: 'Raposa', emoji: '🦊', price: 90 },
      { id: 'pet-dragon', name: 'Dragão', emoji: '🐲', price: 200 },
    ] },
    { id: 'bg', name: 'Cenário', items: [
      { id: 'bg-sky', name: 'Céu', color: '#cfe8ff', price: 0 },
      { id: 'bg-mint', name: 'Menta', color: '#c9f2d3', price: 0 },
      { id: 'bg-sun', name: 'Sol', color: '#ffe6a3', price: 20 },
      { id: 'bg-rose', name: 'Rosa', color: '#ffd0e0', price: 20 },
      { id: 'bg-night', name: 'Noite', color: '#2b2d5b', price: 60 },
      { id: 'bg-lava', name: 'Lava', color: '#ff9a76', price: 60 },
    ] },
  ],
  powerups: [
    { id: 'hearts', name: 'Recarregar vidas', emoji: '❤️', price: 40, desc: 'Enche suas 5 vidas na hora.' },
  ],
};
