import { z } from "zod";

export const countrySchema = z.enum(["Nacional", "Internacional"]);
export type Country = z.infer<typeof countrySchema>;
