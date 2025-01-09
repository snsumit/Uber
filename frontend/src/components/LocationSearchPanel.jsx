import React, { useEffect } from 'react';

const LocationSearchPanel = ({
  suggestions,
  setPickUp,
  setDestination,
  setDestinationSuggestions,
  setPickupSuggestions,
  type
}) => {
  
  const handleSuggestionsClick = (suggestion) => {
    console.log(suggestion);
   
    if (type === 'pickup') {
      setPickUp(suggestion.name);
      setPickupSuggestions([]);
      
    } else{
      setDestination(suggestion.name);
      setDestinationSuggestions([]);
    }
  }

  return (
    <div>
      {
        suggestions.map((suggestion, index) => {
          return (
            <div
              onClick={() => {
               handleSuggestionsClick(suggestion);
              }}
              key={index}
              className='flex gap-4 border-gray-50 border-2 p-2 active:border-black rounded-xl my-2 justify-center items-center'
            >
              <h4 className='h-8 w-12 rounded-full bg-gray-200'>
                <i className='ri-map-pin-fill text-lg h-full flex items-center justify-center'></i>
              </h4>
              <h4 className='font-medium'>{suggestion.name}</h4>
            </div>
          )
        })
      }
    </div>
  );
};

export default LocationSearchPanel;
