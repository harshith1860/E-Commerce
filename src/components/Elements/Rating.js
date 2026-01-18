export const Rating = ({ rating }) => {

    // Create an array of length 5 to represent 5 stars.
    // Initially, all values are set to false (empty stars).
    let ratingArray = Array(5).fill(false);

    // Mark the first `rating` number of stars as true (filled stars)
    for (let i = 0; i < rating; i++) {
        ratingArray[i] = true;
    }

    return (
        <>
            {/* 
              Loop through the ratingArray:
              - If value is true, render a filled star
              - If value is false, render an empty star
              - `index` is passed from map() and used as the key, since each star needs a unique identifier
            */}
            {ratingArray.map((value, index) => (
                value ? (
                    // Filled star icon
                    <i
                        key={index}
                        className="text-lg bi bi-star-fill text-yellow-500 mr-1"
                    ></i>
                ) : (
                    // Empty star icon
                    <i
                        key={index}
                        className="text-lg bi bi-star text-yellow-500 mr-1"
                    ></i>
                )
            ))}
        </>
    );
};
