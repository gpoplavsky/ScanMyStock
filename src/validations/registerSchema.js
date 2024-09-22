import { object, ref, string } from "yup";

export const registerSchema = object({
    confirmPassword: string()
    .required("Se requiere confirmación de la contraseña")
    .oneOf([ref("password"),null],"las contraseñas no coinciden"),
    password: string()
        .required("Contraseña requerida")
        .min(8,"Mínimo 8 caracteres")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,"debe contener mayúscula, minúscula y número"),
    email: string()
        .required("El email es requerido")
        .email("Email no válido"),
})