import { FormFields } from "../Types/types";

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
    employer: [
      {
        name: obj.employerName,
        start_date: new Date(obj.startDate).getTime(),
        end_date: currentlyWorking
          ? undefined
          : new Date(obj.endDate).getTime(),
      },
    ],
    guarantor: {
      name: obj.guarantorName,
      address: obj.guarantorAddress,
      relation: obj.relationshipToGuarantor,
    },
  };
};
