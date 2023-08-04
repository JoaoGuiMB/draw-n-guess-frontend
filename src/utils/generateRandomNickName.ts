const adjectives = [
  "happy",
  "sad",
  "brave",
  "shiny",
  "silly",
  "clever",
  "cool",
  "sweet",
  "wild",
  "gentle",
  "playful",
  "jolly",
  "daring",
  "awesome",
  "lucky",
  "curious",
  "vivid",
  "fierce",
  "vibrant",
];

const nouns = [
  "elephant",
  "tiger",
  "penguin",
  "sunflower",
  "ocean",
  "mountain",
  "moon",
  "star",
  "rainbow",
  "butterfly",
  "whisper",
  "comet",
  "guitar",
  "river",
  "firefly",
  "dolphin",
  "paradise",
  "mermaid",
  "wizard",
  "dreamer",
];

// Function to generate a random user name
export function generateRandomNickName() {
  const randomAdjectiveIndex = Math.floor(Math.random() * adjectives.length);
  const randomNounIndex = Math.floor(Math.random() * nouns.length);
  const randomAdjective = adjectives[randomAdjectiveIndex];
  const randomNoun = nouns[randomNounIndex];
  return `${randomAdjective} ${randomNoun}`;
}
