import { FocusEvent } from 'react';
import ReactSelect, { ContainerProps, MenuProps, MultiValue, OptionProps, SingleValue, components } from 'react-select';
import { cn } from '../../../utils/cn';

interface Option<T extends string> {
  value: T;
  label: string;
}

interface BaseProps<T extends string> {
  placeholder?: string;
  options?: Option<T>[];
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
  clearable?: boolean;
  wrap?: boolean;
  searchable?: boolean;
  searchFilter?: (option: Option<T>, inputValue: string) => boolean;
  onBlur?: (e: FocusEvent) => void;
}

type Props<T extends string> = BaseProps<T> &
  (
    | {
        multi: true;
        value?: T[];
        onChange?: (value?: T[]) => void;
      }
    | {
        multi?: false;
        value?: T;
        onChange?: (value?: T) => void;
      }
  );

function Menu<Props extends MenuProps<any>>(props: Props) {
  return (
    <div prevent-swipe="true">
      <components.Menu {...props} />
    </div>
  );
}

function SelectContainer<Props extends ContainerProps<any>>(props: Props) {
  return (
    <div prevent-swipe="true">
      <components.SelectContainer {...props} />
    </div>
  );
}

function Option<Props extends OptionProps<any>>(props: Props) {
  return (
    <div>
      <components.Option {...props}>
        <input type="checkbox" checked={props.isSelected} onChange={() => null} /> <label>{props.label}</label>
      </components.Option>
    </div>
  );
}

const singleComponents = { Menu, SelectContainer };
const multiComponents = { Menu, SelectContainer, Option };

export function SelectInput<T extends string>({
  multi,
  value,
  disabled,
  errorMessage,
  clearable,
  options,
  placeholder,
  wrap,
  searchable,
  className,
  searchFilter,
  onBlur,
  onChange,
}: Props<T>) {
  const inputValue = multi ? value ?? [] : value ? [value] : [];
  const selectValue = options?.filter((item) => inputValue.includes(item.value));
  const filterOption = searchFilter ? (option: { data: Option<T> }, input: string) => searchFilter(option.data, input) : undefined;

  return (
    <div className={cn('flex flex-col', className)}>
      <ReactSelect
        isMulti={multi}
        closeMenuOnScroll={false}
        closeMenuOnSelect={!multi}
        blurInputOnSelect={false}
        hideSelectedOptions={!multi}
        isSearchable={searchable ?? false}
        filterOption={filterOption}
        menuShouldBlockScroll
        isClearable={clearable}
        value={selectValue}
        options={options ?? []}
        className={className}
        backspaceRemovesValue={false}
        placeholder={placeholder ?? 'Selecione...'}
        isDisabled={disabled}
        menuPortalTarget={document.body}
        classNames={{
          multiValue: () => '!min-w-24 !my-0',
          input: () => '!my-0',
          menuPortal: () => '!z-[1001] text-black !pointer-events-auto scroll-eve',
          control: () => '!min-h-6 py-0.5 !border-gray-300 !shadow-none',
          valueContainer: () => cn('!py-0', !wrap && '!flex-nowrap'),
          clearIndicator: () => '!p-1',
          dropdownIndicator: () => '!p-1',
          loadingIndicator: () => '!p-1',
        }}
        components={multi ? multiComponents : singleComponents}
        onChange={(option) => {
          if (multi) {
            onChange?.((option as MultiValue<Option<T>>)?.map((item) => item.value));
          } else {
            onChange?.((option as SingleValue<Option<T>>)?.value);
          }
        }}
        onBlur={onBlur}
      />
      {errorMessage && <div className="text-red-500 text-sm pt-1 break-words">{errorMessage}</div>}
    </div>
  );
}
