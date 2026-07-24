import { FaStar } from "react-icons/fa";

const Rating = ({ rating, setRating, error }) => {
    return (
        <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
                Rating
            </label>

            <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="transition-transform duration-200 hover:scale-110 focus:outline-none"
                    >
                        <FaStar
                            size={32}
                            className={
                                star <= rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                            }
                        />
                    </button>
                ))}
            </div>

            <p className="mt-2 text-sm text-gray-500">
                {rating > 0
                    ? `You selected ${rating} out of 5`
                    : "Select a rating"}
            </p>

            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Rating;