
interface SelectFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

export const SelectField = ({ name, label, value, onChange, options }: SelectFieldProps) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium mb-1">{label}:</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export const SectionHeader = ({ title }: { title: string }) => (
  <div className="bg-soqotra-blue text-white py-2 px-4 font-medium">
    {title}
  </div>
);
