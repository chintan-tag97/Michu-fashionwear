import React from "react";

interface FormField {
  name: string;
  label: string;
  type: string;
  value: any;
  required?: boolean;

  pattern?: string;
  rows?: number;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
}

interface FormComponentProps {
  fields: FormField[];
  onSubmit: (e: React.FormEvent) => void;
  onChange: (name: string, value: any) => void;
  submitButtonText: string;
  loading?: boolean;
  error?: string | null;
  success?: string | null;
  title?: string;
}

const FormComponent: React.FC<FormComponentProps> = ({
  fields,
  onSubmit,
  onChange,
  submitButtonText,
  loading = false,
  error = null,
  success = null,
  title,
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const finalValue =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : type === "number"
        ? Number(value)
        : value;
    onChange(name, finalValue);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-rose-800">{title}</h2>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
          {success}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-rose-700 mb-2">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={field.value}
                onChange={handleChange}
                rows={field.rows || 4}
                placeholder={field.placeholder}
                className="w-full px-4 py-2 border border-rose-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            ) : field.type === "checkbox" ? (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name={field.name}
                  checked={field.value}
                  onChange={handleChange}
                  className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-rose-300 rounded"
                />
                <span className="ml-2 text-sm text-rose-700">
                  {field.label}
                </span>
              </div>
            ) : field.type === "select" ? (
              <select
                name={field.name}
                value={field.value}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-rose-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={field.value}
                onChange={handleChange}
                pattern={field.pattern}
                placeholder={field.placeholder}
                className="w-full px-4 py-2 border border-rose-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : submitButtonText}
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
