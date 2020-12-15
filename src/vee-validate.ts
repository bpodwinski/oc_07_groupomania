import { extend, configure } from "vee-validate";
import { required, email, min, max } from "vee-validate/dist/rules";
import i18n from "@/i18n";

configure({
  defaultMessage: (field: string, values: string | any): any => {
    values._field_ = i18n.t(`fields.${field}`);

    return i18n.t(`validation.${values._rule_}`, values);
  },
});

extend("required", required);
extend("min", min);
extend("max", max);
extend("email", email);
