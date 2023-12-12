import z from 'zod'

export const AuthSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'This field has to be filled.' })
		.email('This is not a valid email.'),
	password: z
		.string()
		.min(6),
}).required({ email: true, password: true })

export type AuthSchemaType = z.infer<typeof AuthSchema>
export type AuthSchemaErrorsType = z.ZodFormattedError<AuthSchemaType> | null
