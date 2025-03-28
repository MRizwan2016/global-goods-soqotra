
// Animation variants for Framer Motion
export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const fadeInVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 }
};

// Configurable animation for different delay times
export const getFadeInVariants = (delay: number = 0.2) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { delay }
});
