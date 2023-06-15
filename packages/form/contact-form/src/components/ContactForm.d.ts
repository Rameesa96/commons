import { ComponentType } from "react";

interface Field {
  id: string;
  label: string;
}

interface Props {
  fields: Field[];
  header: any;
  url: string;
  data: any;
}

declare const ContactForm: ComponentType<Props>;

export default ContactForm;
