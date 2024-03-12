import { Employer, FormFields } from "../Types/types";

export const formatReferencesPostBody = (
  obj: FormFields,
  currentlyWorking: boolean
) => {
  return {
    personal: {
      first_name: obj.firstName,
      last_name: obj.lastName,
      current_address: obj.personalAddress,
    },
    employer: obj.employer.map((e: Employer) => ({
      name: e.name,
      start_date: e.start_date,
      end_date: currentlyWorking
        ? undefined
        : e?.end_date,
    })),
    guarantor: {
      name: obj.guarantorName,
      address: obj.guarantorAddress,
      relation: obj.relationshipToGuarantor,
    },
  };
};
