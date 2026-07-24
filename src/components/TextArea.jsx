const TextArea = ({
    label,
    name,
    value,
    placeholder,
    rows = 5,
    onChange,
    error,
}) => {
    return (
        <div className="mb-5">
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-semibold text-gray-700"
            >
                {label}
            </label>

            <textarea
                id={name}
                name={name}
                rows={rows}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={`w-full resize-none rounded-lg border px-4 py-3 text-gray-800 outline-none transition-all duration-200 focus:ring-2 ${error
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                    }`}
            />

            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};

export default TextArea;