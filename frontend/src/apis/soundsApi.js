export const playSuccessSound = () => {
    const audio = new Audio("/sounds/posting.mp3"); 
    audio.play().catch((error) => {
      console.error("Error playing sound:", error);
    });
  };