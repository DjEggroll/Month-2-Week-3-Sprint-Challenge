import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required()
        .min(2, "name must be at least 2 characters"),
    size: yup
        .string()
        .oneOf(["small", "medium", "large"]),
    special: yup
        .string(),
    pepperoni: yup.boolean(),
    mushroom: yup.boolean(),
    bacon: yup.boolean(),
    sausage: yup.boolean()
});

export default formSchema;