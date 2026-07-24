import { FaSpinner } from "react-icons/fa";

const Button = ({
    text,
    type = "button",
    loading = false,
    disabled = false,
    onClick,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={loading || disabled}
            className={`flex w-full items-center justify-center rounded-lg px-4 py-3 font-semibold text-white transition duration-200 ${loading || disabled
                    ? "cursor-not-allowed bg-primary/60"
                    : "bg-primary hover:bg-primary/90 active:scale-[0.98]"
                }`}
        >
            {loading ? (
                <>
                    <FaSpinner className="mr-2 animate-spin" />
                    Submitting...
                </>
            ) : (
                text
            )}
        </button>
    );
};

export default Button;