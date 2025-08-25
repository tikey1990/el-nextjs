import { useForm } from "react-hook-form";
import { RHFProvider } from "@providers";

/**
 * Декоратор с react hook from
 * @returns {JSX.Element}
 * @constructor
 */
export const WithRHF = (Story) => (
    <RHFProvider methods={useForm()}>
        <Story />
    </RHFProvider>
);
