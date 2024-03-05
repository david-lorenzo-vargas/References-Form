import { ReferencesDataObject } from "../../Types/types";

export const postData = async(obj: ReferencesDataObject) => {
  if (!process.env.POST_URL) {
    throw new Error('POST_URL is not defined in environment variables.');
  }

  try {
    const res = await fetch(process.env.POST_URL , {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj),
    });
  
    return res;
  } catch (error: unknown) {
    throw new Error('Something went wrong');
  }
};