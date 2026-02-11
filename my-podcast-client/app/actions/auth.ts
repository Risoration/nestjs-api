import axios from 'axios';
import { SignupFormSchema, FormState } from '../lib/definitions';
import { hash } from 'bcrypt';

export async function signup(state: FormState, formData: FormData) {
  //Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  //check invalid fields
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //call provider or db to create user
  //prepare data for field creation
  const { name, email, password } = validatedFields.data;

  const hashedPassword = await hash(password, 10);

  const data = await axios.post('');
}
