declare global {
  interface Window {
    markmap: {
      // Define the properties and methods of markmap here
      // Add other properties or methods as needed
      Markmap: any;
      loadJS: any;
      loadCSS: nay
    };
  }
}

export {};  // Ensures this file is treated as a module
