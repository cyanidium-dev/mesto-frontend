"use client";
import { Dispatch, SetStateAction, useMemo, useEffect } from "react";
import { FormikProps, useFormikContext } from "formik";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import SelectInput from "../../shared/formComponents/SelectInput";
import { BaseFormValues } from "@/types/formValues";
import Select, {
    MultiValue,
    StylesConfig,
    DropdownIndicatorProps,
} from "react-select";
import { LANGUAGES } from "@/constants/filters";
import { CATEGORIES, getSubcategoriesByCategory } from "@/constants/categories";
import ArrowIcon from "../../shared/icons/ArrowIcon";

interface LangCategoryProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    formProps: FormikProps<BaseFormValues>;
}

const categories = CATEGORIES.map(cat => ({
    value: cat.key,
    label: `${cat.emoji} ${cat.label}`,
}));

const languages = LANGUAGES.map(lang => ({
    value: lang.key,
    label: lang.label,
}));

const LanguageSelector = () => {
    const { values, setFieldValue, errors, touched } =
        useFormikContext<BaseFormValues>();
    const selectedLanguages = values.languages || [];
    const isError = errors.languages && touched.languages;

    const selectedOptions = languages.filter(lang =>
        selectedLanguages.includes(lang.value)
    );

    const handleChange = (
        selectedOptions: MultiValue<{ value: string; label: string }>
    ) => {
        const values = selectedOptions
            ? selectedOptions.map(option => option.value)
            : [];
        setFieldValue("languages", values);
    };

    type OptionType = { value: string; label: string };
    const customStyles: StylesConfig<OptionType, true> = {
        control: provided => ({
            ...provided,
            minHeight: "auto",
            height: "auto",
            borderRadius: "9999px",
            border: `1px solid ${isError ? "#fb2c36" : "#d4d4d4"}`,
            boxShadow: "none",
            "&:hover": {
                border: `1px solid ${isError ? "#fb2c36" : "#155dfc"}`,
            },
            "&:focus-within": {
                border: `1px solid ${isError ? "#fb2c36" : "#155dfc"}`,
            },
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingTop: "8px",
            paddingBottom: "8px",
            fontSize: "16px",
            cursor: "pointer",
            position: "relative",
            alignItems: "flex-start",
        }),
        valueContainer: provided => ({
            ...provided,
            height: "auto",
            padding: "0",
            alignItems: "flex-start",
            flexWrap: "wrap",
        }),
        input: provided => ({
            ...provided,
            margin: "0px",
            fontSize: "16px",
            lineHeight: "19px",
        }),
        indicatorsContainer: provided => ({
            ...provided,
            height: "auto",
        }),
        indicatorSeparator: () => ({
            display: "none",
        }),
        clearIndicator: provided => ({
            ...provided,
            padding: "0",
            marginRight: "32px",
        }),
        dropdownIndicator: provided => ({
            ...provided,
            padding: "0",
        }),
        placeholder: provided => ({
            ...provided,
            color: "#000000",
            fontSize: "16px",
            lineHeight: "19px",
        }),
        multiValue: provided => ({
            ...provided,
            backgroundColor: "#E5E7EB",
            borderRadius: "9999px",
            fontSize: "14px",
        }),
        multiValueLabel: provided => ({
            ...provided,
            color: "#1F2937",
            padding: "2px 8px",
        }),
        multiValueRemove: provided => ({
            ...provided,
            color: "#6B7280",
            borderRadius: "9999px",
            "&:hover": {
                backgroundColor: "#EF4444",
                color: "white",
            },
        }),
        menu: provided => ({
            ...provided,
            borderRadius: "12px",
            border: "1px solid #d4d4d4",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            zIndex: 20,
            marginTop: "2px",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? "#155dfc"
                : state.isFocused
                ? "#EFF6FF"
                : "white",
            color: state.isSelected ? "white" : "#171717",
            cursor: "pointer",
            padding: "12px",
            fontSize: "16px",
            "&:active": {
                backgroundColor: "#155dfc",
                color: "white",
            },
        }),
    };

    const DropdownIndicator = (
        props: DropdownIndicatorProps<OptionType, true>
    ) => {
        const { selectProps, innerProps } = props;
        const menuIsOpen = selectProps.menuIsOpen || false;
        return (
            <div
                {...innerProps}
                style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                }}
            >
                <ArrowIcon
                    className={`transition duration-300 ease-out ${
                        menuIsOpen ? "rotate-90" : "-rotate-90"
                    }`}
                />
            </div>
        );
    };

    return (
        <Select
            isMulti
            name="languages"
            options={languages}
            value={selectedOptions}
            onChange={handleChange}
            placeholder="Выберите языки"
            maxMenuHeight={200}
            isOptionDisabled={() => selectedOptions.length >= 3}
            styles={customStyles}
            components={{
                DropdownIndicator,
                IndicatorSeparator: () => null,
            }}
            className="react-select-container"
            classNamePrefix="react-select"
        />
    );
};

