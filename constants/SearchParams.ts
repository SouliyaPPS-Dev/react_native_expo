// Helper function to get search params (manually parse from router's current location)
export const getSearchParams = (key: string) => {
     if (typeof location !== 'undefined') {
          const params = new URLSearchParams(location.search);
          return params.get(key) || null;
     }
     return null;
};