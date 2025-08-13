import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import mergeClasses from '@/utils/mergeClasses.ts';

type PropsType = {
    name: string;
    control: Control<any>;
    label: string;
    placeholder?: string;
    type?: string;
};

function InputField({ name, control, label = '', placeholder = '', type = 'text' }: PropsType) {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
        defaultValue: '',
    });

    return (
        <div className="flex flex-col">
            {label && (
                <label htmlFor={name} className="mb-1 text-xs">
                    {label}
                </label>
            )}
            <input
                id={name}
                {...field}
                type={type}
                placeholder={placeholder}
                className={mergeClasses(
                    'border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 border-zinc-300',
                    error && 'border-red-500'
                )}
            />
            {error && <span className="text-red-500 text-xs mt-1">{error.message}</span>}
        </div>
    );
}

export default InputField;
