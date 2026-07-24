const InputField = ({
    label,
    type = "text",
    name,
    value,
    placeholder,
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

            <input
                id={name}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={`w-full rounded-lg border px-4 py-3 text-gray-800 outline-none transition-all duration-200 focus:ring-2 ${error
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

export default InputField;