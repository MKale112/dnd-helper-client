export const capitalizeString = (str: string): string => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const greetings = ['Welcome back,', 'Ready for a session,', 'Howdy,', 'Prepare yourself,', 'Draw your weapon,'];

export const userGreeting = (username: string): string => {
  const greetingId = Math.floor(Math.random() * greetings.length);
  const usernameCapitalized = capitalizeString(username);
  const greeting = `${greetings[greetingId]} ${usernameCapitalized}!`;
  return greeting;
};