const description = {
    event: {
        category: "Выберите к какой категории относиться ваше событие:",
        languages: "Выберите до 3 языков вашего события:",
    },
    company: {
        category: "Выберите к какой категории относиться ваша компания:",
        languages: "Выберите до 3 языков вашей компании:",
    },
    individual: {
        category: "Выберите к какой категории относиться ваша деятельность:",
        languages: "Выберите до 3 языков вашей деятельности:",
    },
};

const SubcategorySelector = () => {
    const { values, setFieldValue } =
        useFormikContext<BaseFormValues>();
    const selectedCategory = values.category;

    const subcategories = useMemo(() => {
        if (!selectedCategory) return [];
        return getSubcategoriesByCategory(selectedCategory);
    }, [selectedCategory]);

    useEffect(() => {
        if (selectedCategory && values.subcategory) {
            const currentSubcategories = getSubcategoriesByCategory(selectedCategory);
            const subcategoryExists = currentSubcategories.some(
                sub => sub.key === values.subcategory
            );
            if (!subcategoryExists) {
                setFieldValue("subcategory", "");
            }
        }
    }, [selectedCategory, values.subcategory, setFieldValue]);

    const subcategoryOptions = subcategories.map(sub => ({
        value: sub.key,
        label: sub.label,
    }));

    const hasCategory = !!selectedCategory;
    const hasSubcategories = subcategories.length > 0;
    const isDisabled = !hasCategory || !hasSubcategories;

    if (isDisabled) {
        return (
            <div className="mb-6">
                <label className="block text-[14px] mb-6">
                    Выбрать вид деятельности:
                </label>
                <div className="mt-3 pointer-events-none opacity-50">
                    <div className="relative w-full px-[10px] py-2 text-[16px] border border-gray-light rounded-full bg-gray-50">
                        <span className="text-gray-placeholder">
                            {!hasCategory
                                ? "Сначала выберите категорию"
                                : "Нет доступных видов деятельности"}
                        </span>
                        <ArrowIcon className="absolute right-3 bottom-1/2 translate-y-1/2 -rotate-90 opacity-50" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-6">
            <SelectInput
                fieldName="subcategory"
                label="Выбрать вид деятельности:"
                placeholder="Выбрать вид деятельности"
                options={subcategoryOptions}
                labelClassName="mb-6"
                fieldClassName="px-[10px] py-2 leading-[19px]"
                wrapperClassName="mt-3"
                required={false}
            />
        </div>
    );
};

export const LangCategory = ({
    setCurrentStep,
    formProps,
}: LangCategoryProps) => {
    const { errors, values } = formProps;

    let type: "event" | "company" | "individual";
    if ("userType" in values && values.userType) {
        type = values.userType === "individual" ? "individual" : "company";
    } else {
        type = "event";
    }

    return (
        <div className="flex flex-col flex-1 justify-between h-full">
            <div>
                <SectionTitle className="mb-6">Категория и язык</SectionTitle>
                <SelectInput
                    fieldName="category"
                    label={description[type].category}
                    required
                    placeholder="Выбрать категорию"
                    options={categories}
                    labelClassName="mb-6"
                    fieldClassName="px-[10px] py-2 leading-[19px]"
                    wrapperClassName="mt-3"
                />
                <SubcategorySelector />
                <div>
                    <p className="mb-3 text-[14px]">
                        {description[type].languages}
                    </p>
                    <LanguageSelector />
                </div>
            </div>
            <MainButton
                onClick={() => setCurrentStep(prev => prev + 1)}
                variant="primary"
                className="h-12"
                disabled={
                    !values.category ||
                    !!errors.category ||
                    (values.languages?.length ?? 0) < 1
                }
            >
                Продолжить
            </MainButton>
        </div>
    );
};
