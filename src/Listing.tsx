export type ListingItem = {
    listing_id: number;
    url?: string; // Делаем опциональным
    MainImage?: {
      url_570xN: string;
    };
    title?: string; // Делаем опциональным
    currency_code?: string; // Делаем опциональным
    price?: string; // Делаем опциональным
    quantity?: number; // Делаем опциональным
    [key: string]: unknown; 
  };

export type ListingType = ListingItem[];

const Listing = ({ items = [] }: { items?: ListingType }) => {
    const formatPrice = (currency?: string, price?: string) => {
      if (!price) return 'N/A';
      
      switch (currency) {
        case 'USD': return `$${price}`;
        case 'EUR': return `€${price}`;
        default: return `${price} ${currency || ''}`.trim();
      }
    };
  
    const getQuantityLevel = (quantity?: number) => {
      if (!quantity) return 'level-low';
      if (quantity <= 10) return 'level-low';
      if (quantity <= 20) return 'level-medium';
      return 'level-high';
    };
  
    return (
      <div className="item-list">
        {items.map((item) => {
          if (!item.listing_id || !item.MainImage?.url_570xN) return null;
          
          return (
            <div className="item" key={item.listing_id}>
              <div className="item-image">
                <a href={item.url || '#'}>
                  <img 
                    src={item.MainImage.url_570xN} 
                    alt={item.title || 'Listing image'}
                  />
                </a>
              </div>
              <div className="item-details">
                <p className="item-title">
                    {item.title && item.title.length > 50 
                    ? `${item.title.slice(0, 50)}...` 
                    : item.title || 'Untitled'}
                </p>
                <p className="item-price">
                  {formatPrice(item.currency_code, item.price)}
                </p>
                <p className={`item-quantity ${getQuantityLevel(item.quantity)}`}>
                  {item.quantity ?? 0} left
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

export default Listing;