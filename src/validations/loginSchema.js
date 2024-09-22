import { object, string } from "yup";

export const loginSchema = object({
    password: string()
        .required("Password requerido")
        .min(8,"Mínimo 8 caracteres")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,"debe contener mayúscula, minúscula y número"),
    email: string()
        .required("El email es requerido")
        .email("Email no válido"),
})