import * as Yup from "yup";

const addCompanySchema = Yup.object().shape({
  companyName: Yup.string()
    .transform((value, originalValue) => originalValue.trim())
    .max(100, 'Name must be at most 100 characters')
    .matches(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces')
    .required('Name is required')
    .test('no-spaces-only', 'Name cannot be just spaces', (value) => value.trim() !== ''),

  location: Yup.string()
    .transform((value, originalValue) => originalValue.trim())
    .max(100, 'Location must be at most 100 characters')
    .required('Location is required')
    .test('no-spaces-only', 'Location cannot be just spaces', (value) => value.trim() !== ''),

  city: Yup.string()
    .transform((value, originalValue) => originalValue.trim())
    .max(100, 'City must be at most 100 characters')
    .required('City is required')
    .test('no-spaces-only', 'City cannot be just spaces', (value) => value.trim() !== ''),

  companyFoundedOn: Yup.date()
    .required('Company founded date is required')
    .nullable()
    .typeError('Invalid date format')
    .test('is-past', 'Date cannot be in the future', (value) => value && new Date(value) <= new Date()),

});

export default addCompanySchema;

