declare global {
    interface Window {
      initMap: () => void;
    }
  }
  
  let isLoaded = false;
  let loadPromise: Promise<void> | null = null;
  
  export const loadGoogleMapsAPI = (): Promise<void> => {
    if (isLoaded) {
      return Promise.resolve();
    }
  
    if (loadPromise) {
      return loadPromise;
    }
  
    loadPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
  
      window.initMap = () => {
        isLoaded = true;
        resolve();
      };
  
      script.onerror = reject;
      document.head.appendChild(script);
    });
  
    return loadPromise;
  };