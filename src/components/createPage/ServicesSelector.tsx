import { useFormikContext } from "formik";
import { BusinessFormValues } from "@/types/formValues";

const availableServices = [
    "Консультация",
    "Ремонт",
    "Установка",
    "Дизайн",
    "Фотография",
    "Кейтеринг",
    "Уборка",
    "Транспорт",
];

export const ServicesSelector = () => {
    const { values, setFieldValue } = useFormikContext<BusinessFormValues>();
    const services = values.services || [];

    const handleServiceClick = (service: string) => {
        if (services.includes(service)) {
            setFieldValue(
                "services",
                services.filter(s => s !== service)
            );
        } else {
            setFieldValue("services", [...services, service]);
        }
    };

    return (
        <div>
            <p className="mb-3 text-[14px]">Выберите услуги</p>
            <div className="flex flex-wrap gap-2">
                {availableServices.map(service => (
                    <div
                        key={service}
                        onClick={() => handleServiceClick(service)}
                        className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full border text-[12px] cursor-pointer transition duration-300 ease-in-out ${
                            services.includes(service)
                                ? "bg-primary text-white border-primary"
                                : "bg-transparent text-gray-dark border-gray-light"
                        }`}
                    >
                        {service}
                    </div>
                ))}
            </div>
        </div>
    );
};
