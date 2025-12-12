// packages/api-client/src/services/mapService.ts

interface GeoResponse {
  display_name: string;
  address: {
    road?: string;
    neighbourhood?: string;
    suburb?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
}

export interface SearchResult {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
}

export const mapService = {
  getAddressFromCoordinates: async (lat: number, lng: number): Promise<string | null> => {
    try {
      // استفاده از سرویس رایگان Nominatim
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=fa`;
      
      const response = await fetch(url, {
        headers: {
          // Nominatim درخواست می‌کند که User-Agent ارسال کنید
          'User-Agent': 'YadakiRun/1.0', 
        }
      });

      if (!response.ok) return null;

      const data: GeoResponse = await response.json();

      // تلاش برای ساختن یک آدرس تمیز از داده‌های بازگشتی
      const addr = data.address;
      const parts = [
        addr.state,
        addr.city || addr.suburb || addr.neighbourhood,
        addr.road,
      ].filter(Boolean); // حذف مقادیر خالی

      // اگر نتوانستیم آدرس کوتاه بسازیم، آدرس کامل را برمی‌گردانیم
      return parts.length > 0 ? parts.join('، ') : data.display_name;

    } catch (error) {
      console.error('Error fetching address:', error);
      return null;
    }
  }, // <--- ✅ ویرگول اینجاست که جا افتاده بود

  searchLocation: async (query: string): Promise<SearchResult[]> => {
    try {
      if (!query || query.length < 2) return [];

      // استفاده از Nominatim برای جستجو (رایگان)
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&accept-language=fa&limit=5`;
      
      const response = await fetch(url);
      if (!response.ok) return [];

      const data: SearchResult[] = await response.json();
      return data;
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }
};