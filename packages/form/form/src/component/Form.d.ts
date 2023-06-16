import { ComponentType } from "react";

interface Field {
  id: string;
  label: string;
}

interface Props {
  fields: Field[];
  header: Record<string, string>;
  url: string;
  data: Record<string, string>;
}

declare const ContactForm: ComponentType<Props>;

export default ContactForm;
